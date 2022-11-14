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
          <a href="#this" className="">
            {' '}
            <button className="btn">Book Your Farm</button>
          </a>
        </Box>
      </Box>
      <Box bg="gray.700">
        <Center h="100px" fontSize={30} color="white">
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
              console.log('farm...', farm);
              if (index < 3) return <FarmCard farmData={farm} key={index} />;
            })}
        </Box>

        <Center h="100px" fontSize={30} color="white">
          <Link to="/farms">
            <Button>Visit More Farms</Button>
          </Link>
        </Center>
      </Box>
      {/* services */}
      <Box bg="gray.500" pb={18}>
        <Center h="100px" fontSize={30} color="white">
          Services
        </Center>
        <Box
          display="flex"
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
          flexDirection={'row'}
          bg="gray.500"
        >
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Add Farms
            </Heading>

            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              Your can add farm detail.
            </Text>
          </Box>

          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Book Farm
            </Heading>

            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              Your can book farm.
            </Text>
          </Box>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              View Farms
            </Heading>

            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              You can visit farms.
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
