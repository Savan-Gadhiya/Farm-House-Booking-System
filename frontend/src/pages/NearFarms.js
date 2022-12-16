import { Flex, Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/api_url';
import { get_all_farms_api, get_search_farms_api } from '../api/farm.api';
import FarmCard from '../layouts/shared/FarmCard';
import { UserContext } from '../routes/MainRoute';

const NearFarms = props => {
  const [data, setData] = useState([]);
  const { searchText, setSearchText } = useContext(UserContext);
  const { latitude, longitude } = useParams();
  console.log(latitude, longitude);

  const fetchMyAPI = async () => {
    // let response = await get_all_NearFarms_api();
    // let response = await get_search_farms_api({ search: searchText });
    // setData(response.data);
    let response = await axios.get(
      `${API}/farm/nearfarms/${longitude}/${latitude}`
    );
    console.log('reso.....', response);
    setData(response.data.data);
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

export default NearFarms;
