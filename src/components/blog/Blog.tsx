import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Bot, Menu, X, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../shared/Footer';

export const Blog = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: 'Как AI меняет будущее разработки',
      excerpt: 'Искусственный интеллект становится неотъемлемой частью процесса разработки программного обеспечения...',
      date: '2024-03-24',
      author: 'Александр Петров',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800',
      tags: ['AI', 'Разработка', 'Технологии', 'Будущее'],
      category: 'Технологии',
      readTime: '5 минут'
    },
    {
      id: 2,
      title: 'Топ-10 применений ChatGPTi',
      excerpt: 'Рассмотрим наиболее эффективные способы использования ChatGPTi для повышения продуктивности...',
      date: '2024-03-22',
      author: 'Елена Соколова',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800',
      tags: ['ChatGPT', 'Продуктивность', 'AI', 'Инструменты'],
      category: 'Руководства',
      readTime: '7 минут'
    },
    {
      id: 3,
      title: 'Безопасность и AI: что нужно знать',
      excerpt: 'Обзор основных аспектов безопасности при работе с искусственным интеллектом...',
      date: '2024-03-20',
      author: 'Михаил Волков',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800',
      tags: ['Безопасность', 'AI', 'Конфиденциальность'],
      category: 'Безопасность',
      readTime: '6 минут'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Блог ChatGPTi - Новости и статьи об искусственном интеллекте</title>
        <meta name="description" content="Читайте последние новости, руководства и исследования в области искусственного интеллекта и машинного обучения." />
        <meta name="keywords" content="AI, искусственный интеллект, ChatGPT, машинное обучение, технологии, разработка" />
        <meta property="og:title" content="Блог ChatGPTi - Новости и статьи об искусственном интеллекте" />
        <meta property="og:description" content="Читайте последние новости, руководства и исследования в области искусственного интеллекта и машинного обучения." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Блог ChatGPTi - Новости и статьи об искусственном интеллекте" />
        <meta name="twitter:description" content="Читайте последние новости, руководства и исследования в области искусственного интеллекта и машинного обучения." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-[#040714]">
        {/* Header */}
        <header className="fixed top-0 w-full bg-[rgba(4,7,20,0.9)] backdrop-blur-md z-50 border-b border-[#00e5ff] border-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Link to="/" className="flex items-center space-x-2">
                  <Bot className="w-8 h-8 text-[#00e5ff]" />
                  <span className="text-xl font-bold neon-text">ChatGPTi</span>
                </Link>
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
                <Link
                  to="/#features"
                  className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Возможности
                </Link>
                <Link
                  to="/#testimonials"
                  className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Отзывы
                </Link>
                <Link
                  to="/#pricing"
                  className="block px-3 py-2 text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Цены
                </Link>
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

        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-[#00e5ff] mb-4">Блог ChatGPTi</h1>
              <p className="text-xl text-[#00e5ff] opacity-80">
                Последние новости, руководства и исследования в области AI
              </p>
            </div>

            {/* Tags Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag, index) => (
                <button
                  key={index}
                  className="px-3 py-1 rounded-full bg-[rgba(0,229,255,0.1)] text-[#00e5ff] text-sm
                           hover:bg-[rgba(0,229,255,0.2)] transition-all duration-300 flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="neon-card group hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[rgba(0,229,255,0.9)] text-[#040714] px-2 py-1 rounded text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-[#00e5ff] bg-[rgba(0,229,255,0.1)] px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-[#00e5ff] opacity-60">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#00e5ff] mb-3">{post.title}</h2>
                  <p className="text-[#00e5ff] opacity-80 mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#00e5ff] hover:opacity-80 transition-opacity"
                  >
                    Читать далее
                    <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};