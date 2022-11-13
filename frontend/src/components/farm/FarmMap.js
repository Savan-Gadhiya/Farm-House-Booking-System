import { Heading, AspectRatio } from '@chakra-ui/react';
import React from 'react';
import Map from '../Map';
const FarmMap = (props) => {
  return (
    <>
      <Heading as="h2" size="xl" pb={4}>
        Location
      </Heading>

			<AspectRatio ratio={16 / 9}>
      <Map
        width={'100%'} // default: 100%
        height={'100%'} // default :400px
				zoom = {10}
        defaultCenter={{
          lat: 23.22620304830154,
          lng: 72.16918945312504,
        }}
        isMarkerShown
        markerProperty={{
          position: {
            lat: 23.22620304830154,
            lng: 72.16918945312504,
          },
          draggable: false,
        }}
      />
			</AspectRatio>
    </>
  );
};

export default FarmMap;
