"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

interface Restaurant {
  id: number
  name: string
  mainPhoto: string
  address: string
  city: string
}

export default function RestaurantPage() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
console.log(id);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://af7bea425ac1682f.mokky.dev/restaurants/${id}`)
        .then((res) => setRestaurant(res.data))
        .catch((err) => console.error(err))
    }
  }, [id])

  if (!restaurant) return <div>Загрузка...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <img
        src={restaurant.mainPhoto}
        alt={restaurant.name}
        className="mt-4 rounded-xl w-full max-w-md"
      />
    </div>
  )
}
