'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_PROMPTS = [
  'Assalamu alaikum, what is MediStore?',
  'What medicines do you sell?',
  'How do I place an order?',
  'How can I track my order?',
]

// Futuristic glowing AI logo SVG
function AiLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </radialGradient>
        <radialGradient id="ring" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer pulse ring */}
      <circle cx="20" cy="20" r="18" fill="url(#ring)" />
      {/* Mid ring */}
      <circle cx="20" cy="20" r="13" fill="none" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 2" />
      {/* Core circle */}
      <circle cx="20" cy="20" r="9" fill="url(#core)" filter="url(#glow)" />
      {/* Cross / plus icon in center */}
      <rect x="19" y="14" width="2" height="12" rx="1" fill="white" />
      <rect x="14" y="19" width="12" height="2" rx="1" fill="white" />
      {/* Corner dots */}
      <circle cx="8" cy="8" r="1.5" fill="#34d399" opacity="0.7" />
      <circle cx="32" cy="8" r="1.5" fill="#34d399" opacity="0.7" />
      <circle cx="8" cy="32" r="1.5" fill="#34d399" opacity="0.7" />
      <circle cx="32" cy="32" r="1.5" fill="#34d399" opacity="0.7" />
      {/* Connecting lines to dots */}
      <line x1="9" y1="8" x2="11" y2="11" stroke="#34d399" strokeWidth="0.8" opacity="0.5" />
      <line x1="31" y1="8" x2="29" y2="11" stroke="#34d399" strokeWidth="0.8" opacity="0.5" />
      <line x1="9" y1="32" x2="11" y2="29" stroke="#34d399" strokeWidth="0.8" opacity="0.5" />
      <line x1="31" y1="32" x2="29" y2="29" stroke="#34d399" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

// Glowing floating button logo
function FloatingLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
      <defs>
        <radialGradient id="fcore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </radialGradient>
        <filter id="fglow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="20" cy="20" r="9" fill="url(#fcore)" filter="url(#fglow)" />
      <rect x="19" y="14" width="2" height="12" rx="1" fill="#065f46" />
      <rect x="14" y="19" width="12" height="2" rx="1" fill="#065f46" />
      <circle cx="8" cy="8" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="32" cy="8" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="8" cy="32" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="32" cy="32" r="1.5" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setIsStreaming(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          }
          return updated
        })
      }
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            // Mobile: near full screen. Desktop: fixed 380px
            className="
              w-[calc(100vw-2rem)] max-w-[380px]
              h-[70vh] max-h-[540px] min-h-[400px]
              flex flex-col rounded-2xl
              border border-black/[0.08] dark:border-white/[0.08]
              bg-white/95 dark:bg-[#0d1117]/95
              backdrop-blur-xl overflow-hidden
              shadow-2xl shadow-black/10 dark:shadow-black/40
            "
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3 flex-shrink-0 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500">
              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* Glow blob */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-300/30 rounded-full blur-2xl pointer-events-none" />

              {/* Logo */}
              <div className="relative w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <AiLogo size={24} />
              </div>

              <div className="relative flex-1 min-w-0">
                <p className="text-white font-semibold text-sm tracking-wide">MediStore Assistant</p>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-200"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-emerald-100 text-[11px]">Online · Powered by AI</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="relative w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-4 pt-2">
                  {/* Glowing logo in empty state */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl scale-150" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/60 dark:to-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center">
                      <AiLogo size={36} />
                    </div>
                  </div>

                  <div className="text-center px-2">
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">
                      Hi! I'm your MediStore assistant 👋
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                      Ask me about medicines, orders, or anything about MediStore.
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-left text-[11px] sm:text-xs px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-150 leading-snug"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'user'
                        ? 'bg-emerald-500'
                        : 'bg-gray-100 dark:bg-white/[0.08]'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <div className="w-4 h-4"><AiLogo size={16} /></div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-sm'
                        : 'bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.content === '' && msg.role === 'assistant' ? (
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((j) => (
                          <motion.div
                            key={j}
                            className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                          />
                        ))}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2.5 sm:p-3 border-t border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">
              <div className="flex gap-2 items-center bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-emerald-400 dark:focus-within:border-emerald-600 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage(input)
                    }
                  }}
                  placeholder="Ask about medicines, orders..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none disabled:opacity-60"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isStreaming}
                  className="w-7 h-7 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-center text-gray-400 dark:text-gray-600 text-[10px] mt-1.5">
                Powered by AI · MediStore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/40 dark:shadow-emerald-900/50 flex items-center justify-center"
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400/40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FloatingLogo />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}