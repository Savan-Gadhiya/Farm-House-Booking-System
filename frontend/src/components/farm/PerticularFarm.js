import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ImageSlider from './ImageSlider';
import { SlideData } from './SlideData';
import FarmDetails from './FarmDetails';
import FarmBook from './FarmBook';

const PerticularFarm = farm => {
  return (
    <Box mt={'25px'} mb={'25px'}>
      <Box>
        <Box display={'block'} marginLeft={'auto'} marginRight={'auto'} h="40%">
          <ImageSlider slides={SlideData} />
        </Box>
      </Box>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <FarmDetails
          style={{ flexBasis: '69%', border: '2px solid white' }}
          farm={farm.farm.farms[0]}
        />
        <FarmBook style={{ flexBasis: '29%', border: '2px solid red' }} />
      </Flex>
    </Box>
  );
};

export default PerticularFarm;
