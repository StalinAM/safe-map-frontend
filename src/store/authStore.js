import { create } from 'zustand/vanilla'

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  username: localStorage.getItem('username') || null,
  userId: localStorage.getItem('userId') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: ({ token, role, username, userId }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
    set({
      token,
      role,
      username,
      userId,
      isAuthenticated: true
    })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    set({
      token: null,
      role: null,
      username: null,
      userId: null,
      isAuthenticated: false
    })
  }
}))
