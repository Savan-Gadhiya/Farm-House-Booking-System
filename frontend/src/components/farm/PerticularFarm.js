import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ImageSlider from './ImageSlider';
import { SlideData } from './SlideData';
import FarmDetails from './FarmDetails';
import FarmBook from './FarmBook';
import Review from './Review';

const PerticularFarm = farm => {
  return (
    <Box mt={'25px'} mb={'25px'}>
      <Box>
        <Box display={'block'} marginLeft={'auto'} marginRight={'auto'} h="40%">
          <ImageSlider
            slides={
              farm.farm.farms[0].images.length > 0
                ? farm.farm.farms[0].images
                : SlideData
            }
          />
        </Box>
      </Box>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <FarmDetails
          style={{ flexBasis: '69%', border: '2px solid white' }}
          farm={farm.farm.farms[0]}
        />
        <FarmBook
          style={{ flexBasis: '29%', border: '2px solid red' }}
          booking={farm.farm.farms[0]}
        />
      </Flex>
      <Review farmId={farm.farm.farms[0]._id} />
    </Box>
  );
};

export default PerticularFarm;
