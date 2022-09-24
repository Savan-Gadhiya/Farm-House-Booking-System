import { Flex, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { get_all_farms_api } from '../api/farm';
import FarmCard from '../layouts/shared/FarmCard';

const farmData = [
  {
    id: 1,
    farmName: 'Maharaja Farm',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    farmLocation: 'Surat, Gujarat',
  },
  {
    id: 2,
    farmName: 'Smitesh Farm',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    farmLocation: 'Anand, Gujarat',
  },
];

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
          return <FarmCard farmData={farm} key={index} />;
        })}
    </Box>
  );
};

export default Farms;
