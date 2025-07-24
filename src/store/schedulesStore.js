import { create } from 'zustand'

export const useSchedulesStore = create((set) => ({
  schedules: [],
  loading: false,
  error: null,
  fetchSchedules: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('http://localhost:8083/schedules')
      if (!response.ok) throw new Error('Error al obtener los horarios')
      const data = await response.json()
      console.log(data)

      set({ schedules: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  postSchedule: async (schedule) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8083/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(schedule)
      })
      if (!response.ok) throw new Error('Error al agregar el horario')
      const newSchedule = await response.json()
      set((state) => ({
        schedules: [...state.schedules, newSchedule],
        loading: false
      }))
      return newSchedule
    } catch (error) {
      set({ error: error.message, loading: false })
      return null
    }
  },
  deleteSchedule: async (id) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8083/schedules/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      })
      if (!response.ok) throw new Error('Error al eliminar el horario')
      set((state) => ({
        schedules: state.schedules.filter((s) => s.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  updateSchedule: async (id, schedule) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8083/schedules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(schedule)
      })
      if (!response.ok) throw new Error('Error al actualizar el horario')
      const updatedSchedule = await response.json()
      set((state) => ({
        schedules: state.schedules.map((s) =>
          s.id === id ? updatedSchedule : s
        ),
        loading: false
      }))
      return updatedSchedule
    } catch (error) {
      set({ error: error.message, loading: false })
      return null
    }
  },
  clearSchedules: () => set({ schedules: [] })
}))
