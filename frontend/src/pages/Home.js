import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Avatar,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import '../css/home.css';
import FarmCard from '../layouts/shared/FarmCard';
import { get_all_farms_api } from '../api/farm.api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await get_all_farms_api();
      setData(response.data.farms);
    }

    fetchMyAPI();
  }, []);
  return (
    <>
      <Box className="header">
        <Box className="content">
          <h1 className="light uppercase large-font">Luxurious Farm</h1>
          <p className="light uppercase">About Farm</p>
          <Link to="/farms" className="">
            {' '}
            <button className="btn">Visit More Farms</button>
          </Link>
        </Box>
      </Box>

      <Box>
        <Center h="100px" fontSize={34}>
          Farms
        </Center>
        <Box
          display="flex"
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
          flexDirection={'row'}
        >
          {data &&
            data.length > 0 &&
            data.map((farm, index) => {
              if (index < 8) return <FarmCard farmData={farm} key={index} />;
            })}
        </Box>

        <Center h="100px" fontSize={30}>
          <Link to="/farms">
            <Button>Visit More Farms</Button>
          </Link>
        </Center>
      </Box>

      {/* services */}
      <Box pb={18}>
        <Center h="100px" fontSize={34}>
          Services
        </Center>
        <Box
          display="flex"
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
          flexDirection={'row'}
        >
          <Box
            maxW={'320px'}
            w={'full'}
            boxShadow="dark-lg"
            rounded={'lg'}
            p={5}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'} autoCapitalize={true}>
              Add Farms
            </Heading>

            <Text textAlign={'center'} px={3}>
              Add Farm & Earn Money
            </Text>
          </Box>

          <Box
            maxW={'320px'}
            w={'full'}
            boxShadow="dark-lg"
            rounded={'lg'}
            p={5}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Book Farm
            </Heading>

            <Text textAlign={'center'} px={3}>
              Book Farm & Enjoy
            </Text>
          </Box>
          <Box
            maxW={'320px'}
            w={'full'}
            boxShadow="dark-lg"
            rounded={'lg'}
            p={5}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              View Farms
            </Heading>

            <Text textAlign={'center'} px={3}>
              View Farm & Book Best Farm
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
