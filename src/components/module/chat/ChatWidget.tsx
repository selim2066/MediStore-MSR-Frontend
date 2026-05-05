'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_PROMPTS = [
  'What medicines do you sell?',
  'How do I place an order?',
  'How can I track my order?',
  'What payment methods do you accept?',
]

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

    // Append empty assistant bubble to stream into
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
    } catch (err: any) {
      if (err.name !== 'AbortError') {
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="w-[380px] h-[540px] flex flex-col rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500 dark:bg-emerald-600 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">MediStore Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                  <p className="text-emerald-100 text-xs">Online · MSR Medistore</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-4 pt-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
                    <Bot className="w-7 h-7 text-emerald-500" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-gray-900 dark:text-white font-medium text-sm">
                      Hi! I am your MediStore assistant 👋
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
                        className="text-left text-xs px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-150 leading-snug"
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
                      <Bot className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-sm'
                        : 'bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {/* Typing dots when streaming and content is empty */}
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
            <div className="p-3 border-t border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">
              <div className="flex gap-2 items-center bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-emerald-300 dark:focus-within:border-emerald-700 transition-colors">
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
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none disabled:opacity-60"
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
                Powered by MSR · MediStore
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
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 dark:shadow-emerald-900/40 flex items-center justify-center transition-colors"
      >
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
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}