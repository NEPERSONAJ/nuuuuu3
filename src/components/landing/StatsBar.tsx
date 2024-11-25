import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, Users, Zap, Award } from 'lucide-react';

export const StatsBar = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: MessageSquare,
      value: '1M+',
      label: 'Ответов ежедневно',
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Активных пользователей',
    },
    {
      icon: Zap,
      value: '100ms',
      label: 'Среднее время ответа',
    },
    {
      icon: Award,
      value: '99.9%',
      label: 'Точность ответов',
    },
  ];

  return (
    <div className="bg-[rgba(4,7,20,0.98)] py-12 border-y border-[var(--neon-cyan)] border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(0,229,255,0.1)] mb-4">
                <stat.icon className="w-6 h-6 text-[var(--neon-cyan)]" />
              </div>
              <div className="text-2xl font-bold text-[var(--neon-cyan)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--neon-cyan)] opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};