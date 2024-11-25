import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User, Terminal, Menu, MessageSquare, Notebook, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import { AIAssistant } from './AIAssistant';
import { Notes } from './Notes';

export const Dashboard = () => {
  const { user, signOut } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'notes'>('ai');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b border-[var(--neon-cyan)] border-opacity-20 flex items-center justify-between px-6 bg-[rgba(0,229,255,0.05)]">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-[var(--neon-cyan)]" />
          <span className="text-lg font-bold text-[var(--neon-cyan)]">ChatGPTi</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--neon-cyan)]" />
            <span className="text-[var(--neon-cyan)]">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="cyber-button py-1 px-3"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>

        <button
          className="md:hidden text-[var(--neon-cyan)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-[rgba(4,7,20,0.98)] border-b border-[var(--neon-cyan)] border-opacity-20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-[var(--neon-cyan)]" />
            <span className="text-[var(--neon-cyan)]">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="cyber-button w-full py-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </button>
        </div>
      )}

      <div className="md:hidden flex border-b border-[var(--neon-cyan)] border-opacity-20">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 ${
            activeTab === 'ai' ? 'text-[var(--neon-cyan)] border-b-2 border-[var(--neon-cyan)]' : 'text-[var(--neon-cyan)] opacity-60'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          AI Ассистент
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 ${
            activeTab === 'notes' ? 'text-[var(--neon-cyan)] border-b-2 border-[var(--neon-cyan)]' : 'text-[var(--neon-cyan)] opacity-60'
          }`}
        >
          <Notebook className="w-5 h-5" />
          Заметки
        </button>
      </div>

      <main className="flex-1 p-4 md:p-6 bg-[rgba(4,7,20,0.98)]">
        <div className="hidden md:grid grid-cols-2 gap-6">
          <div className="neon-border rounded-lg p-4 md:p-6 bg-[rgba(0,229,255,0.05)]">
            <h2 className="text-xl font-bold text-[var(--neon-cyan)] mb-4">AI Ассистент</h2>
            <div className="h-[calc(100vh-220px)]">
              <AIAssistant />
            </div>
          </div>

          <div className="neon-border rounded-lg p-4 md:p-6 bg-[rgba(0,229,255,0.05)] overflow-auto">
            <h2 className="text-xl font-bold text-[var(--neon-cyan)] mb-4">Заметки</h2>
            <div className="h-[calc(100vh-220px)] overflow-auto">
              <Notes />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          {activeTab === 'ai' && (
            <div className="neon-border rounded-lg p-4 bg-[rgba(0,229,255,0.05)]">
              <h2 className="text-xl font-bold text-[var(--neon-cyan)] mb-4">AI Ассистент</h2>
              <div className="h-[calc(100vh-280px)]">
                <AIAssistant />
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="neon-border rounded-lg p-4 bg-[rgba(0,229,255,0.05)] overflow-auto">
              <h2 className="text-xl font-bold text-[var(--neon-cyan)] mb-4">Заметки</h2>
              <div className="h-[calc(100vh-280px)] overflow-auto">
                <Notes />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[var(--neon-cyan)] border-opacity-20 py-4 px-6 text-center bg-[rgba(0,229,255,0.05)]">
        <p className="text-[var(--neon-cyan)] opacity-60 text-sm">
          © {new Date().getFullYear()} ChatGPTi. Все права защищены.
        </p>
      </footer>
    </div>
  );
};