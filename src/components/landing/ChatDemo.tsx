import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const demoMessages: Message[] = [
    { type: 'user', content: 'Можешь помочь мне с анализом данных?' },
    { type: 'bot', content: 'Конечно! Я специализируюсь на анализе данных. Какой тип анализа вам нужен?' },
    { type: 'user', content: 'Мне нужно создать визуализацию продаж за последний квартал' },
    { type: 'bot', content: 'Я могу помочь создать интерактивную визуализацию с графиками и диаграммами. Какие конкретно метрики вас интересуют?' }
  ];

  useEffect(() => {
    if (currentIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, demoMessages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="bg-[rgba(4,7,20,0.95)] rounded-2xl neon-border overflow-hidden">
      <div className="bg-[rgba(0,229,255,0.1)] p-4 border-b border-[var(--neon-cyan)] border-opacity-20">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-[var(--neon-cyan)]" />
          <span className="font-medium text-[var(--neon-cyan)]">ChatGPTi Assistant</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-start space-x-3 ${
              message.type === 'bot' ? '' : 'flex-row-reverse space-x-reverse'
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'bot' ? 'bg-[rgba(0,229,255,0.1)]' : 'bg-[rgba(0,229,255,0.2)]'
            }`}>
              {message.type === 'bot' ? (
                <Bot className="w-5 h-5 text-[var(--neon-cyan)]" />
              ) : (
                <User className="w-5 h-5 text-[var(--neon-cyan)]" />
              )}
            </div>
            <div className={`flex-1 max-w-xl rounded-2xl p-4 ${
              message.type === 'bot' 
                ? 'bg-[rgba(0,229,255,0.1)] text-[var(--neon-cyan)]' 
                : 'bg-[rgba(0,229,255,0.15)] text-[var(--neon-cyan)]'
            }`}>
              <p className="text-sm">{message.content}</p>
            </div>
          </motion.div>
        ))}
        {currentIndex < demoMessages.length && (
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full shadow-[var(--neon-glow)]"
            />
          </div>
        )}
      </div>
    </div>
  );
};