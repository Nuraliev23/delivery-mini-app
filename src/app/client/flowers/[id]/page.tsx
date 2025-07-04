"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Loader2 } from "lucide-react"

interface Flower {
  id: number
  name: string
  mainPhoto: string
  address: string
  city: string
}

export default function FlowerPage() {
  const { id } = useParams()
  const [flower, setFlower] = useState<Flower | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://af7bea425ac1682f.mokky.dev/flowers/${id}`)
        .then((res) => setFlower(res.data))
        .catch((err) => console.error(err))
    }
  }, [id])

  if (!flower) return <Loader2/>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{flower.name}</h1>
      <p>{flower.address}</p>
      <img
        src={flower.mainPhoto}
        alt={flower.name}
        className="mt-4 rounded-xl w-full max-w-md"
      />
    </div>
  )
}
