"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = useAuthStore.getState().user;
      if (!user) return;

      const pathMap = {
        client: "/client",
        courier: "/courier",
        admin: "/admin",
      } as const;

      router.push(pathMap[user.role]);
    } catch (err) {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="relative">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>

          <div className="text-center p-6 relative z-10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Добро пожаловать
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Введите свои данные для входа в систему
            </p>
          </div>

          <div className="px-6 pb-6 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className=" text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Имя пользователя
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className=" text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <Lock className="w-4 h-4" />
                  Пароль
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </div>

          {/* Футер */}
          <div className="text-center pb-6 text-sm text-gray-500 relative z-10">
            <p>
              Нет аккаунта?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Зарегистрируйтесь
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
