import React from 'react';

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { API } from '../../api/api_url';
const VerifySingleFarm = props => {

  // change verification status to accept:
  const changeVerificationStatus = async e => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    const farmId = props.farm._id;
    const verificationStatus = e.target.name;
    console.log(verificationStatus);
    const res = await axios.post(`${API}/farm/ChangeVerificationStatus`, {
      token,
      farmId,
      verificationStatus,
    });
    /// TOAST HERE TO DISPLAY MESSAGE
    // console.log(res.data);
    // return res.data;
  };

  return (
    <Box py={6} m={3}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        direction={{ base: 'column', sm: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={3}
        width={'90%'}
        mx={'auto'}
        height={'15rem'}
      >
        <Flex width={'30%'} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              props?.farm?.images[0].imageUrl
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          // alignItems="center"
          p={3}
          pt={2}
        >
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {props?.farm?.farmName}
          </Heading>
          <Text as="p" fontSize={'xl'}>
            &#8377; {props?.farm?.rents?.defaultRent}
            <Text as="span" color="gray.600" fontSize="md">
              {' '}
              per day
            </Text>
          </Text>
          {/* desc */}
          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            noOfLines={4} // display maximum 3 lines
          >
            {props?.farm?.description}
          </Text>
        </Stack>
        <Stack
          padding={2}
          justifyContent={'space-between'}
          alignItems={'center'}
          direction={{ base: 'column' }}
          py={5}
          // border={"2px solid red"}
        >
          <a href={props?.farm?.farmDocument?.docUrl} target="_blank">
            <Button colorScheme="gray" width={'150px'} >
              View Document
            </Button>
          </a>
          <Button
            width={'150px'}
            background={'#68D391'}
            color={'black'}
            onClick={changeVerificationStatus}
            name={"accept"}
          >
            Accept
          </Button>
          <Button
            colorScheme="red"
            background={'#FC8181'}
            color={'black'}
            width={'150px'}
            onClick={changeVerificationStatus}
            name={"reject"}
          >
            Reject
          </Button>

          {/* <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Follow
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Follow
          </Button> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default VerifySingleFarm;
