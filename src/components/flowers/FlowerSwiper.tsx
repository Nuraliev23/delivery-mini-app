"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Star, MapPin, ChevronRight } from "lucide-react";

interface Flower {
  id: number;
  name: string;
  mainPhoto: string;
  city: string;
  rating?: number;
  deliveryTime?: string;
  minOrder?: number;
}

const FlowerSwiper = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    fetch("https://af7bea425ac1682f.mokky.dev/flowers")
      .then((res) => res.json())
      .then(data => setFlowers(data.map((item: Flower) => ({
        ...item,
        rating: Math.round(Math.random() * 20 + 30) / 10, // 3.0-5.0
        deliveryTime: `${Math.floor(Math.random() * 30) + 15} мин`,
        minOrder: Math.floor(Math.random() * 500) + 500
      })))
  )}, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Цветочные салоны</h2>
        <button className="text-red-500 text-sm font-medium flex items-center">
          Все <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          640: { slidesPerView: 2.8 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.2 }
        }}
        className="!pb-8"
      >
        {flowers.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto">
            <div className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 bg-white flex flex-col">
              <div className="relative">
                <img
                  src={item.mainPhoto}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs font-semibold">{item.rating}</span>
                </div>
              </div>
              
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{item.city}</span>
                </div>
                
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{item.deliveryTime}</span>
                    <span className="font-medium">от {item.minOrder} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FlowerSwiper;