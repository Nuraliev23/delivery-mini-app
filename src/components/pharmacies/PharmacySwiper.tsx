// components/PharmacySwiper.tsx
"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface Pharmacy {
  id: number
  name: string
  mainPhoto: string
  city: string
}

const PharmacySwiper = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])

  useEffect(() => {
    fetch('https://af7bea425ac1682f.mokky.dev/pharmacies')
      .then((res) => res.json())
      .then(setPharmacies)
  }, [])

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Аптеки</h2>
      <Swiper slidesPerView={2.5} spaceBetween={16}>
        {pharmacies.map((item) => (
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

export default PharmacySwiper
