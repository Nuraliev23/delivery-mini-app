"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

interface Grocery {
  id: number
  name: string
  mainPhoto: string
  address: string
  city: string
}

export default function GroceryPage() {
  const { id } = useParams()
  const [grocery, setGrocery] = useState<Grocery | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://af7bea425ac1682f.mokky.dev/groceries/${id}`)
        .then((res) => setGrocery(res.data))
        .catch((err) => console.error(err))
    }
  }, [id])

  if (!grocery) return <div>Загрузка...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{grocery.name}</h1>
      <p>{grocery.address}</p>
      <img
        src={grocery.mainPhoto}
        alt={grocery.name}
        className="mt-4 rounded-xl w-full max-w-md"
      />
    </div>
  )
}
