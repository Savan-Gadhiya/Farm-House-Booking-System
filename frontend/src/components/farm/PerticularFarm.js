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
          style={{ flexBasis: '69%' }}
          farm={farm.farm.farms[0]}
        />
        <FarmBook
          style={{ flexBasis: '29%', boxShadow: '1px 5px 10px #aaaaaa', margin: "5px", padding: "10px"}}
          booking={farm.farm.farms[0]}
        />
      </Flex>
    </Box>
  );
};

export default PerticularFarm;
