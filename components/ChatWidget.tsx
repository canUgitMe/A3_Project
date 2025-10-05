'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react'; // optional icons for a modern look

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage: Message = { sender: 'bot', text: data.reply || 'No response' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const botMessage: Message = { sender: 'bot', text: 'Error communicating with API.' };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput('');
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[420px] bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white text-center font-semibold py-3 text-lg">
            Chat Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center mt-20 text-sm">
                👋 Start the conversation below!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-gray-100 text-gray-800 self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center p-3 border-t bg-gray-50">
            <input
              className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
