import React, { useState } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { Box } from '@chakra-ui/react';
import { GMAP_API_KEY } from '../config';

const Map = props => {
  const MyMapComponent = compose(
    withProps({
      /**
       * Note: create and replace your own key in the Google console.
       * https://console.developers.google.com/apis/dashboard
       * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
       */
      googleMapURL:
        `https://maps.googleapis.com/maps/api/js?key=${GMAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <Box style={{ height: `100%` }} />,
      containerElement: (
        <Box style={{ height: props.height ? props.height : `400px` }} />
      ),
      mapElement: (
        <Box
          style={{
            height: `100%`,
            width: props.width ? props.width : `100%`,
            margin: `auto`,
          }}
        />
      ),
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={props.zoom ? props.zoom : 8} defaultCenter={props.defaultCenter}>
      {props.isMarkerShown && (
        <Marker
          {...props.markerProperty} // contain position, draggable, onDragEnd function
        />
      )}
    </GoogleMap>
  ));
  return (
    <>
      <MyMapComponent
        {...props}
        // isMarkerShown
        // defaultCenter = {{lat: 34.397, lng: 99.644}}
        // markerProperty = {{
        // 	position: { lat: 34.397, lng: 99.644 },
        // 	draggable: true,
        // 	onDragEnd: () => console.log("dragged")
        // }}
      />
    </>
  );
};

export default Map;
