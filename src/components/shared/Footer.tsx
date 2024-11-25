import React from 'react';
import { Bot, Instagram, MessageCircle, Phone, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/chatgpti', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/chatgpti', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/chatgpti', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/chatgpti', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/chatgpti', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://t.me/chatgpti', label: 'Telegram' },
    { icon: Phone, href: 'https://wa.me/79991234567', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-[rgba(4,7,20,0.98)] border-t border-[#00e5ff] border-opacity-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="w-8 h-8 text-[#00e5ff]" />
              <span className="text-xl font-bold neon-text">ChatGPTi</span>
            </div>
            <p className="text-[#00e5ff] opacity-80 mb-4">
              Ваш идеальный AI-ассистент для решения любых задач
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wider mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/#features" className="neon-link">Возможности</Link></li>
              <li><Link to="/#testimonials" className="neon-link">Отзывы</Link></li>
              <li><Link to="/#pricing" className="neon-link">Цены</Link></li>
              <li><Link to="/blog" className="neon-link">Блог</Link></li>
              <li><Link to="/contact" className="neon-link">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wider mb-4">Компания</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="neon-link">О нас</Link></li>
              <li><Link to="/careers" className="neon-link">Карьера</Link></li>
              <li><Link to="/privacy" className="neon-link">Конфиденциальность</Link></li>
              <li><Link to="/terms" className="neon-link">Условия использования</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wider mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#00e5ff]" />
                <a href="tel:+79991234567" className="neon-link">+7 (999) 123-45-67</a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-[#00e5ff]" />
                <a href="mailto:support@chatgpti.com" className="neon-link">support@chatgpti.com</a>
              </li>
              <li className="text-[#00e5ff] opacity-80">
                Москва, ул. Примерная, д. 1
              </li>
              <li className="text-[#00e5ff] opacity-80">
                Пн-Пт: 9:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#00e5ff] border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#00e5ff] opacity-60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ChatGPTi. Все права защищены.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="text-[#00e5ff] opacity-60 hover:opacity-100 text-sm">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-[#00e5ff] opacity-60 hover:opacity-100 text-sm">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};