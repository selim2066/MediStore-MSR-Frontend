import { NextRequest } from 'next/server'

export const runtime = 'edge'

const BASE_SYSTEM_PROMPT = `You are MediStore's helpful AI assistant. MediStore is an online pharmacy e-commerce platform where customers can browse and purchase over-the-counter (OTC) medicines.

## Platform Overview
- Customers browse medicines by category, search, filter, and sort on the /shop page
- To purchase: add to cart → checkout → choose payment → place order
- Payment methods: Cash on Delivery (COD) or Online payment via SSLCommerz
- Users must register and log in to place orders

## Order Lifecycle
PLACED → PROCESSING → SHIPPED → DELIVERED
- Customers can only cancel orders in PLACED status
- After DELIVERED, customers can leave a review for the medicine

## User Roles
- Customer: Browse, add to cart, order, track, review
- Seller: List medicines, manage inventory, update order status
- Admin: Manage categories, all users, all orders

## Helpful Page References
- Browse medicines: /shop
- Medicine detail: /shop/[id]
- Your cart: /cart
- Checkout: /checkout
- Your orders: /orders
- Your profile: /profile

## Guidelines
- Be concise, warm, and helpful — 2 to 4 sentences unless explaining a process
- Answer stock/price questions using the LIVE INVENTORY DATA provided below
- For order tracking, direct users to /orders after logging in
- Only assist with MediStore-related questions
- Never make up data that isn't in the inventory below`

async function buildSystemPrompt(): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medicine?limit=200`,
      { next: { revalidate: 60 } } // cache for 60 seconds
    )

    if (!res.ok) return BASE_SYSTEM_PROMPT

    const json = await res.json()

    // Handle your paginated response shape: { success, data: { data: [...] } }
    const medicines = json?.data?.data ?? json?.data ?? []

    if (!medicines.length) return BASE_SYSTEM_PROMPT

    const inventoryLines = medicines
      .map((m: {
        name: string
        price: number
        stock: number
        manufacturer?: string
        category?: { name: string }
      }) =>
        `- ${m.name} | Price: ৳${m.price} | Stock: ${m.stock > 0 ? `${m.stock} units (IN STOCK)` : 'OUT OF STOCK'} | Brand: ${m.manufacturer ?? 'N/A'} | Category: ${m.category?.name ?? 'N/A'}`
      )
      .join('\n')

    return `${BASE_SYSTEM_PROMPT}

## Live Inventory (as of now)
${inventoryLines}`
  } catch {
    // If fetch fails, fall back to base prompt — chatbot still works
    return BASE_SYSTEM_PROMPT
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request', { status: 400 })
    }

    const trimmedMessages = messages.slice(-20)

    // Build system prompt with live inventory
    const systemPrompt = await buildSystemPrompt()

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...trimmedMessages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq API error:', err)
      return new Response('AI service error', { status: 500 })
    }

    const readable = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue
              const data = line.slice(6).trim()
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                const text = parsed?.choices?.[0]?.delta?.content
                if (text) {
                  controller.enqueue(new TextEncoder().encode(text))
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Chat route error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}