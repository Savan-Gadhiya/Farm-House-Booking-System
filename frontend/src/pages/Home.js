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
        <Center
          h="100px"
          fontSize={40}
          textTransform={'uppercase'}
          fontWeight={'600'}
        >
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
            <Button colorScheme="telegram">View All Farms</Button>
          </Link>
        </Center>
      </Box>

      {/* services */}
      <Box pb={25}>
        <Center
          h="100px"
          fontSize={40}
          textTransform={'uppercase'}
          fontWeight={'600'}
        >
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
        <Box mt={10} pt={'120px'} pb={'120px'} position={'relative'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="141"
            viewBox="0 0 205 141"
            fill="#444444"
            style={{ top: '8%', left: '0%', position: 'absolute' }}
            >
            <g>
              <path d="M69.8 60.7C82.9 69.1 89.4 80.4 89.4 94.7 89.4 108.9 85.2 120.1 76.8 128.3 68.4 136.4 57.9 140.5 45.3 140.5 32.7 140.5 22.1 136.5 13.5 128.6 4.8 120.7 0.5 110.3 0.5 97.5 0.5 84.6 4.7 72.1 13.1 60L54.4 0.5 97.1 0.5 69.8 60.7ZM176.9 60.7C190 69.1 196.5 80.4 196.5 94.7 196.5 108.9 192.3 120.1 183.9 128.3 175.5 136.4 165 140.5 152.4 140.5 139.8 140.5 129.2 136.5 120.6 128.6 111.9 120.7 107.6 110.3 107.6 97.5 107.6 84.6 111.8 72.1 120.2 60L161.5 0.5 204.2 0.5 176.9 60.7Z"></path>
            </g>
          </svg>
          <Box
            pl={40}
            pr={40}
            pt={5}
            pb={5}
            justifyContent={'center'}
            boxShadow="dark-lg"
            textAlign={'center'}
          >
            <Heading pt={'10'}>
              You are a just one click away from book your favourite farm at a
              reasonable price near you. Our vision only that to make your
              holidays memorable and enjoyable.
            </Heading>
            <Box fontSize={'4xl'} mt={2}>
              ~Farm Owner
            </Box>
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="141"
            viewBox="0 0 205 141"
            fill="#444444"
            style={{
              bottom: '10%',
              right: '0%',
              position: 'absolute',
              transform: 'rotate(180deg)',
            }}
            >
            <g>
              <path d="M69.8 60.7C82.9 69.1 89.4 80.4 89.4 94.7 89.4 108.9 85.2 120.1 76.8 128.3 68.4 136.4 57.9 140.5 45.3 140.5 32.7 140.5 22.1 136.5 13.5 128.6 4.8 120.7 0.5 110.3 0.5 97.5 0.5 84.6 4.7 72.1 13.1 60L54.4 0.5 97.1 0.5 69.8 60.7ZM176.9 60.7C190 69.1 196.5 80.4 196.5 94.7 196.5 108.9 192.3 120.1 183.9 128.3 175.5 136.4 165 140.5 152.4 140.5 139.8 140.5 129.2 136.5 120.6 128.6 111.9 120.7 107.6 110.3 107.6 97.5 107.6 84.6 111.8 72.1 120.2 60L161.5 0.5 204.2 0.5 176.9 60.7Z"></path>
            </g>
          </svg>
        </Box>
      </Box>
    </>
  );
};

export default Home;
