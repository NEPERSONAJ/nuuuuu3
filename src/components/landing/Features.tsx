import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Code, Brain, Zap } from 'lucide-react';

export const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: MessageCircle,
      title: 'Естественные разговоры',
      description: 'Общайтесь так, как будто разговариваете с блестящим другом. Никаких сложных команд или синтаксиса.'
    },
    {
      icon: Brain,
      title: 'Универсальные знания',
      description: 'От академических исследований до творческих проектов — мы охватываем все области знаний.'
    },
    {
      icon: Code,
      title: 'Генерация кода',
      description: 'Создавайте целые приложения с помощью ИИ. Получайте готовые решения для любых задач разработки.'
    },
    {
      icon: Zap,
      title: 'Учебный компаньон',
      description: 'Персонализированные объяснения в любой области. Учитесь в своем темпе с индивидуальным подходом.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-[rgba(4,7,20,0.98)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--neon-cyan)] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            Возможности, которые впечатляют
          </h2>
          <p className="text-xl text-[var(--neon-cyan)] opacity-80 max-w-3xl mx-auto">
            Откройте для себя инновационные функции, которые делают ChatGPTi незаменимым помощником
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[rgba(4,7,20,0.95)] rounded-2xl p-6 neon-border hover:shadow-[var(--neon-glow-strong)]
                         transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-[rgba(0,229,255,0.1)] flex items-center justify-center mb-6
                            group-hover:bg-[rgba(0,229,255,0.2)] transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-[var(--neon-cyan)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--neon-cyan)] mb-3">{feature.title}</h3>
              <p className="text-[var(--neon-cyan)] opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Demo Section */}
        <div className="mt-24 bg-[rgba(0,229,255,0.1)] rounded-3xl overflow-hidden neon-border">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12">
              <h3 className="text-3xl font-bold text-[var(--neon-cyan)] mb-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                Увидеть значит поверить
              </h3>
              <p className="text-lg mb-8 text-[var(--neon-cyan)] opacity-80">
                Посмотрите, как ChatGPTi помогает решать реальные задачи в реальном времени.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                {[
                  'Мгновенная генерация кода',
                  'Умные ответы на вопросы',
                  'Анализ данных в реальном времени'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[rgba(0,229,255,0.2)] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[var(--neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--neon-cyan)] opacity-80">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="relative h-full min-h-[400px] bg-[rgba(4,7,20,0.98)]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800')] 
                            bg-cover bg-center opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,229,255,0.1)] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};