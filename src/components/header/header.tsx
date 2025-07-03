"use client";

import { useState } from "react";
import { Search, MapPin, Globe, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ModernHeader() {
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter()
  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 shadow-2xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="ml-3 text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 hidden sm:block">
              MiniDelivery
            </span>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                <Input
                  type="text"
                  placeholder="Ёфтани ресторан, таом ё мол"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 pl-12 pr-4 py-3 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none focus:ring-0 text-sm"
                />
                <Button className="group/btn relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden mr-2">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Ёфтан</span>
                    <Search className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Delivery Address Button */}
            <Button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden hidden md:flex">
              <span className="relative z-10 flex items-center space-x-2">
                <MapPin className="w-4 h-4 group-hover:animate-bounce" />
                <span className="text-sm">Суроғаи расониданро нишон диҳед</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            {/* Language Selector */}
            <div className="relative">
              <Button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="group flex items-center space-x-2 text-white hover:text-yellow-400 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium hidden sm:block">
                Тоҷикӣ
                </span>
              </Button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-2xl z-50 animate-fade-in-up">
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-all duration-200 flex items-center space-x-2">
                      <span>🇹🇯</span>
                      <span>Тоҷикӣ</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-all duration-200 flex items-center space-x-2">
                      <span>🇷🇺</span>
                      <span>Русский</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-all duration-200 flex items-center space-x-2">
                      <span>🇺🇸</span>
                      <span>English</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button  onClick={()=>router.push('/login')} className="group flex items-center space-x-2 text-white hover:text-yellow-400 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span  className="text-sm font-medium hidden sm:block">Ворид шудан</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-400 p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl animate-fade-in-up">
            <div className="p-4 space-y-4">
              {/* Mobile Delivery Address */}
              <Button className="w-full group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Суроғаи расониданро нишон диҳед</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              {/* Mobile Language */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center space-x-2 text-white">
                  <Globe className="w-4 h-4" />
                  <span>Забон</span>
                </div>
                <span className="text-yellow-400 font-medium">Тоҷикӣ</span>
              </div>

              {/* Mobile Login */}
              <Button onClick={()=>router.push('/login')} className="w-full flex items-center justify-center space-x-2 text-white hover:text-yellow-400 p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
                <User className="w-4 h-4" />
                <span >Ворид шудан</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
