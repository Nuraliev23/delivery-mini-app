"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Star, MapPin, ChevronRight, Clock, Cross, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

interface Pharmacy {
  id: number
  name: string
  mainPhoto: string
  city: string
  rating?: number
  deliveryTime?: string
  is24h?: boolean
}

const PharmacySwiper = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    fetch('https://af7bea425ac1682f.mokky.dev/pharmacies')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки аптек')
        return res.json()
      })
      .then(data => {
        setPharmacies(data.map((item: Pharmacy) => ({
          ...item,
          rating: (Math.random() * 2 + 3).toFixed(1), // Рейтинг 3.0-5.0
          deliveryTime: `${Math.floor(Math.random() * 15) + 5} мин`,
          is24h: Math.random() > 0.7 // 30% chance
        })))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleClick = (id: number) => {
    router.push(`/client/pharmacies/${id}`)
  }

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
        <h2 className="text-xl font-bold">Дорухонаҳои наздик</h2>
           <Button  className="cursor-pointer" onClick={()=>    router.push(`/client/orders/`)}>Сабти фармоиш</Button>
   
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
        {pharmacies.map((pharmacy) => (
          <SwiperSlide key={pharmacy.id} className="!h-auto">
            <div
              onClick={() => handleClick(pharmacy.id)}
              className="cursor-pointer h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 bg-white flex flex-col group"
            >
              <div className="relative">
                <img
                  src={pharmacy.mainPhoto}
                  alt={pharmacy.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs font-semibold">{pharmacy.rating}</span>
                  </div>
                  {pharmacy.is24h && (
                    <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg flex items-center">
                      <span className="text-xs font-semibold">24/7</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{pharmacy.name}</h3>
                
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{pharmacy.city}</span>
                </div>
                
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {pharmacy.deliveryTime}
                    </span>
                    <div className="flex items-center gap-1">
                      <Cross className="w-3 h-3 text-green-500" />
                      <span className="font-medium">Доставка</span>
                    </div>
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

export default PharmacySwiper
