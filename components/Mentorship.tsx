import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'model',
        text: '¡Hola! He analizado tu perfil financiero. Veo que tienes un 30% de tu cupo de crédito utilizado. ¿En qué puedo ayudarte hoy?',
        isInitial: true
    }
];

const Mentorship: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages]);

    const handleSendMessage = async (text: string = inputText) => {
        if (!text.trim() || isLoading) return;
        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        const responseText = await sendMessageToGemini(messages, text);
        const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden transition-colors duration-300">
            <header className="sticky top-0 z-30 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-gray-100 dark:border-zinc-800 justify-between">
                <Link to="/" className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="material-symbols-outlined text-zinc-900 dark:text-white">arrow_back</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-light dark:text-brand-dark icon-filled">smart_toy</span>
                    <span className="font-bold text-zinc-900 dark:text-white">Mentor IA</span>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-6 pb-32">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-3xl ${
                            msg.role === 'user' 
                                ? 'bg-black dark:bg-white text-white dark:text-black rounded-tr-sm' 
                                : 'bg-surface-light dark:bg-surface-dark text-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800 rounded-tl-sm'
                        }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-3xl rounded-tl-sm border border-gray-200 dark:border-zinc-800 flex gap-2 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-zinc-800">
                {messages.length < 2 && (
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
                        {['Analizar gastos', 'Crear presupuesto', 'Ahorro'].map((txt) => (
                            <button key={txt} onClick={() => handleSendMessage(txt)} className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-700 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                {txt}
                            </button>
                        ))}
                    </div>
                )}
                <div className="flex gap-3 items-center bg-surface-light dark:bg-surface-dark p-2 rounded-[2rem] border border-gray-200 dark:border-zinc-800 focus-within:border-black dark:focus-within:border-white transition-colors">
                    <input 
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:ring-0 dark:text-white placeholder-gray-400" 
                        placeholder="Escribe tu consulta..." 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <button 
                        onClick={() => handleSendMessage()}
                        disabled={!inputText.trim() || isLoading}
                        className="size-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;