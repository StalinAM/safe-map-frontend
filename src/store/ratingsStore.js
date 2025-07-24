import { create } from 'zustand'

export const useRatingsStore = create((set) => ({
  ratings: [],
  loading: false,
  error: null,
  fetchRatings: async (placeId) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`http://localhost:8082/places/${placeId}/ratings`)
      if (!res.ok) throw new Error('Error al obtener calificaciones')
      const data = await res.json()
      set({ ratings: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  postRating: async (placeId, score, comment) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `http://localhost:8082/places/${placeId}/ratings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({ score, comment })
        }
      )
      if (!res.ok) throw new Error('Error al enviar la calificación')
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      return false
    }
  },
  clearRatings: () => set({ ratings: [] })
}))
