import { useState } from 'react'
import RatingModal from './RatingModal'
import { useRatingsStore } from '../store/ratingsStore'
import { useEventStore } from '../store/eventStore'
import EventModal from './EventModal'

function Place({ place, selected }) {
  const [showRatings, setShowRatings] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [eventTypeFilter, setEventTypeFilter] = useState('ALL')
  const fetchRatings = useRatingsStore((state) => state.fetchRatings)
  const ratings = useRatingsStore((state) => state.ratings)
  const loading = useRatingsStore((state) => state.loading)
  const error = useRatingsStore((state) => state.error)
  const events = useEventStore((state) => state.events)
  const fetchEventsByPlace = useEventStore((state) => state.fetchEventsByPlace)

  const handleShowRatings = async () => {
    await fetchRatings(place.id)
    setShowRatings(true)
  }
  const handleShowEvents = async () => {
    await fetchEventsByPlace(place.id)
    setShowEvents(true)
  }
  const filteredEvents =
    eventTypeFilter === 'ALL'
      ? events
      : events.filter((ev) => ev.type === eventTypeFilter)
  return (
    <>
      <li
        className={`mb-6 border p-4 rounded-lg border-whitec/10 pb-4 transition-colors ${
          selected ? 'bg-whitec/10 ring-2 ring-whitec' : ''
        }`}
      >
        <div className='font-bold text-lg flex justify-between items-center'>
          <span>{place.name}</span>
          <div className='my-2 text-white flex items-center gap-2'>
            <span>
              {place.averageRating
                ? place.averageRating.toFixed(2)
                : 'Sin calificación'}
            </span>
            <div className='flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='text-yellow-400 size-4'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='text-sm my-1'>{place.description}</div>
        <div className='text-xs text-whitec/70'>
          Lat: {place.latitude} | Lng: {place.longitude}
        </div>

        <div className='flex gap-2 mt-5'>
          <button
            className='px-3 cursor-pointer py-1 bg-whitec/10 hover:bg-whitec/20 rounded-lg text-sm text-white border border-whitec/20'
            onClick={handleShowRatings}
          >
            Ver calificaciones
          </button>
          <button
            className='cursor-pointer px-3 py-1 bg-whitec/10 hover:bg-whitec/20 rounded-lg text-sm text-white border border-whitec/20'
            onClick={handleShowEvents}
          >
            Ver eventos
          </button>
        </div>
      </li>
      {showRatings && (
        <RatingModal
          setShowRatings={setShowRatings}
          ratings={ratings}
          loading={loading}
          error={error}
        />
      )}
      {showEvents && (
        <EventModal
          events={filteredEvents}
          setShowEvents={setShowEvents}
          placeId={place.id}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
        />
      )}
    </>
  )
}

export default Place
