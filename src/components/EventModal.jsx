import { useState } from 'react'
import AddNewEvent from './AddNewEvent'

function EventModal({
  events,
  setShowEvents,
  placeId,
  eventTypeFilter,
  setEventTypeFilter
}) {
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('token')
  const filteredEvents = events.filter((event) => event.placeId === placeId)
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div className='bg-blackcc rounded-lg p-6 max-w-md w-full shadow-lg relative'>
        <button
          className='absolute cursor-pointer top-4 right-3 text-white text-xl'
          onClick={() => setShowEvents(false)}
          aria-label='Cerrar'
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
        <header className='flex flex-col'>
          <h3 className='text-lg font-bold text-white'>Eventos recientes</h3>
          <div className='flex justify-between items-center mt-2 mb-4'>
            <div>
              <label className='text-xs text-whitec/80 mr-2'>
                Tipo de evento:
              </label>
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className='bg-blackcc text-white text-sm px-2 py-1 rounded border border-whitec/20'
              >
                <option value='ALL'>Todos</option>
                <option value='POSITIVE'>Positivos</option>
                <option value='NEGATIVE'>Negativos</option>
                <option value='NEUTRAL'>Neutrales</option>
              </select>
            </div>
            {token && (
              <button
                onClick={() => setShowForm(true)}
                className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
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
                  <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
                  <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
                  <path d='M10 14h4' />
                  <path d='M12 12v4' />
                </svg>
              </button>
            )}
          </div>
        </header>
        {showForm && (
          <AddNewEvent setShowForm={setShowForm} placeId={placeId} />
        )}
        <ul className='space-y-3'>
          {filteredEvents.map((event, idx) => (
            <li
              key={idx}
              className='border-b border-whitec/10 pb-2 text-yellow-300'
            >
              {event.date ? <span>[{event.date}] </span> : null}
              {event.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default EventModal
