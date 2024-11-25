import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star } from 'lucide-react';

export const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Идеально для знакомства с возможностями',
      features: [
        'До 100 запросов в день',
        'Базовые модели ИИ',
        'Стандартная поддержка',
        'Публичные проекты'
      ]
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Для профессионалов и растущих команд',
      features: [
        'Неограниченные запросы',
        'Продвинутые модели ИИ',
        'Приоритетная поддержка',
        'Приватные проекты',
        'API доступ',
        'Расширенная аналитика'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '99',
      description: 'Для крупных организаций',
      features: [
        'Все функции Pro плана',
        'Выделенные ресурсы',
        'SLA гарантии',
        'Персональный менеджер',
        'Обучение команды',
        'Кастомные интеграции'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[rgba(4,7,20,0.98)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--neon-cyan)] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            Выберите свой план
          </h2>
          <p className="text-xl text-[var(--neon-cyan)] opacity-80 max-w-3xl mx-auto">
            Гибкие тарифы для любых потребностей. Начните бесплатно и растите вместе с нами
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-[rgba(4,7,20,0.95)] rounded-2xl p-8 ${
                plan.popular ? 'neon-border relative' : 'border-2 border-[var(--neon-cyan)] border-opacity-20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="bg-[var(--neon-cyan)] text-[rgba(4,7,20,0.95)] px-4 py-1 rounded-full text-sm font-medium shadow-[var(--neon-glow)]">
                    Популярный
                  </div>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[var(--neon-cyan)] mb-2">{plan.name}</h3>
                <div className="text-[var(--neon-cyan)] opacity-80 mb-6">{plan.description}</div>
                <div className="text-4xl font-bold text-[var(--neon-cyan)] mb-6">
                  ${plan.price}
                  <span className="text-lg opacity-60">/мес</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[var(--neon-cyan)]" />
                    <span className="text-[var(--neon-cyan)] opacity-80">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'cyber-button glow-hover'
                    : 'bg-[rgba(0,229,255,0.1)] text-[var(--neon-cyan)] hover:bg-[rgba(0,229,255,0.2)] border-2 border-[var(--neon-cyan)] border-opacity-20'
                }`}
              >
                Выбрать план
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center text-[var(--neon-cyan)] mb-12 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            Часто задаваемые вопросы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'Могу ли я сменить план в любое время?',
                a: 'Да, вы можете изменить или отменить подписку в любой момент.'
              },
              {
                q: 'Есть ли пробный период?',
                a: 'Да, мы предоставляем 7-дневный пробный период для всех платных планов.'
              },
              {
                q: 'Какие методы оплаты вы принимаете?',
                a: 'Мы принимаем все основные кредитные карты и PayPal.'
              },
              {
                q: 'Предоставляете ли вы корпоративные скидки?',
                a: 'Да, свяжитесь с нами для обсуждения специальных условий.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[rgba(0,229,255,0.1)] rounded-xl p-6 neon-border">
                <h4 className="font-semibold text-[var(--neon-cyan)] mb-2">{faq.q}</h4>
                <p className="text-[var(--neon-cyan)] opacity-80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};