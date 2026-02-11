
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, RefreshCw } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';
import { Language } from '../translations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Added language prop to fix TypeScript error in App.tsx
interface AIAssistantProps {
  language: Language;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Саламатсызбы! Мен AiNabi CRM акылдуу жардамчысымын. Сизге студенттердин жетишкендиктерин талдоо же академияны өнүктүрүү боюнча кандай жардам бере алам?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getAIRecommendation(userMessage);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || "Кечириңиз, суроого жооп бере албай жатам." }]);
    setIsLoading(false);
  };

  const QuickInsights = [
    "Студенттердин санын кантип көбөйтсө болот?",
    "Акыркы айдагы кирешени талдап бер",
    "Кетүү коркунучу бар студенттерди аныктоо",
    "Маркетинг стратегиясы боюнча кеңеш"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">AiNabi AI Жардамчы</h2>
          <p className="text-sm text-slate-500">AiNabi AI тарабынан иштетилген акылдуу аналитика</p>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-200 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}>
                {msg.role === 'assistant' && <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  AINABI AI КЕҢЕШЧИ
                </div>}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-sm text-slate-500 font-medium">Ойлонуп жатам...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {QuickInsights.map((insight, idx) => (
              <button 
                key={idx}
                onClick={() => setInput(insight)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-xs font-medium text-slate-600 transition-all border border-slate-200"
              >
                {insight}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Сурооңузду жазыңыз..."
              className="w-full pl-4 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-slate-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
