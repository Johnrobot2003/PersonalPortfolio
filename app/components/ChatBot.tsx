'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, AlertTriangle, Bot, ChevronDown } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isBlocked?: boolean;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Johnrobot, your personal assistant for John Rohan Acebo. Ask me FAQs for more information!",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        const currentPrompt = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: currentPrompt,history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })) }),
            });

            const data = await response.json();

            let botMessage: Message;
            
            if (data.blocked) {
                botMessage = {
                    id: (Date.now() + 1).toString(),
                    text: data.text || "I can only assist with usual FAQs related to John Rohan Acebo",
                    sender: 'bot',
                    timestamp: new Date(),
                    isBlocked: true,
                };
            } else if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            } else {
                botMessage = {
                    id: (Date.now() + 1).toString(),
                    text: data.text,
                    sender: 'bot',
                    timestamp: new Date(),
                };
            }

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error. Please try again with an educational question.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button - Mobile Optimized */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 touch-manipulation"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Bot size={20} className="md:w-6 md:h-6" />}
            </button>

            {/* Chat Window - Mobile Responsive */}
            {isOpen && (
                <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50 bg-white flex flex-col shadow-2xl md:rounded-lg md:w-96 md:h-[600px] md:max-h-[80vh] overflow-hidden">
                    
                    {/* Header with Drag Handle for Mobile */}
                    <div className="bg-blue-600 text-white p-4 md:p-4 relative">
                        {/* Drag handle for mobile - only visible on mobile */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 md:hidden">
                            <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 md:mt-0">
                            <div>
                                <h3 className="font-semibold text-base md:text-lg">Johnrobot</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bot size={18} className="md:w-5 md:h-5 opacity-80" />
                                {/* Close button for mobile header */}
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="md:hidden text-white/80 hover:text-white p-1 touch-manipulation"
                                    aria-label="Close chat"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-blue-100">
                            For FAQs about John Rohan Acebo. Ask me anything!
                        </div>
                    </div>

                    {/* Messages - Scrollable Area */}
                    <div 
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50 dark:bg-gray-800"
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : message.isBlocked
                                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                            : 'bg-white text-gray-900 shadow-sm'
                                    }`}
                                >
                                    {message.isBlocked && (
                                        <div className="flex items-center gap-1 mb-1">
                                            <AlertTriangle size={12} className="md:w-3.5 md:h-3.5" />
                                            <span className="text-xs font-semibold">Educational Policy</span>
                                        </div>
                                    )}
                                    <div className="text-sm md:text-sm whitespace-pre-wrap break-words prose prose-p:my-0">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.text}
    </ReactMarkdown>
</div>
                                    <p className="text-xs mt-1 opacity-70">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white rounded-lg p-3 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Sticky on Mobile */}
                 <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 md:p-4 safe-bottom">
                      
                        <div className="flex space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask a question..."
                                className="flex-1 px-3 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
                                disabled={isLoading}
                                aria-label="Message input"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 touch-manipulation min-w-[44px]"
                                aria-label="Send message"
                            >
                                <Send size={18} className="md:w-4 md:h-4" />
                            </button>
                        </div>
                        {/* Mobile hint */}
                        <div className="text-xs text-gray-400 text-center mt-2 md:hidden">
                             Ask about John Rohan Acebo
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}