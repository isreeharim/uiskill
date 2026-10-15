"use client"

import * as React from "react"
import { Send, CheckCheck, Bot } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "bot"
  text: string
  time: string
}

export function DaisyChatBubble() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "Which UI library should I use for a high-density logistics dashboard?",
      time: "10:42 AM",
    },
    {
      id: "2",
      sender: "bot",
      text: "For high-density logistics, Uber Base Web or MUI DataGrid provides best-in-class virtualized rows, slot overrides, and compact token density.",
      time: "10:43 AM",
    },
  ])
  const [input, setInput] = React.useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: "Just now",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Copied! You can integrate that template directly into your React project using 1-click TSX.",
        time: "Just now",
      }
      setMessages((prev) => [...prev, replyMsg])
    }, 800)
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">AI Assistant Thread</h4>
            <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online • DaisyUI Bubble Style
            </p>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="my-3 space-y-3 max-h-[170px] overflow-y-auto pr-1">
        {messages.map((m) => {
          const isUser = m.sender === "user"
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-xs"
                    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 rounded-bl-xs"
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400">
                <span>{m.time}</span>
                {isUser && <CheckCheck className="h-3 w-3 text-blue-500" />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  )
}
export default DaisyChatBubble
