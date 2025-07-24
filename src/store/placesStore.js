import { create } from 'zustand'

export const usePlacesStore = create((set) => ({
  places: [],
  loading: false,
  error: null,
  fetchPlaces: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('http://localhost:8082/places')
      if (!response.ok) throw new Error('Error al obtener los lugares')
      const data = await response.json()

      set({ places: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  setPlaces: (placesArray) => set({ places: placesArray }),
  addPlace: (place) => set((state) => ({ places: [...state.places, place] })),
  postPlace: async (place) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8082/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(place)
      })
      if (!response.ok) throw new Error('Error al agregar el lugar')
      const newPlace = await response.json()
      set((state) => ({
        places: [...state.places, newPlace],
        loading: false
      }))
      return newPlace
    } catch (error) {
      set({ error: error.message, loading: false })
      return null
    }
  },
  putPlace: async (id, place) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8082/places/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(place)
      })
      if (!response.ok) throw new Error('Error al actualizar el lugar')
      const updatedPlace = await response.json()
      set((state) => ({
        places: state.places.map((p) => (p.id === id ? updatedPlace : p)),
        loading: false
      }))
      return updatedPlace
    } catch (error) {
      set({ error: error.message, loading: false })
      return null
    }
  },
  fetchPlaceSafe: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('http://localhost:8082/places/safe')
      if (!response.ok) throw new Error('Error al obtener los lugares')
      const data = await response.json()

      set({ places: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  deletePlace: async (id) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8082/places/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      })
      if (!response.ok) throw new Error('Error al eliminar el lugar')
      set((state) => ({
        places: state.places.filter((place) => place.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  clearPlaces: () => set({ places: [] })
}))
