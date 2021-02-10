import * as React from 'react'
import { SocketContext } from '../context/SocketContext'
import { useMapbox } from '../hooks/useMapbox'


const puntoInicial = {
  lng: -122.4611,
  lat: 37.7986,
  zoom: 13.5,
}

export const MapaPage = () => {
  
  const { socket } = React.useContext(SocketContext)
  const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox(puntoInicial);

  //Obtener el Nuevo marcador
  React.useEffect(() => {
    nuevoMarcador$.subscribe( marcador => {
    
      socket.emit('marcador-nuevo', marcador);
    
    })
  }, [nuevoMarcador$, socket])

  //Obtener el marcador que se esta moviendo
  React.useEffect(() => {
    movimientoMarcador$.subscribe( marcador => {
      console.log(marcador)
    })
  })

  //Escuchar nuevos marcadores
  React.useEffect(() => {
    socket.on('marcador-nuevo', (marcador) => {
      console.log(marcador.id)
    })
  },[socket])

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
