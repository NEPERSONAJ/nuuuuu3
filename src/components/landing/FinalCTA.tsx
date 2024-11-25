import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

export const FinalCTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-[rgba(4,7,20,0.98)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="bg-[rgba(0,229,255,0.1)] rounded-3xl overflow-hidden neon-border"
        >
          <div className="relative px-8 py-16 md:px-16 md:py-24">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--neon-cyan)] mb-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                  Начните разрабатывать с ИИ сегодня
                </h2>
                <p className="text-xl text-[var(--neon-cyan)] opacity-80 mb-8">
                  Присоединяйтесь к тысячам разработчиков, которые уже используют ChatGPTi
                  для создания будущего
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <button className="w-full sm:w-auto px-8 py-4 cyber-button glow-hover flex items-center justify-center gap-2">
                    Начать бесплатно
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] 
                                   rounded-xl font-medium hover:bg-[rgba(0,229,255,0.1)] transition-all duration-300">
                    Демонстрация
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {[
                    {
                      icon: Clock,
                      text: '7-дневная пробная версия'
                    },
                    {
                      icon: Shield,
                      text: 'Безопасность корпоративного уровня'
                    },
                    {
                      icon: CheckCircle,
                      text: '100% гарантия удовлетворения'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-[var(--neon-cyan)]">
                      <item.icon className="w-5 h-5" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full opacity-10 blur-3xl" />
              <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full opacity-10 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};