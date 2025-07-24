import { useEffect, useState } from 'react'
import { usePlacesStore } from '../store/placesStore'
import { useSchedulesStore } from '../store/schedulesStore'
import { useEventStore } from '../store/eventStore'
import AddSafePlaceWithLocation from './AddSafePlaceWithLocation'
import ScheduleForm from './ScheduleForm'

function AdminDashboard() {
  const {
    places,
    fetchPlaces,
    postPlace,
    putPlace,
    deletePlace,
    loading: placesLoading
  } = usePlacesStore()
  const [addSchedule, setAddSchedule] = useState(false)
  const [editSchedule, setEditSchedule] = useState(null)
  const {
    schedules,
    fetchSchedules,
    postSchedule,
    updateSchedule,
    deleteSchedule
  } = useSchedulesStore()
  const { events, fetchEvents } = useEventStore()
  const [selectedTab, setSelectedTab] = useState('places')
  const [editPlace, setEditPlace] = useState(null)
  const [addPlace, setAddPlace] = useState(false)

  useEffect(() => {
    fetchPlaces()
    fetchSchedules()
    fetchEvents()
  }, [fetchPlaces, fetchSchedules, fetchEvents])

  // Handler para guardar edición
  const handleSavePlace = async (formData) => {
    if (editPlace) {
      await putPlace(editPlace.id, formData)
      setEditPlace(null)
    } else {
      await postPlace(formData)
      setAddPlace(false)
    }
  }

  // Handler para eliminar
  const handleDeletePlace = async (place) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${place.name}"?`)) {
      await deletePlace(place.id)
    }
  }

  const handleSaveSchedule = async (data) => {
    if (editSchedule) {
      await updateSchedule(editSchedule.id, data)
      setEditSchedule(null)
    } else {
      await postSchedule(data)
      setAddSchedule(false)
    }
  }
  return (
    <div className='max-w-5xl mx-auto p-6 bg-blackc rounded-xl shadow text-white'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold mb-6'>Panel de Administración</h1>
        <a
          href='/'
          className='text-whitecc flex items-center gap-x-1 border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
        >
          <span>Pagina principal</span>
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
            <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6' />
            <path d='M11 13l9 -9' />
            <path d='M15 4h5v5' />
          </svg>
        </a>
      </div>

      <div className='flex gap-4 mb-6'>
        <button
          className={`px-4 py-2 rounded-lg flex gap-2 items-center cursor-pointer hover:bg-whitec/20 text-whitec ${
            selectedTab === 'places' ? 'bg-whitec/20' : 'bg-blackcc/40'
          }`}
          onClick={() => setSelectedTab('places')}
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
            class='icon icon-tabler icons-tabler-outline icon-tabler-map-pin-2'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7' />
            <path d='M9 4v13' />
            <path d='M15 7v5' />
            <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
            <path d='M19 18v.01' />
          </svg>
          <span>Lugares</span>
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex gap-2 items-center cursor-pointer hover:bg-whitec/20 text-whitec ${
            selectedTab === 'schedules' ? 'bg-whitec/20' : 'bg-blackcc/40'
          }`}
          onClick={() => setSelectedTab('schedules')}
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
            class='icon icon-tabler icons-tabler-outline icon-tabler-calendar-week'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z' />
            <path d='M16 3v4' />
            <path d='M8 3v4' />
            <path d='M4 11h16' />
            <path d='M7 14h.013' />
            <path d='M10.01 14h.005' />
            <path d='M13.01 14h.005' />
            <path d='M16.015 14h.005' />
            <path d='M13.015 17h.005' />
            <path d='M7.01 17h.005' />
            <path d='M10.01 17h.005' />
          </svg>
          <span>Horarios</span>
        </button>
      </div>

      {selectedTab === 'places' && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Lugares</h2>
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
          </div>
          <ul className='divide-y divide-whitec/10'>
            {places.map((place) => (
              <li
                key={place.id}
                className='py-3 flex justify-between items-center'
              >
                <span>
                  <strong>{place.name}</strong> - {place.description}
                </span>
                <div className='flex items-center gap-x-2'>
                  <button
                    className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
                    onClick={() => setEditPlace(place)}
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
                      class='icon icon-tabler icons-tabler-outline icon-tabler-map-cog'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v8' />
                      <path d='M9 4v13' />
                      <path d='M15 7v6.5' />
                      <path d='M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                      <path d='M19.001 15.5v1.5' />
                      <path d='M19.001 21v1.5' />
                      <path d='M22.032 17.25l-1.299 .75' />
                      <path d='M17.27 20l-1.3 .75' />
                      <path d='M15.97 17.25l1.3 .75' />
                      <path d='M20.733 20l1.3 .75' />
                    </svg>
                  </button>
                  <button
                    className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-red-600/10 hover:text-white'
                    onClick={() => handleDeletePlace(place)}
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
                      class='icon icon-tabler icons-tabler-outline icon-tabler-map-x'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M14 19.5l-5 -2.5l-6 3v-13l6 -3l6 3l6 -3v9' />
                      <path d='M9 4v13' />
                      <path d='M15 7v6.5' />
                      <path d='M22 22l-5 -5' />
                      <path d='M17 22l5 -5' />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {(addPlace || editPlace) && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
              <AddSafePlaceWithLocation
                setAddPlace={() => {
                  setAddPlace(false)
                  setEditPlace(null)
                }}
                initialData={
                  editPlace
                    ? {
                        name: editPlace.name,
                        description: editPlace.description,
                        latitude: editPlace.latitude,
                        longitude: editPlace.longitude
                      }
                    : undefined
                }
                onSave={handleSavePlace}
              />
            </div>
          )}
          {/* Aquí puedes agregar un modal para editar el lugar */}
        </div>
      )}

      {selectedTab === 'schedules' && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Horarios</h2>
            <button
              className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
              onClick={() => setAddSchedule(true)}
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
                class='icon icon-tabler icons-tabler-outline icon-tabler-calendar-plus'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5' />
                <path d='M16 3v4' />
                <path d='M8 3v4' />
                <path d='M4 11h16' />
                <path d='M16 19h6' />
                <path d='M19 16v6' />
              </svg>
            </button>
          </div>
          <ul className='divide-y divide-whitec/10'>
            {schedules.map((sch) => (
              <li
                key={sch.id}
                className='py-3 flex justify-between items-center'
              >
                <span>
                  <strong>Lugar:</strong> {sch.placeId} | <strong>Día:</strong>{' '}
                  {sch.dayOfWeek} | <strong>De:</strong> {sch.startTime}{' '}
                  <strong>a</strong> {sch.endTime}
                </span>
                <div className='flex items-center gap-x-2'>
                  <button
                    className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-whitec/10 hover:text-white'
                    onClick={() => setEditSchedule(sch)}
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
                      class='icon icon-tabler icons-tabler-outline icon-tabler-calendar-cog'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5' />
                      <path d='M16 3v4' />
                      <path d='M8 3v4' />
                      <path d='M4 11h16' />
                      <path d='M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                      <path d='M19.001 15.5v1.5' />
                      <path d='M19.001 21v1.5' />
                      <path d='M22.032 17.25l-1.299 .75' />
                      <path d='M17.27 20l-1.3 .75' />
                      <path d='M15.97 17.25l1.3 .75' />
                      <path d='M20.733 20l1.3 .75' />
                    </svg>
                  </button>
                  <button
                    className='text-whitecc border cursor-pointer border-whitec/20 rounded-lg p-2 hover:bg-red-600/10 hover:text-white'
                    onClick={() => deleteSchedule(sch.id)}
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
                      class='icon icon-tabler icons-tabler-outline icon-tabler-calendar-cancel'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5' />
                      <path d='M16 3v4' />
                      <path d='M8 3v4' />
                      <path d='M4 11h16' />
                      <path d='M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
                      <path d='M17 21l4 -4' />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {(addSchedule || editSchedule) && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
              <ScheduleForm
                initialData={editSchedule}
                onSave={handleSaveSchedule}
                onClose={() => {
                  setAddSchedule(false)
                  setEditSchedule(null)
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
