import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LocateUser } from './LocateUser'
import { useRouteStore } from '../store/useRouteStore'

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje
  popupAnchor: [1, -34], // Punto de apertura del popup
  shadowSize: [41, 41]
})

export function MarkersMap({ showMain = true, setCoordinates = () => {} }) {
  const { routes, route } = useRouteStore()

  if (showMain) {
    return (
      <MapContainer
        center={[-0.201662, -78.494125]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Capa base del mapa */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routes.map((route) => (
          <Marker key={route.docId} position={route.address} icon={blueIcon}>
            <Popup>{route.routeName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  }

  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={route?.address}
      zoom={13}
    >
      {/* Capa base del mapa */}
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocateUser setCoordinates={setCoordinates} address={route.address} />
    </MapContainer>
  )
}
