"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Pharmacy {
  id: number;
  name: string;
  mainPhoto: string;
  address: string;
  city: string;
}

export default function PharmacyPage() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://af7bea425ac1682f.mokky.dev/pharmacies/${id}`)
        .then((res) => setPharmacy(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!pharmacy) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{pharmacy.name}</h1>
      <p>{pharmacy.address}</p>
      <img
        src={pharmacy.mainPhoto}
        alt={pharmacy.name}
        className="mt-4 rounded-xl w-full max-w-md"
      />
    </div>
  );
}
