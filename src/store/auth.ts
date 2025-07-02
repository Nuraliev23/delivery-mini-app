// store/auth.ts
import { create } from 'zustand'
import axios from 'axios'
import Cookies from 'js-cookie'

const API = 'https://af7bea425ac1682f.mokky.dev'

export type User = {
  id: number
  name: string
  password: string
  role: 'client' | 'courier' | 'admin'
}

interface AuthState {
  user: User | null
  login: (name: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (name, password) => {
    const { data } = await axios.get<User[]>(`${API}/users?name=${name}&password=${password}`)
    if (data.length > 0) {
      const user = data[0]
      Cookies.set('order_token', JSON.stringify(user))
      set({ user })
    } else {
      throw new Error('Invalid credentials')
    }
  },

  logout: () => {
    Cookies.remove('order_token')
    set({ user: null })
  },
}))
