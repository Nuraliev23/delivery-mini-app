"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Star, MapPin, ChevronRight, Clock, Loader2, Zap, Heart } from 'lucide-react'

interface Restaurant {
  id: number
  name: string
  mainPhoto: string
  city: string
  rating?: number
  deliveryTime?: string
  minOrder?: number
  isPromoted?: boolean
}

const RestaurantSwiper = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://af7bea425ac1682f.mokky.dev/restaurants')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки ресторанов')
        return res.json()
      })
      .then(data => {
        setRestaurants(data.map((item: Restaurant) => ({
          ...item,
          rating: (Math.random() * 2 + 3).toFixed(1), // Рейтинг 3.0-5.0
          deliveryTime: `${Math.floor(Math.random() * 30) + 15}-${Math.floor(Math.random() * 30) + 45} мин`,
          minOrder: Math.floor(Math.random() * 500) + 500,
          isPromoted: Math.random() > 0.8 // 20% chance
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
        <h2 className="text-xl font-bold">Рестораны и кафе</h2>
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
        {restaurants.map((restaurant) => (
          <SwiperSlide key={restaurant.id} className="!h-auto">
            <div className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 bg-white flex flex-col group">
              <div className="relative">
                <img
                  src={restaurant.mainPhoto}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {restaurant.isPromoted && (
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg flex items-center text-xs font-semibold">
                      <Zap className="w-3 h-3 fill-yellow-500 mr-1" />
                      Акция
                    </div>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs font-semibold">{restaurant.rating}</span>
                </div>
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full backdrop-blur-xs hover:bg-red-100 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{restaurant.name}</h3>
                
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{restaurant.city}</span>
                </div>
                
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {restaurant.deliveryTime}
                    </span>
                    <span className="font-medium">от {restaurant.minOrder} ₽</span>
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

export default RestaurantSwiper