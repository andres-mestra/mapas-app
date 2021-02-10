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
  const { coords, setRef, nuevoMarcador$, movimientoMarcador$, addMarcador, actualizarPosicion } = useMapbox(puntoInicial);

  //Agregar marcadores del server al mapa
  React.useEffect(() => {
    socket.on('marcadores-activos', (marcadores) => {
      for(const key  of Object.keys(marcadores)){
        addMarcador( marcadores[key], key )
      }
    })
  },[socket, addMarcador])

  //Obtener el Nuevo marcador
  React.useEffect(() => {
    nuevoMarcador$.subscribe( marcador => {
      socket.emit('marcador-nuevo', marcador)
    })
  }, [nuevoMarcador$, socket])

  //Obtener el marcador que se esta moviendo
  React.useEffect(() => {
    movimientoMarcador$.subscribe( marcador => {
      socket.emit('marcador-actualizado',marcador);
    })
  },[socket, movimientoMarcador$])

  //Escuchar el movimiento de marcador en otro cliente
  React.useEffect(() => {
    socket.on('marcador-actualizado', (marcador) => {
      actualizarPosicion(marcador);
    })
  },[socket,actualizarPosicion])


  //Escuchar nuevos marcadores agregados por otros clientes
  React.useEffect(() => {
    socket.on('marcador-nuevo', (marcador) => {
      addMarcador(marcador, marcador.id)
    })
  },[socket, addMarcador])

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
