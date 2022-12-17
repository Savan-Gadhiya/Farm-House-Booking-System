import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { get_farm_by_owner_id_api } from '../api/farm.api';
import FarmCard from '../layouts/shared/FarmCard';

const YourFarms = () => {
  const [data, setData] = useState([]);

  const fetchMyAPI = async () => {
    let response = await get_farm_by_owner_id_api();
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
      <Heading as="h1" size={'xl'} m={3}>
        Your Farms
      </Heading>
      <Box
        display="flex"
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
        flexDirection={'row'}
      >
        {data && data.length > 0 ? (
          data.map((farm, index) => {
            // console.log('farm...', farm);
            return <FarmCard farmData={farm} key={index} forOwner={true} />;
          })
        ) : (
          <Text as="p" size="md" my={5}>
            {' '}
            Farm records are not found!
          </Text>
        )}
      </Box>
    </>
  );
};

export default YourFarms;
