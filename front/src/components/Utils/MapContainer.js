import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { useState } from 'react';

const MapPage = ({ google, items }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = (marker, event) => {
    console.log(marker)
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  return (
    <>
      <div >
        <Map google={google} zoom={6} initialCenter={{ lat: 4.6240647, lng: -74.139324 }} className='modal-maps-map'>
          {items.map(marker => (
            <Marker
              key={marker.codigo}
              position={{ lat: marker.latitud, lng: marker.longitud }}
              onClick={handleMarkerClick}
              nombre={marker.nombre}
            />
          ))}
          <InfoWindow marker={activeMarker} visible={showInfoWindow} onClose={handleInfoWindowClose}>
          <div>
            <h1>{activeMarker && activeMarker.nombre}</h1>
          </div>
        </InfoWindow>
        </Map>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCFIa2W7FZ9gpPLvJMxO4zQGVH2Pm0l4o' // Reemplaza con tu propia API key de Google Maps
})(MapPage);
