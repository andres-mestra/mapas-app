import { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import { v4 } from 'uuid'
import { Subject } from 'rxjs'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

export const useMapbox = (puntoInicial) => {

  const mapaDiv = useRef();
  //Resive el nodo html donde se renderiza el mapa
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, [])


  //Referencia a los marcadores
  const marcadores = useRef({});

  //Observables de Rxjs
  //const movimientoMarcador
  const nuevoMarcador = useRef( new Subject () );


  //Mapa y coords
  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial)


  //función para agregar marcadores
  const addMarcador = useCallback((event) => {

    const { lng, lat } = event?.lngLat;

    const marker = new mapboxgl.Marker();
    marker.id = v4() //TODO: si el marcador ya tiene id
    marker
      .setLngLat([lng, lat]) //Cordenadas donde se va establecer
      .addTo(mapa.current) // Agregar el mapa
      .setDraggable(true) //Que se pueda mover

    marcadores.current[marker.id] = marker;

    //TODO: si el marcador tiene ID no emitir
    nuevoMarcador.current.next({
      id: marker.id,
      lng,
      lat,
    });


    //Eschuchar movimientos del marcador
    marker.on('drag', ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat()
      
      //TODO: emitir los cambios del marcador
    })

  }, [])

  //Crear mapa
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom
    });
    mapa.current = map;;

  }, [puntoInicial])

  //Cuando se mueve el mapa
  useEffect(() => {
    mapa.current?.on('move', () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      })
    })

    return mapa.current?.off('move');

  }, [])

  //Agregar marcadores al hacer click
  useEffect(() => {
    mapa.current?.on('click', addMarcador )
  }, [addMarcador])


  return {
    coords,
    setRef,
    addMarcador,
    marcadores,
    nuevoMarcador$: nuevoMarcador.current,
  }

}
