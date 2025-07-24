import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const markerIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function LocationPickerMap({ latitude, longitude, setLatLng }) {
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setLatLng({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        })
      }
    })
    return null
  }

  return (
    <div className='w-full h-64 rounded-xl overflow-hidden mb-2'>
      <MapContainer
        center={
          latitude && longitude
            ? [latitude, longitude]
            : [-0.201662, -78.494125]
        }
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />
        <MapClickHandler />
        {latitude && longitude && (
          <Marker position={[latitude, longitude]} icon={markerIcon} />
        )}
      </MapContainer>
    </div>
  )
}

export default LocationPickerMap
