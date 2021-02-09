import * as React from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const puntoInicial = {
  lng: -122.4611,
  lat: 37.7986,
  zoom: 13.5,
}

export const MapaPage = () => {
  const mapaDiv = React.useRef();
  const [mapa, setMapa] = React.useState(null)
  const [coords, setCoords] = React.useState(puntoInicial)

  React.useEffect(() => {
    const  map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ puntoInicial.lng, puntoInicial.lat ],
      zoom: puntoInicial.zoom
    });
    setMapa(map)

  }, [])

  //Cuando se mueve el mapa
  React.useEffect(() => {
    mapa?.on('move', () => {
      const { lng, lat } = mapa.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.getZoom().toFixed(2),
      })
    })

    return mapa?.off('move');

  },[mapa])

  return (
    <>
    <div className="infoCoords">
      Lng:  { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
    </div>
      <div
        ref={mapaDiv}
        className="mapContainer"
      />
    </>
  )
}
