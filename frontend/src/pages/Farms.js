import { Flex, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { get_all_farms_api } from '../api/farm.api';
import FarmCard from '../layouts/shared/FarmCard';


const Farms = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await get_all_farms_api();
      setData(response.data.farms);
    }

    fetchMyAPI();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent={'space-evenly'}
      flexWrap={'wrap'}
      flexDirection={'row'}
    >
      {data &&
        data.length > 0 &&
        data.map((farm, index) => {
          console.log('farm...', farm);
          return <FarmCard farmData={farm} key={index} />;
        })}
    </Box>
  );
};

export default Farms;
