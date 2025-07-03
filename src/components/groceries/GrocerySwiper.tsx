"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Star, MapPin, ChevronRight, Clock, ShoppingBasket, Loader2 } from 'lucide-react'

interface Grocery {
  id: number
  name: string
  mainPhoto: string
  city: string
  rating?: number
  deliveryTime?: string
  minOrder?: number
}

const GrocerySwiper = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://af7bea425ac1682f.mokky.dev/groceries')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных')
        return res.json()
      })
      .then(data => {
        setGroceries(data.map((item: Grocery) => ({
          ...item,
          rating: (Math.random() * 2 + 3).toFixed(1), // Рейтинг 3.0-5.0
          deliveryTime: `${Math.floor(Math.random() * 20) + 10}-${Math.floor(Math.random() * 20) + 30} мин`,
          minOrder: Math.floor(Math.random() * 500) + 500
        })))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
        {error}
      </div>
    )
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold">Продуктовые магазины</h2>
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
          640: { slidesPerView: 3.2 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.2 }
        }}
        className="!px-4 !pb-2"
      >
        {groceries.map((item) => (
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
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.deliveryTime}
                    </span>
                    <span className="font-medium">от {item.minOrder} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default GrocerySwiper