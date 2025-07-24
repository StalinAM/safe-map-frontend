import { useEffect, useState } from 'react'
import { usePlacesStore } from '../store/placesStore'
import Place from './Place'
import AddSafePlaceWithLocation from './AddSafePlaceWithLocation'
import { useAuthStore } from '../store/authStore'
import { useSchedulesStore } from '../store/schedulesStore'

function PlacesList({ selectedPlaceId, onSelectPlace }) {
  const places = usePlacesStore((state) => state.places)
  const [addPlace, setAddPlace] = useState(false)
  const loading = usePlacesStore((state) => state.loading)
  const error = usePlacesStore((state) => state.error)
  const token = useAuthStore((state) => state.token)
  const fetchPlaceSafe = usePlacesStore((state) => state.fetchPlaceSafe)
  const fetchPlaces = usePlacesStore((state) => state.fetchPlaces)
  const [showSafe, setShowSafe] = useState(false)
  const [filterDay, setFilterDay] = useState('')
  const [filterHour, setFilterHour] = useState('')
  const schedules = useSchedulesStore((state) => state.schedules)
  const fetchSchedules = useSchedulesStore((state) => state.fetchSchedules)
  const role = useAuthStore((state) => state.role)

  useEffect(() => {
    fetchSchedules()
  }, [fetchSchedules])

  useEffect(() => {
    if (!showSafe) fetchPlaces()
  }, [showSafe, fetchPlaces])
  const handleShowSafe = () => {
    setShowSafe(true)
    fetchPlaceSafe()
  }

  const handleShowAll = () => {
    setShowSafe(false)
    fetchPlaces()
  }

  const filteredPlaces =
    filterDay && filterHour
      ? places.filter((place) => {
          // Busca el horario del lugar para el día seleccionado
          const schedule = schedules.find(
            (s) => s.placeId === place.id && s.dayOfWeek === filterDay
          )
          if (!schedule) return false
          // Convierte la hora seleccionada y los horarios a minutos
          const [h, m] = filterHour.split(':')
          const filterMinutes = parseInt(h) * 60 + parseInt(m)
          const [sh, sm] = schedule.startTime.split(':')
          const [eh, em] = schedule.endTime.split(':')
          const startMinutes = parseInt(sh) * 60 + parseInt(sm)
          const endMinutes = parseInt(eh) * 60 + parseInt(em)
          return filterMinutes >= startMinutes && filterMinutes <= endMinutes
        })
      : places

  return (
    <>
      <aside className='w-full rounded-lg border border-whitec/30 text-white p-4 overflow-y-auto h-full'>
        <header className='flex flex-col gap-4 mb-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>Lugares registrados</h2>
            {token && (
              <button
                className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
                onClick={() => setAddPlace(!addPlace)}
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
                  <path d='M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
                  <path d='M12.794 21.322a2 2 0 0 1 -2.207 -.422l-4.244 -4.243a8 8 0 1 1 13.59 -4.616' />
                  <path d='M16 19h6' />
                  <path d='M19 16v6' />
                </svg>
              </button>
            )}
            {role === 'ADMIN' && (
              <a
                href='/admin'
                className='text-whitecc flex items-center gap-x-1 border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
              >
                <span>Admin</span>
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
                  class='icon icon-tabler icons-tabler-outline icon-tabler-external-link'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6' />
                  <path d='M11 13l9 -9' />
                  <path d='M15 4h5v5' />
                </svg>
              </a>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3 items-center p-2 rounded-xl shadow-sm'>
              <label className='flex flex-col text-sm font-semibold text-whitec'>
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className='sborder border-whitec/30 bg-blackcc text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azur-600 transition'
                >
                  <option value=''>Todos los dias</option>
                  <option value='MONDAY'>Lunes</option>
                  <option value='TUESDAY'>Martes</option>
                  <option value='WEDNESDAY'>Miércoles</option>
                  <option value='THURSDAY'>Jueves</option>
                  <option value='FRIDAY'>Viernes</option>
                  <option value='SATURDAY'>Sábado</option>
                  <option value='SUNDAY'>Domingo</option>
                </select>
              </label>
              <label className='flex flex-col text-sm font-semibold text-whitec'>
                <input
                  type='time'
                  value={filterHour}
                  onChange={(e) => setFilterHour(e.target.value)}
                  className='border border-whitec/30 bg-blackcc text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azur-600 transition'
                  title='Filtrar por hora'
                />
              </label>
            </div>
            {!showSafe ? (
              <button
                className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 text-sm hover:bg-whitec/10 hover:text-white'
                onClick={handleShowSafe}
              >
                Lugares Seguros
              </button>
            ) : (
              <button
                className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
                onClick={handleShowAll}
              >
                Ver todos
              </button>
            )}
          </div>
        </header>
        {loading && <div>Cargando lugares...</div>}
        {error && <div className='text-red-400'>Error: {error}</div>}
        {places.length === 0 && !loading && (
          <div>No hay lugares registrados.</div>
        )}
        <ul className='list-none px-4 m-0'>
          {filteredPlaces.map((place) => (
            <div key={place.id} onClick={() => onSelectPlace(place.id)}>
              <Place
                key={place.id}
                place={place}
                selected={selectedPlaceId === place.id}
              />
            </div>
          ))}
        </ul>
      </aside>
      {addPlace && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
          <AddSafePlaceWithLocation
            uid={usePlacesStore.getState().uid}
            setAddPlace={setAddPlace}
          />
        </div>
      )}
    </>
  )
}

export default PlacesList
