import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'Александр Петров',
      role: 'Senior Developer',
      company: 'Tech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
      content: 'ChatGPTi полностью изменил мой подход к разработке. Теперь я могу создавать сложные приложения в разы быстрее.',
      rating: 5
    },
    {
      name: 'Елена Соколова',
      role: 'Data Scientist',
      company: 'AI Research Lab',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100',
      content: 'Потрясающая точность в анализе данных. Это не просто инструмент, а настоящий напарник в исследованиях.',
      rating: 5
    },
    {
      name: 'Михаил Волков',
      role: 'Product Manager',
      company: 'Innovation Hub',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
      content: 'Использую ChatGPTi для генерации идей и прототипирования. Результаты превзошли все ожидания.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[rgba(4,7,20,0.95)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--neon-cyan)] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            Что говорят наши пользователи
          </h2>
          <p className="text-xl text-[var(--neon-cyan)] opacity-80 max-w-3xl mx-auto">
            Присоединитесь к тысячам профессионалов, которые уже оценили преимущества ChatGPTi
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[rgba(4,7,20,0.98)] rounded-2xl p-8 neon-border hover:shadow-[var(--neon-glow-strong)]
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--neon-cyan)] fill-current" />
                ))}
              </div>
              <p className="text-[var(--neon-cyan)] opacity-80 mb-6">{testimonial.content}</p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full ring-2 ring-[var(--neon-cyan)] ring-opacity-50"
                />
                <div>
                  <h4 className="font-semibold text-[var(--neon-cyan)]">{testimonial.name}</h4>
                  <p className="text-sm text-[var(--neon-cyan)] opacity-60">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Statistics */}
        <div className="mt-24 bg-[rgba(0,229,255,0.1)] rounded-3xl p-12 neon-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-cyan)] mb-2">1M+</div>
              <div className="text-[var(--neon-cyan)] opacity-80">Ежедневных запросов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-cyan)] mb-2">10K+</div>
              <div className="text-[var(--neon-cyan)] opacity-80">Активных пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-cyan)] mb-2">99.9%</div>
              <div className="text-[var(--neon-cyan)] opacity-80">Точность ответов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};