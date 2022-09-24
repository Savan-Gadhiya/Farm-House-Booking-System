import React, { useMemo } from 'react';
// import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Gmap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDRX0D21tjCpNmpABQp8bnfNyA99pscQrM',
  });
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  // React.useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log('geo location ', position);
  //   });
  // });
  if (!isLoaded) return <h1>Loading....</h1>;
  return (
    <div>
      hello
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      ></GoogleMap>
    </div>
  );
}
