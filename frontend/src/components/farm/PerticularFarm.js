import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ImageSlider from './ImageSlider';
import { SlideData } from './SlideData';
import FarmDetails from './FarmDetails';
import FarmBook from './FarmBook';
import Review from './Review';
import FarmMap from './FarmMap';

const PerticularFarm = props => {
  // console.log("Farm from pertticular farm: ", props.farm);
  return (
    <Box mt={'25px'} mb={'25px'}>
      <Box>
        <Box display={'block'} marginLeft={'auto'} marginRight={'auto'} h="40%">
          <ImageSlider
            slides={
              props.farm.images
                ? props.farm.images
                : SlideData
            }
          />
        </Box>
      </Box>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <FarmDetails
          style={{ flexBasis: '69%' }}
          farm={props.farm}
        />
        <FarmBook
          style={{ flexBasis: '29%', boxShadow: '1px 5px 10px #aaaaaa', margin: "5px", padding: "20px"}}
          booking={props.farm}
        />
      </Flex>
      <FarmMap 
        // coordinates = {lat: }
       />   {/* Showing location of farm in google map */}
      <Review farmId={props.farm._id} />
    </Box>
  );
};

export default PerticularFarm;
