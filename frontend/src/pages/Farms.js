import { Flex, Box } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { get_all_farms_api, get_search_farms_api } from '../api/farm.api';
import FarmCard from '../layouts/shared/FarmCard';
import { UserContext } from '../routes/MainRoute';

const Farms = props => {
  const [data, setData] = useState([]);
  const { searchText, setSearchText } = useContext(UserContext);

  const fetchMyAPI = async () => {
    // let response = await get_all_farms_api();
    let response = await get_search_farms_api({search: searchText});
    setData(response.data);
  };

  useEffect(() => {
    fetchMyAPI();
  }, [searchText]);

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
