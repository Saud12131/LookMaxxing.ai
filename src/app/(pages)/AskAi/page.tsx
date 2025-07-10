"use client";

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/authcontext';
import { toast } from 'sonner';
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AskAi() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    if (!input.trim()) {
      toast.error("No input")
      console.log('No input');
      return;
    }
    if (!user?.uid) {
      toast.error("No userID")
      console.log('No user ID');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    // Set loading after state updates
    setTimeout(() => setIsLoading(true), 0);

    try {
      console.log('Sending request to API');
      const response = await fetch('http://localhost:3000/api/airesponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          userID: user.uid,
        }),
      });

      if (!response.ok) {
        toast.error("failed to get response")
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      let aiResponse = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        aiResponse += chunk;
        
        // Update the last message with streaming content
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage?.role === 'assistant') {
            lastMessage.content = aiResponse;
          } else {
            newMessages.push({ role: 'assistant', content: aiResponse });
          }
          
          return newMessages;
        });
      }
    } catch (error:any) {
      toast.error(error)
      console.error('Error:', error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 bg-purple">      
      <main className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Stylist Assistant</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized fashion and style advice powered by AI
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-lg p-6 mb-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Ask me anything about fashion, style, or self-improvement!</p>
            </div>
          ) : (
            <div className="space-y-4">
{isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-bl-none px-5 py-3 border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-2xl px-5 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-none'
                        : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="whitespace-pre-wrap text-sm md:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fashion, style, or self-improvement..."
              className="flex-1 px-5 py-3 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-300 focus:bg-white transition-colors duration-200"
              disabled={isLoading}
            />
            <button

              type="submit"
              disabled={isLoading || !input.trim()}
              className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isLoading ? 'Sending...' : 'Send'}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
