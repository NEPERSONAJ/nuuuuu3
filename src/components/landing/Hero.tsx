import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatDemo } from './ChatDemo';
import { StatsBar } from './StatsBar';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { FinalCTA } from './FinalCTA';
import { Footer } from '../shared/Footer';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[rgba(4,7,20,0.9)] backdrop-blur-md z-50 border-b border-[#00e5ff] border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-[#00e5ff]" />
              <span className="text-xl font-bold neon-text">
                ChatGPTi
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="neon-link">Возможности</a>
              <a href="#testimonials" className="neon-link">Отзывы</a>
              <a href="#pricing" className="neon-link">Цены</a>
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

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#00e5ff]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[rgba(4,7,20,0.95)] border-b border-[#00e5ff] border-opacity-20">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Отзывы
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Цены
              </a>
              <Link
                to="/blog"
                className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Блог
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </Link>
              <div className="pt-4 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-center border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-center cyber-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Начать
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[rgba(0,229,255,0.1)] text-[#00e5ff] mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Искусственный интеллект нового поколения</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 neon-text leading-tight"
            >
              Ваш идеальный AI-ассистент
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-[#00e5ff] opacity-80 mb-12 max-w-3xl mx-auto"
            >
              Получите мгновенную помощь с написанием, анализом, кодированием и творческой работой
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link to="/register" className="cyber-button w-full sm:w-auto px-8 py-4 text-lg">
                Попробуйте ChatGPTi бесплатно
              </Link>
              <span className="text-[#00e5ff] opacity-60">
                более 10 000 профессионалов уже используют
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <ChatDemo />
          </motion.div>
        </div>
      </section>

      <StatsBar />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};