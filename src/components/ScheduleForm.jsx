import { useState, useEffect } from 'react'
import { usePlacesStore } from '../store/placesStore'

function ScheduleForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState({
    placeId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  })
  const places = usePlacesStore((state) => state.places)
  const fetchPlaces = usePlacesStore((state) => state.fetchPlaces)

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])
  useEffect(() => {
    if (initialData) {
      setForm({
        placeId: initialData.placeId || '',
        dayOfWeek: initialData.dayOfWeek || '',
        startTime: initialData.startTime?.slice(0, 5) || '',
        endTime: initialData.endTime?.slice(0, 5) || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.placeId || !form.dayOfWeek || !form.startTime || !form.endTime) {
      alert('Completa todos los campos')
      return
    }
    onSave(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-blackc p-6 rounded-xl shadow max-w-md mx-auto'
    >
      <h2 className='text-lg font-bold mb-2'>
        {initialData ? 'Editar horario' : 'Agregar horario'}
      </h2>
      <label className='text-sm flex flex-col'>
        Lugar
        <select
          name='placeId'
          value={form.placeId}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        >
          <option value=''>Selecciona un lugar</option>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <label className='text-sm flex flex-col'>
        Día
        <select
          name='dayOfWeek'
          value={form.dayOfWeek}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        >
          <option value=''>Selecciona día</option>
          <option value='MONDAY'>Lunes</option>
          <option value='TUESDAY'>Martes</option>
          <option value='WEDNESDAY'>Miércoles</option>
          <option value='THURSDAY'>Jueves</option>
          <option value='FRIDAY'>Viernes</option>
          <option value='SATURDAY'>Sábado</option>
          <option value='SUNDAY'>Domingo</option>
        </select>
      </label>
      <label className='text-sm flex flex-col'>
        Hora inicio
        <input
          type='time'
          name='startTime'
          value={form.startTime}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <label className='text-sm flex flex-col'>
        Hora fin
        <input
          type='time'
          name='endTime'
          value={form.endTime}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <div className='flex gap-2 mt-2'>
        <button
          type='submit'
          className='bg-blue-600 text-white rounded px-4 py-2'
        >
          {initialData ? 'Guardar cambios' : 'Agregar horario'}
        </button>
        <button
          type='button'
          onClick={onClose}
          className='bg-red-600 text-white rounded px-4 py-2'
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ScheduleForm
