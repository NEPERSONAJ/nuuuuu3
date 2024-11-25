import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Cpu, Mail, Lock, Github, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthFormProps {
  type: 'signin' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (type === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при аутентификации');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#040714]">
      <div className="w-full max-w-md bg-[#040714] rounded-2xl border-2 border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.3)] p-8 relative">
        <Link to="/" className="absolute right-4 top-4 text-[#00e5ff] hover:text-white transition-colors text-2xl">&times;</Link>
        
        <div className="flex flex-col items-center mb-8">
          <Cpu className="w-16 h-16 text-[#00e5ff] mb-4" />
          <h1 className="text-3xl font-bold text-[#00e5ff] mb-2 font-['JetBrains_Mono'] tracking-wider">
            Терминал Доступа
          </h1>
        </div>

        <div className="flex gap-8 mb-8">
          <Link 
            to="/login"
            className={`flex-1 pb-2 border-b-2 transition-all text-center font-['JetBrains_Mono'] ${
              type === 'signin' 
                ? 'border-[#00e5ff] text-[#00e5ff]' 
                : 'border-gray-700 text-gray-500 hover:text-[#00e5ff] hover:border-[#00e5ff] hover:border-opacity-50'
            }`}
          >
            Вход
          </Link>
          <Link 
            to="/register"
            className={`flex-1 pb-2 border-b-2 transition-all text-center font-['JetBrains_Mono'] ${
              type === 'register' 
                ? 'border-[#00e5ff] text-[#00e5ff]' 
                : 'border-gray-700 text-gray-500 hover:text-[#00e5ff] hover:border-[#00e5ff] hover:border-opacity-50'
            }`}
          >
            Регистрация
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-red-500 bg-red-500 bg-opacity-10 text-red-500 rounded font-['JetBrains_Mono']">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#00e5ff] opacity-80 font-['JetBrains_Mono']">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#00e5ff]" />
              <input
                type="email"
                placeholder="ИМЯ@ПРИМЕР.РФ"
                className="w-full bg-transparent border-2 border-[#00e5ff] rounded-lg p-3 pl-12
                         text-[#00e5ff] placeholder-[#00e5ff] placeholder-opacity-50
                         focus:outline-none focus:shadow-[0_0_10px_rgba(0,229,255,0.3)]
                         font-['JetBrains_Mono'] uppercase tracking-wider"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#00e5ff] opacity-80 font-['JetBrains_Mono']">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#00e5ff]" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent border-2 border-[#00e5ff] rounded-lg p-3 pl-12
                         text-[#00e5ff] placeholder-[#00e5ff] placeholder-opacity-50
                         focus:outline-none focus:shadow-[0_0_10px_rgba(0,229,255,0.3)]
                         font-['JetBrains_Mono']"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-transparent border-2 border-[#00e5ff] rounded-lg p-3
                     text-[#00e5ff] font-['JetBrains_Mono'] tracking-wider
                     hover:bg-[#00e5ff] hover:bg-opacity-10 hover:text-[#00e5ff]
                     hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                     focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                     transition-all duration-300"
          >
            {type === 'signin' ? 'ИНИЦИАЛИЗАЦИЯ ВХОДА' : 'СОЗДАТЬ АККАУНТ'} →
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#040714] text-[#00e5ff] font-['JetBrains_Mono']">
                Внешние Точки Доступа
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              className="flex items-center justify-center gap-2 p-3
                       border-2 border-[#00e5ff] rounded-lg
                       text-[#00e5ff] font-['JetBrains_Mono']
                       hover:bg-[#00e5ff] hover:bg-opacity-10 hover:text-[#00e5ff]
                       hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                       focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                       transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              GITHUB
            </button>
            <button 
              className="flex items-center justify-center gap-2 p-3
                       border-2 border-[#00e5ff] rounded-lg
                       text-[#00e5ff] font-['JetBrains_Mono']
                       hover:bg-[#00e5ff] hover:bg-opacity-10 hover:text-[#00e5ff]
                       hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                       focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                       transition-all duration-300"
            >
              <Globe className="w-5 h-5" />
              GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};