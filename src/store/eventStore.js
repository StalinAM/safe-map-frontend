// eventStore.js
import { create } from 'zustand'

const API_URL = 'http://localhost:8080/events'

export const useEventStore = create((set, get) => ({
  events: [],
  event: null,
  loading: false,
  error: null,

  // Obtener todos los eventos
  fetchEvents: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      set({ events: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  // Obtener evento por ID
  fetchEventById: async (id) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${API_URL}/${id}`)
      const data = await res.json()
      set({ event: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  // Crear evento (requiere JWT)
  createEvent: async (event) => {
    set({ loading: true, error: null })
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)
      })
      const data = await res.json()
      set({ event: data, loading: false })
      get().fetchEvents()
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  // Listar eventos por lugar
  fetchEventsByPlace: async (placeId) => {
    console.log(placeId)

    set({ loading: true, error: null })
    try {
      const res = await fetch(`${API_URL}/place/${placeId}`)
      const data = await res.json()
      set({ events: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  // Buscar eventos por rango de fechas
  fetchEventsByDateRange: async (start, end) => {
    set({ loading: true, error: null })
    try {
      const params = new URLSearchParams({
        start,
        end
      })
      const res = await fetch(`${API_URL}/between?${params.toString()}`)
      const data = await res.json()
      set({ events: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  // Eliminar evento (requiere JWT y rol ADMIN)
  deleteEvent: async (id) => {
    set({ loading: true, error: null })
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      get().fetchEvents()
      set({ loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  }
}))
