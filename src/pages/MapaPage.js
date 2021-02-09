import * as React from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 2,
}

export const MapaPage = () => {
  const mapaDiv = React.useRef();
  const [mapa, setMapa] = React.useState(null)

  React.useEffect(() => {
    const  map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ puntoInicial.lng, puntoInicial.lat ],
      zoom: puntoInicial.zoom
    });
    setMapa(map)

  }, [])

  return (
    <>
      <div
        ref={mapaDiv}
        className="mapContainer"
      />
    </>
  )
}
