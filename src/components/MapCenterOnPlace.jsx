import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function MapCenterOnPlace({ selectedPlaceId, places }) {
  const map = useMap()
  useEffect(() => {
    if (!selectedPlaceId) return
    const place = places.find((p) => p.id === selectedPlaceId)
    if (place) {
      map.setView([place.latitude, place.longitude], 15, { animate: true })
    }
  }, [selectedPlaceId, places, map])
  return null
}
export default MapCenterOnPlace
