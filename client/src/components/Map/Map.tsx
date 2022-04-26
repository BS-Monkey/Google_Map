import React, { useState, useRef, useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  // GoogleMap,
  // Marker,
  DirectionsRenderer,
  // InfoWindow,
} from "react-google-maps"
const { GoogleMap } = require("react-google-maps/lib/components/GoogleMap");
const { InfoWindow } = require("react-google-maps/lib/components/InfoWindow");
const { Marker } = require("react-google-maps/lib/components/Marker")
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { compose, withProps, lifecycle } = require("recompose");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

type Props = {
  markers: IMarker[]
  direction: google.maps.DirectionsResult | undefined
  selectState: boolean
  updateMarker: (marker: IMarker) => void
  visitPoint: (index: string) => void
  drawEvent: (from: google.maps.LatLng, to: google.maps.LatLng, mode: google.maps.TravelMode) => void
  addingMarkers: boolean
};

const MyMapComponent: React.FC<Props> = compose (
  withProps({
    // isMarkerShown
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFF-crk4zs6Q9unlebHvhtw9jSDrQZrvM&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `900px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props: any) => {
  const [defaultCenter, setDefaultCenter] = useState({ lat: -79.347015, lng: 43.651070 })
  const [keyState, setKeyState] = useState<boolean>(false)
  let directionsRendererRef = useRef<DirectionsRenderer>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
        setDefaultCenter(() => ({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }))
      }
    )
  }, [])

  google.maps.event.addDomListener(document, 'keydown', function(e) {
    //@ts-ignore
    if(e.key === 'Control')
    {
      setKeyState(true)
    }
  })

  google.maps.event.addDomListener(document, 'keyup', function(e) {
    //@ts-ignore
    if(e.key === 'Control')
    {
      setKeyState(false)
    }
  })

  const rectFunc = (e: google.maps.Rectangle) => {
    props.drawEvent(
      e.getBounds()?.getSouthWest(),
      e.getBounds()?.getNorthEast()
    )
    e.setVisible(false)
  }

  useEffect(() => {
    if (directionsRendererRef) {
      // @ts-ignore
      window.directionsRendererRef = directionsRendererRef
    }
  }, [directionsRendererRef])

  const addMarker = (e: google.maps.MapMouseEvent) => {
    if(!props.addingMarkers) return;
    console.log("add marker console.")
    if(e.latLng) {
      const marker: IMarker = {
        _id: '0',
        title: 'New Dot',
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
        color: 'red',
        period: 'monthly',
        info_open: true,
        visited: false,
        last_visited: new Date(),
        active: false,
        reserve: false,
        pickDate: new Date(),
        fromTime: new Date(),
        toTime: new Date(),
        persons: [],
        icon: ''
      }
      props.updateMarker(marker)
    }
  }

  const getIconAttributes =(iconColor: string, icon: string) => {
    return {
     

      path: getPathByIconName(icon),
      fillColor: iconColor,
      
      fillOpacity: 0.7,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(0, 0),
    };
  }
  const getPathByIconName = (name: string) => {
    switch(name) {
      case 'building':
        return 'M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z';
      case 'house':
        return 'M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z';
      default:
        return 'M 12 12 c 2.21 0 4 -1.79 4 -4 s -1.79 -4 -4 -4 s -4 1.79 -4 4 s 1.79 4 4 4 Z m 0 2 c -2.67 0 -8 1.34 -8 4 v 2 h 16 v -2 c 0 -2.66 -5.33 -4 -8 -4 Z';
    }
  };


  const handleMarkDrag = (index: number, marker: IMarker) => (e: google.maps.MapMouseEvent) => {
    if(e.latLng) {
      marker.latitude = e.latLng.lat()
      marker.longitude = e.latLng.lng()
      props.updateMarker(marker)
    }
  }

  const handleClick = (_id: string) => () => {
    props.visitPoint(_id)
  }

  const updateMark = (marker: IMarker) => {
    var update_state: boolean = false
    
    if(marker) {
      if (marker.visited) {
        var today = new Date()
        switch (marker.period) {
          case 'daily':
            if (today.getTime() > marker.last_visited.getTime() && today.getDate() !== marker.last_visited.getDate()){
              marker.visited = false
              update_state = true
              props.updateMarker(marker)
            }
            break;
          case 'weekly':
            if (today.getDay() === 1) {
              if (today.getTime() > marker.last_visited.getTime() && today.getDate() !== marker.last_visited.getDate()){
                marker.visited = false
                update_state = true
                props.updateMarker(marker)
              }
            }
            break;
          case 'monthly':
            if (today.getDate() === 1) {
              if (today.getTime() > marker.last_visited.getTime() && today.getDate() !== marker.last_visited.getDate()){
                marker.visited = false
                update_state = true
                props.updateMarker(marker)
              }
            }
            break;
          default:
            break;
        }
      }
      return update_state
    }
  }
  
  return (
  <GoogleMap
    defaultZoom={9}
    center={defaultCenter}
    onClick={addMarker}
    options={{
      fullscreenControl:false,
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30}
    >
      { props.selectState && keyState && (
        <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
        defaultOptions={{
          drawingControl: false,
          rectangleOptions: {
            fillOpacity: 0.1,
            strokeWeight: 1,
            clickable: false,
            zIndex: 1,
          },
        }}
        onRectangleComplete={rectFunc}
        />
      )}
      {props.direction &&
        <DirectionsRenderer 
          ref={directionsRendererRef}
          directions={props.direction}
          options={{
            markerOptions: {
              icon: getIconAttributes("red", "default")
            },
            draggable: true,
            hideRouteList: true,
          }}
        />
      }
      {props.markers.map((marker: IMarker, index: number) => {
        var color;
        if (marker.active) {
          color = "lightcoral"
        } else if (marker.visited && !updateMark(marker)) {
          color = "green"
        } else {
          color = marker.color
        }

        return(
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={getIconAttributes(color, marker?.icon || 'building')}
            draggable={true}
            onDrag={handleMarkDrag(index, marker)}
            onClick={handleClick(marker._id)}
          >
            {marker.info_open && <InfoWindow>
              <label htmlFor="info">{marker.title}</label>
            </InfoWindow>}
          </Marker>
        )}
      )}
    </MarkerClusterer>
  </GoogleMap>)}
)

export default MyMapComponent;
