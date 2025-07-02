// components/RestaurantSwiper.tsx
"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface Restaurant {
  id: number
  name: string
  mainPhoto: string
  city: string
}

const RestaurantSwiper = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    fetch('https://af7bea425ac1682f.mokky.dev/restaurants')
      .then((res) => res.json())
      .then(setRestaurants)
  }, [])

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Рестораны</h2>
      <Swiper slidesPerView={2.5} spaceBetween={16}>
        {restaurants.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-xl overflow-hidden shadow">
              <img src={`${item.mainPhoto}`} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-2">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.city}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RestaurantSwiper
