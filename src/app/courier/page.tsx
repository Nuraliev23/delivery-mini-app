"use client"
import { useOrdersStore } from '@/store/orders'
import { useEffect } from 'react'
import { Bike, Clock, CheckCircle2, MapPin, Package, Loader2 } from 'lucide-react'

export default function CourierPage() {
  const { orders, fetchOrders, updateStatus, loading, error } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const availableOrders = orders.filter(o => o.status !== 'доставлено')

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'ожидает':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'в пути':
        return <Bike className="w-4 h-4 text-blue-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'ожидает':
        return 'bg-yellow-50 text-yellow-600'
      case 'в пути':
        return 'bg-blue-50 text-blue-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Bike className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Доступные заказы</h1>
        </div>
        <p className="text-gray-500 text-sm">
          {availableOrders.length} активных заказа(ов)
        </p>
      </header>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-4">
          {error}
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-4" />
          <p className="text-gray-500">Загружаем список заказов...</p>
        </div>
      ) : availableOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <CheckCircle2 className="w-12 h-12 text-green-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Нет доступных заказов</h3>
          <p className="text-gray-500 text-center max-w-xs">
            Все заказы доставлены или в процессе обработки
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {availableOrders.map(order => (
            <li key={order.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Заказ #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Адрес:</span> {order.address}
                  </p>
                </div>
                {order.description && (
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <span className="font-medium">Описание:</span> {order.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.price} c</p>
                  <p className="text-xs text-gray-500">{order.itemsCount || 1} товар(а)</p>
                </div>
                <button
                  onClick={() => updateStatus(
                    order.id, 
                    order.status === 'ожидает' ? 'в пути' : 'доставлено'
                  )}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    order.status === 'ожидает' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } transition-colors`}
                >
                  {order.status === 'ожидает' ? 'Принять заказ' : 'Завершить доставку'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}