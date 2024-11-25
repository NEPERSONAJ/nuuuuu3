import React from 'react';
import { Mail, Phone, MapPin, ArrowLeft, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../shared/Footer';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#040714]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[rgba(4,7,20,0.9)] backdrop-blur-md z-50 border-b border-[#00e5ff] border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-[#00e5ff]" />
              <span className="text-xl font-bold neon-text">ChatGPTi</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="neon-link">Главная</Link>
              <Link to="/#testimonials" className="neon-link">Отзывы</Link>
              <Link to="/#pricing" className="neon-link">Цены</Link>
              <Link to="/blog" className="neon-link">Блог</Link>
              <Link to="/contact" className="neon-link">Контакты</Link>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300">
                Войти
              </Link>
              <Link to="/register" className="cyber-button px-4 py-2">
                Начать
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#00e5ff] mb-4">Свяжитесь с нами</h1>
            <p className="text-xl text-[#00e5ff] opacity-80">
              Мы всегда готовы помочь вам и ответить на все вопросы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="neon-card">
                <h2 className="text-2xl font-bold text-[#00e5ff] mb-6">Контактная информация</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-[#00e5ff]" />
                    <span className="text-[#00e5ff]">support@chatgpti.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-[#00e5ff]" />
                    <span className="text-[#00e5ff]">+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-[#00e5ff]" />
                    <span className="text-[#00e5ff]">Москва, ул. Примерная, д. 1</span>
                  </div>
                </div>
              </div>

              <div className="neon-card">
                <h2 className="text-2xl font-bold text-[#00e5ff] mb-6">Часы работы</h2>
                <div className="space-y-2">
                  <p className="text-[#00e5ff]">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-[#00e5ff]">Сб-Вс: Выходной</p>
                </div>
              </div>
            </div>

            <div className="neon-card">
              <h2 className="text-2xl font-bold text-[#00e5ff] mb-6">Напишите нам</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#00e5ff] mb-2">Имя</label>
                  <input
                    type="text"
                    className="cyber-input w-full"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-[#00e5ff] mb-2">Email</label>
                  <input
                    type="email"
                    className="cyber-input w-full"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#00e5ff] mb-2">Сообщение</label>
                  <textarea
                    className="cyber-input w-full h-32 resize-none"
                    placeholder="Ваше сообщение..."
                  />
                </div>
                <button type="submit" className="cyber-button w-full">
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};