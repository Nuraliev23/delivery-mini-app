"use client"
import { useOrdersStore } from '@/store/orders'
import { useEffect, useState } from 'react'
import { 
  Clock, 
  Bike, 
  CheckCircle2, 
  XCircle, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Loader2,
  Search,
  ChevronDown
} from 'lucide-react'

export default function AdminPage() {
  const { orders, fetchOrders, updateStatus, loading, error } = useOrdersStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('все')

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    
    const matchesStatus = 
      statusFilter === 'все' || 
      order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'все', label: 'Все статусы' },
    { value: 'ожидает', label: 'Ожидает' },
    { value: 'в пути', label: 'В пути' },
    { value: 'доставлено', label: 'Доставлено' },
    { value: 'отменен', label: 'Отменен' }
  ]

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'ожидает': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'в пути': return <Bike className="w-4 h-4 text-blue-500" />
      case 'доставлено': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'отменен': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ожидает': return 'bg-yellow-50 text-yellow-600'
      case 'в пути': return 'bg-blue-50 text-blue-600'
      case 'доставлено': return 'bg-green-50 text-green-600'
      case 'отменен': return 'bg-red-50 text-red-600'
      default: return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Панель администратора</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по клиентам, адресам, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="relative w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Найдено заказов: {filteredOrders.length}
          </p>
          <p className="text-sm text-gray-600">
            Общая сумма: {filteredOrders.reduce((sum, order) => sum + order.price, 0)} c
          </p>
        </div>
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
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <Package className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Заказы не найдены</h3>
          <p className="text-gray-500 text-center max-w-xs">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Адрес</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {order.clientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {order.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-1">{order.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.price} c
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as any)}
                      className="block w-full pl-3 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      {statusOptions.filter(opt => opt.value !== 'все').map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}