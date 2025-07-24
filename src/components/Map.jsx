import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import { usePlacesStore } from '../store/placesStore'
import RatingForm from './RatingForm'
import MapCenterOnPlace from './MapCenterOnPlace'
import { useAuthStore } from '../store/authStore'
import { useRatingsStore } from '../store/ratingsStore'
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Componente auxiliar para centrar el mapa

function Map({ selectedPlaceId, onSelectedPlace }) {
  const token = useAuthStore((state) => state.token)
  const [origin, setOrigin] = useState(null) // Ubicación actual
  // Zustand store
  const places = usePlacesStore((state) => state.places)

  const fetchPlaces = usePlacesStore((state) => state.fetchPlaces)
  const loading = usePlacesStore((state) => state.loading)
  const error = usePlacesStore((state) => state.error)
  const markerRefs = useRef({})
  const userId = useAuthStore((state) => state.userId)

  const fetchRatings = useRatingsStore((state) => state.fetchRatings)
  const [ratedPlaces, setRatedPlaces] = useState([])

  useEffect(() => {
    // Si hay token y lugares, consulta si el usuario ya calificó cada lugar
    const checkUserRatings = async () => {
      if (!token) return setRatedPlaces([])
      const rated = []
      for (const place of places) {
        await fetchRatings(place.id)
        const ratings = useRatingsStore.getState().ratings
        if (ratings.some((r) => r.userId === userId)) {
          rated.push(place.id)
        }
      }
      setRatedPlaces(rated)
    }

    checkUserRatings()
  }, [places, token, fetchRatings])

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error)
        }
      )
    } else {
      console.error('Geolocalización no soportada en este navegador.')
    }
  }, [])

  useEffect(() => {
    if (selectedPlaceId && markerRefs.current[selectedPlaceId]) {
      markerRefs.current[selectedPlaceId].openPopup()
    }
  }, [selectedPlaceId])

  return (
    <MapContainer
      center={origin || [-0.284917, -78.545485]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
    >
      <MapCenterOnPlace selectedPlaceId={selectedPlaceId} places={places} />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {origin && (
        <Marker position={origin} icon={redIcon}>
          <Popup>Tu ubicación actual</Popup>
        </Marker>
      )}
      {!loading &&
        !error &&
        places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{
              click: () => onSelectedPlace(place.id)
            }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.description}
              <br />
              <span>
                Calificación promedio:{' '}
                {place.averageRating
                  ? place.averageRating.toFixed(2)
                  : 'Sin calificación'}
              </span>
              {token && !ratedPlaces.includes(place.id) && (
                <RatingForm
                  placeId={place.id}
                  onRated={() => setRatedPlaces([...ratedPlaces, place.id])}
                />
              )}
              {token && ratedPlaces.includes(place.id) && (
                <div className='text-green-600 text-xs mt-2'>
                  Ya calificaste este lugar.
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      {loading && (
        <Popup position={origin || [-0.284917, -78.545485]}>
          Cargando lugares...
        </Popup>
      )}
      {error && (
        <Popup position={origin || [-0.284917, -78.545485]}>
          Error: {error}
        </Popup>
      )}
    </MapContainer>
  )
}

export default Map
