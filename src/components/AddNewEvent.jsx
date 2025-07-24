import { useState } from 'react'
import { useEventStore } from '../store/eventStore'

function AddNewEvent({ setShowForm, placeId }) {
  const createEvent = useEventStore((state) => state.createEvent)
  const [form, setForm] = useState({
    dateTime: '',
    title: '',
    type: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.dateTime || !form.title || !form.description) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }
    const eventData = {
      ...form,
      placeId: placeId
    }
    await createEvent(eventData)
    setShowForm(false)
    setForm({
      dateTime: '',
      title: '',
      type: '',
      description: ''
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col bg-blackc gap-4 p-4 rounded-xl shadow'
    >
      <label className='text-sm flex flex-col '>
        Fecha y hora *
        <input
          type='datetime-local'
          name='dateTime'
          value={form.dateTime}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <label className='text-sm flex flex-col '>
        Título *
        <input
          type='text'
          name='title'
          value={form.title}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <label className='text-sm flex flex-col '>
        Tipo (opcional)
        <select
          name='type'
          value={form.type}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
        >
          <option value=''>Selecciona tipo</option>
          <option value='POSITIVE'>Positivo</option>
          <option value='NEGATIVE'>Negativo</option>
          <option value='NEUTRAL'>Neutral</option>
        </select>
      </label>
      <label className='text-sm flex flex-col '>
        Descripción *
        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          className='pl-4 bg-blackcc text-white rounded-full py-2'
          required
        />
      </label>
      <button
        type='submit'
        className='hover:text-black cursor-pointer font-semibold bg-whitecc px-4 py-2 rounded-full text-blackc transition-colors  duration-300'
      >
        Guardar evento
      </button>
      <button
        type='button'
        onClick={() => setShowForm(false)}
        className='text-red-500 mt-2'
      >
        Cancelar
      </button>
    </form>
  )
}

export default AddNewEvent
