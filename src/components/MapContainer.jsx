import { useEffect, useState } from 'react'
import PlacesList from './PlacesList'
import Map from './Map'

function MapContainer() {
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)

  return (
    <div className='flex gap-4 w-full h-[calc(100vh-10rem)]'>
      <div className='w-5xl z-10 rounded-lg h-full overflow-hidden mx-auto'>
        <Map
          selectedPlaceId={selectedPlaceId}
          onSelectedPlace={setSelectedPlaceId}
        />
      </div>
      <PlacesList
        selectedPlaceId={selectedPlaceId}
        onSelectPlace={setSelectedPlaceId}
      />
    </div>
  )
}
export default MapContainer
