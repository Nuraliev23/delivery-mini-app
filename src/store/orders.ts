import { create } from 'zustand'
import axios from 'axios'

const API = 'https://af7bea425ac1682f.mokky.dev'

export type OrderStatus = 'ожидает' | 'в пути' | 'доставлено' | 'отменен'

export type Order = {
  id: number
  clientName: string
  phone: string
  address: string
  description: string
  price: number
  status: OrderStatus
  createdAt: string
  itemsCount?: number
}

interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  fetchOrders: () => Promise<void>
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<void>
  updateStatus: (id: number, status: OrderStatus) => Promise<void>
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get<Order[]>(`${API}/orders`)
      const ordersWithDetails = data.map(order => ({
        ...order,
        itemsCount: Math.floor(Math.random() * 5) + 1, // Генерация случайного количества товаров
        status: order.status || 'ожидает' // Дефолтный статус
      }))
      set({ orders: ordersWithDetails })
    } catch (error) {
      set({ error: 'Не удалось загрузить заказы' })
    } finally {
      set({ loading: false })
    }
  },

  createOrder: async (order) => {
    set({ loading: true })
    try {
      await axios.post(`${API}/orders`, {
        ...order,
        status: 'ожидает' as OrderStatus,
        createdAt: new Date().toISOString(),
      })
      await useOrdersStore.getState().fetchOrders()
    } catch (error) {
      set({ error: 'Не удалось создать заказ' })
    } finally {
      set({ loading: false })
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true })
    try {
      await axios.patch(`${API}/orders/${id}`, { status })
      await useOrdersStore.getState().fetchOrders()
    } catch (error) {
      set({ error: 'Не удалось обновить статус' })
    } finally {
      set({ loading: false })
    }
  },
}))