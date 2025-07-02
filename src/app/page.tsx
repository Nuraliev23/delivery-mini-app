import React from 'react';
import GrocerySwiper from '@/components/groceries/GrocerySwiper';
import PharmacySwiper from '@/components/pharmacies/PharmacySwiper';
import FlowerSwiper from '@/components/flowers/FlowerSwiper';
import RestaurantSwiper from '@/components/restaurants/RestaurantSwiper';
import { Search } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Категории */}
        <div className="flex overflow-x-auto py-4 gap-4 scrollbar-hide">
          {['Рестораны', 'Продукты', 'Аптеки', 'Цветы', 'Кофе', 'Кондитерские'].map((category) => (
            <button
              key={category}
              className="flex-shrink-0 px-4 py-2 text-black rounded-full shadow-sm border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Баннер */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Бесплатная доставка</h2>
            <p className="text-sm opacity-90">При заказе от 250 c до конца дня</p>
          </div>
        </div>

        {/* Секции с товарами */}
        <section className="mb-8">
          <RestaurantSwiper />
        </section>

        <section className="mb-8">
          <GrocerySwiper />
        </section>

        <section className="mb-8">
          <PharmacySwiper />
        </section>

        <section className="mb-8">
          <FlowerSwiper />
        </section>
      </main>

      {/* Нижнее меню */}
      <nav className="bottom-0  bg-white border-t border-gray-200 py-2">
        <div className="max-w-4xl mx-auto px-4 flex justify-around">
          {[
            { icon: '🏠', label: 'Главная' },
            { icon: '🔍', label: 'Поиск' },
            { icon: '🛒', label: 'Корзина' },
            { icon: '❤️', label: 'Избранное' },
            { icon: '👤', label: 'Профиль' },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center py-1 text-xs"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomePage;