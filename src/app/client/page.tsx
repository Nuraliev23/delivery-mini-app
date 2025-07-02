"use client"
import { useOrdersStore } from '@/store/orders'
import { useEffect } from 'react'
import { Clock, CheckCircle2, XCircle, ChevronRight, Loader2, Bike, ShoppingBasket } from 'lucide-react'

export default function ClientPage() {
  const { orders, fetchOrders, loading } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [])

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'в обработке':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'доставляется':
        return <Bike className="w-4 h-4 text-blue-500" />
      case 'выполнен':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'отменен':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <ShoppingBasket className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'в обработке':
        return 'bg-yellow-50 text-yellow-600'
      case 'доставляется':
        return 'bg-blue-50 text-blue-600'
      case 'выполнен':
        return 'bg-green-50 text-green-600'
      case 'отменен':
        return 'bg-red-50 text-red-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
        <p className="text-gray-500 text-sm">История ваших заказов</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-4" />
          <p className="text-gray-500">Загружаем ваши заказы...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <ShoppingBasket className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Заказов пока нет</h3>
          <p className="text-gray-500 text-center max-w-xs">Здесь будут отображаться ваши текущие и завершенные заказы</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Заказ #{order.id}</h3>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Адрес:</span> {order.address}
                </p>
                {order.description && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    <span className="font-medium">Описание:</span> {order.description}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.price} c</p>
                </div>
                <button className="text-red-500 text-sm font-medium flex items-center">
                  Подробнее <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}