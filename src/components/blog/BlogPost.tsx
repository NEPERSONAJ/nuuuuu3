import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Bot, Menu, X, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../shared/Footer';

// Blog posts data
const blogPostsData = {
  '1': {
    id: 1,
    title: 'Как AI меняет будущее разработки',
    description: 'Исследование влияния искусственного интеллекта на современную разработку программного обеспечения и будущие перспективы индустрии.',
    keywords: ['AI', 'разработка', 'программирование', 'будущее технологий', 'автоматизация'],
    content: `
      Искусственный интеллект становится неотъемлемой частью процесса разработки программного обеспечения. 
      В этой статье мы рассмотрим, как AI трансформирует индустрию разработки и какие возможности открываются перед разработчиками.

      ## Ключевые преимущества AI в разработке

      1. **Автоматизация рутинных задач**
      AI способен автоматизировать множество повторяющихся задач, позволяя разработчикам сосредоточиться на более сложных и креативных аспектах работы.

      2. **Улучшение качества кода**
      Современные AI-инструменты помогают находить потенциальные ошибки и уязвимости в коде еще до его запуска, значительно повышая качество конечного продукта.

      3. **Ускорение разработки**
      Благодаря AI, время разработки может сократиться на 30-50%, при этом качество кода остается на высоком уровне.

      ## Практическое применение

      - Генерация кода и рефакторинг
      - Анализ производительности
      - Предсказание потенциальных проблем
      - Оптимизация архитектуры

      ## Будущие перспективы

      В ближайшие годы мы ожидаем еще более глубокую интеграцию AI в процессы разработки. Это приведет к появлению новых инструментов и методологий, которые сделают разработку еще более эффективной.
    `,
    date: '2024-03-24',
    author: 'Александр Петров',
    authorTitle: 'Senior AI Developer',
    authorBio: 'Александр специализируется на интеграции AI в процессы разработки и имеет более 10 лет опыта в индустрии.',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200',
    readTime: '5 минут',
    category: 'Технологии'
  },
};

export const BlogPost = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const { id } = useParams();
  
  const post = id ? blogPostsData[id as keyof typeof blogPostsData] : null;

  useEffect(() => {
    if (showShareTooltip) {
      const timer = setTimeout(() => setShowShareTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showShareTooltip]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(`${post.title} | ChatGPTi`);

  const handleShare = async (platform?: string) => {
    if (!platform) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            text: post.description,
            url: shareUrl
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      }
      return;
    }

    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setShowShareTooltip(true);
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | ChatGPTi`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
      </Helmet>

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center text-[#00e5ff] hover:opacity-80 transition-opacity mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к блогу
            </Link>

            <article className="neon-card">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4 text-sm text-[#00e5ff] opacity-60">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div>{post.readTime}</div>
                </div>

                {/* Share buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShare()}
                    className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300 md:hidden"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  <div className="hidden md:flex items-center space-x-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => handleShare('copy')}
                        className="p-2 border border-[#00e5ff] rounded-lg text-[#00e5ff] hover:bg-[#00e5ff] hover:bg-opacity-10 transition-all duration-300"
                        aria-label="Copy link"
                      >
                        {showShareTooltip ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      {showShareTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-[#00e5ff] text-[#040714] text-sm rounded">
                          Скопировано!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-[#00e5ff] mb-6">{post.title}</h1>
              
              <div className="prose prose-invert prose-cyan max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('##')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-[#00e5ff] mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <li key={index} className="text-[#00e5ff] opacity-80 ml-4">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-[#00e5ff] opacity-80 mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Author section */}
              <div className="mt-12 pt-8 border-t border-[#00e5ff] border-opacity-20">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-[#00e5ff] font-bold">{post.author}</h3>
                    <p className="text-[#00e5ff] opacity-60 text-sm">{post.authorTitle}</p>
                    <p className="text-[#00e5ff] opacity-80 mt-2 text-sm">{post.authorBio}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};