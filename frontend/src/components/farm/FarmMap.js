import { Heading, AspectRatio } from '@chakra-ui/react';
import React from 'react';
import Map from '../Map';
const FarmMap = (props) => {
  console.log("farm map: ", props);
  return (
    <>
      <Heading as="h2" size="xl" pb={4}>
        Location
      </Heading>

			<AspectRatio ratio={16 / 9}>
      <Map
        width={'90%'} // default: 100%
        height={'90%'} // default :400px
				zoom = {10}
        defaultCenter={props.coordinates}
        isMarkerShown
        markerProperty={{
          position: props.coordinates,
          draggable: false,
        }}
      />
			</AspectRatio>
    </>
  );
};

export default FarmMap;
