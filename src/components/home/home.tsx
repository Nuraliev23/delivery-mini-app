"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Lock, User, Eye, EyeOff, Loader2, ChevronRight } from 'lucide-react';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(name, password);
      const user = JSON.parse(document.cookie.split('; ').find(c => c.startsWith('order_token='))?.split('=')[1] || '{}');
      
      // Анимация успешного входа перед редиректом
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user?.role === 'client') router.push('/client');
      else if (user?.role === 'courier') router.push('/courier');
      else if (user?.role === 'admin') router.push('/admin');
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] p-4">
      {/* Главная карточка */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Шапка с градиентом */}
        <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] p-6 text-white">
          <h1 className="text-2xl font-bold">Вход в систему</h1>
          <p className="text-white/90 mt-1">Введите телефон или email и пароль</p>
        </div>

        {/* Тело формы */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Поле ввода логина */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Логин</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Телефон или email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Поле ввода пароля */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-11 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Ссылка "Забыли пароль" */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-orange-600 hover:underline">Забыли пароль?</a>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  Войти <ChevronRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>

            {/* Сообщение об ошибке */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-start gap-2 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Футер с ссылкой на регистрацию */}
        <div className="border-t border-gray-100 p-6 text-center">
          <p className="text-gray-600">Ещё нет аккаунта?{' '}
            <a href="/register" className="text-orange-600 font-medium hover:underline">Зарегистрироваться</a>
          </p>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30"></div>
      </div>
    </div>
  );
};

export default LoginPage;