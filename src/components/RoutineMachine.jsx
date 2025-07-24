import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

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
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje
  popupAnchor: [1, -34], // Punto de apertura del popup
  shadowSize: [41, 41]
})
const RoutineMachine = ({ waypoints }) => {
  const map = useMap() // Obtener instancia del mapa

  useEffect(() => {
    if (!map) return
    if (!waypoints || waypoints.length < 2) return
    const routingControl = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }]
      },
      routeWhileDragging: true,
      show: true,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: blueIcon
        })
      }
    }).addTo(map)

    return () => {
      map.removeControl(routingControl)
    }
  }, [map, waypoints])

  return null // No renderiza elementos en el DOM
}

export default RoutineMachine
