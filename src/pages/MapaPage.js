import * as React from 'react'
import { useMapbox } from '../hooks/useMapbox'


const puntoInicial = {
  lng: -122.4611,
  lat: 37.7986,
  zoom: 13.5,
}

export const MapaPage = () => {
  
  const { coords, setRef, nuevoMarcador$ } = useMapbox(puntoInicial);

  React.useEffect(() => {
    nuevoMarcador$.subscribe( marcador => {
      console.log(marcador)
    } )
  }, [nuevoMarcador$])

  return (
    <>
    <div className="infoCoords">
      Lng:  { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
    </div>
      <div
        ref={ setRef }
        className="mapContainer"
      />
    </>
  )
}
