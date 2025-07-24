import { useEffect, useState } from 'react'
import { usePlacesStore } from '../store/placesStore'
import LocationPickerMap from './LocationPickerMap'

function AddSafePlaceWithLocation({ uid, setAddPlace, initialData, onSave }) {
  const postPlace = usePlacesStore((state) => state.postPlace)
  const fetchPlaces = usePlacesStore((state) => state.fetchPlaces)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  })
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        latitude: initialData.latitude || '',
        longitude: initialData.longitude || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGetLocation = () => {
    setLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }))
          setLocating(false)
        },
        () => {
          setLocating(false)
        }
      )
    } else {
      setLocating(false)
    }
  }

  const handleSetLatLng = ({ latitude, longitude }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.latitude || !formData.longitude) {
      toast.error(
        'Debes obtener la ubicación primero o seleccionarla en el mapa'
      )
      return
    }
    const completeData = {
      name: formData.name,
      description: formData.description,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude)
    }
    if (onSave) {
      await onSave(completeData)
    } else {
      await postPlace(completeData)
      fetchPlaces()
    }

    fetchPlaces()
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: ''
    })
    setAddPlace(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col bg-blackc gap-6 min-w-xl mx-auto p-6 rounded-xl shadow'
    >
      <header className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-bold'>
          {initialData ? 'Editar lugar seguro' : 'Agregar lugar seguro'}
        </h2>
        <button
          type='button'
          onClick={() => setAddPlace(false)}
          className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </button>
      </header>
      <label className='text-sm flex flex-col '>
        Nombre del lugar
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <label className='text-sm flex flex-col '>
        Descripción
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <button
        type='button'
        onClick={handleGetLocation}
        disabled={locating}
        className='hover:text-black cursor-pointer bg-whitecc px-4 py-2 rounded-full text-blackc transition-colors font-semibold duration-300 w-fit flex items-center gap-x-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
          <path d='M6 21v-2a4 4 0 0 1 4 -4h2.5' />
          <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
          <path d='M19 18v.01' />
        </svg>
        <span>{locating ? 'Obteniendo ubicación...' : 'Ubicación actual'}</span>
      </button>
      <div>
        <span className='text-white text-sm mb-2 block'>
          O selecciona en el mapa:
        </span>
        <LocationPickerMap
          latitude={formData.latitude}
          longitude={formData.longitude}
          setLatLng={handleSetLatLng}
        />
      </div>
      {formData.latitude && formData.longitude && (
        <div className='text-whitec text-sm'>
          Ubicación seleccionada: Lat {formData.latitude}, Lng{' '}
          {formData.longitude}
        </div>
      )}
      <button
        type='submit'
        className='hover:text-black cursor-pointer font-semibold bg-whitecc px-4 py-2 rounded-full text-blackc transition-colors  duration-300'
      >
        {initialData ? 'Guardar cambios' : 'Agregar lugar seguro'}
      </button>
    </form>
  )
}

export default AddSafePlaceWithLocation
