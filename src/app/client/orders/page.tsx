'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Truck, User, Phone, MapPin, FileText, DollarSign, Loader2 } from 'lucide-react';

const OrderPage = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    address: '',
    description: '',
    price: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrder = {
      ...formData,
      description: formData.description || 'Фармоиш тавассути барномаи Delivery',
      status: 'дар роҳ',
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post('https://af7bea425ac1682f.mokky.dev/orders', newOrder);
      toast.success('Фармоиш бо муваффақият қабул шуд!', {
        icon: '✅',
        style: {
          borderRadius: '12px',
          background: '#4ade80',
          color: '#fff',
        },
      });
      
      // Бозгашт ба ҳолати ибтидоӣ
      setFormData({
        clientName: '',
        phone: '',
        address: '',
        description: '',
        price: 0
      });
    } catch (error) {
      console.error('Хатогӣ дар қабули фармоиш:', error);
      toast.error('Хатогӣ дар қабули фармоиш', {
        icon: '❌',
        style: {
          borderRadius: '12px',
          background: '#f87171',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Сарлавҳа бо ороишҳо */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <Truck className="w-12 h-12 mx-auto text-white mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Қабули фармоиш</h1>
            <p className="text-blue-100">Формро пур кунед барои расонидани зуд</p>
          </div>
        </div>

        {/* Қисми форм */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Номи муштарӣ */}
          <div className="space-y-1">
            <label htmlFor="clientName" className="flex items-center text-sm font-medium text-gray-700">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Номи муштарӣ
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Али Валиев"
              required
            />
          </div>

          {/* Рақами телефон */}
          <div className="space-y-1">
            <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4 mr-2 text-blue-600" />
              Рақами телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="+992 98 765 4321"
              required
            />
          </div>

          {/* Суроға */}
          <div className="space-y-1">
            <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Суроғаи расондан
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="кӯчаи Рудакӣ 45"
              required
            />
          </div>

          {/* Тавсифи фармоиш */}
          <div className="space-y-1">
            <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4 mr-2 text-blue-600" />
              Тавсифи фармоиш
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Масалан: 2 питса, 1 кока-кола"
              rows={3}
            />
          </div>

          {/* Маблағ */}
          <div className="space-y-1">
            <label htmlFor="price" className="flex items-center text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
              Маблағи фармоиш
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="150"
              required
              min="0"
            />
          </div>

          {/* Тугмаи ирсол */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Дар ҳоли кор...
              </>
            ) : (
              'Таъйид кардани фармоиш'
            )}
          </button>
        </form>

        {/* Қисми поёнӣ */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-500">
            Курьери мо бо шумо дар давоми 15 дақиқа пас аз қабули фармоиш тамос мегирад
          </p>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;