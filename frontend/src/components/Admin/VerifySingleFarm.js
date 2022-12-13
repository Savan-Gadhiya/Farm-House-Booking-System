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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerifySingleFarm = props => {
  // change verification status to accept:
  // const changeVerificationStatus = async e => {
  //   // e.preventDefault();
  //   const token = localStorage.getItem('token');
  //   const farmId = props.farm._id;
  //   const verificationStatus = e.target.name;
  //   console.log(verificationStatus);
  //   const res = await axios.post(`${API}/farm/ChangeVerificationStatus`, {
  //     token,
  //     farmId,
  //     verificationStatus,
  //   });
  //   /// TOAST HERE TO DISPLAY MESSAGE
  //   // console.log(res.data);
  //   // return res.data;
  // };

  return (
    <Box py={6} m={3}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        direction={{ base: 'column', sm: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={3}
        width={{base: '70%', sm: '90%'}}
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
            noOfLines={3} // display maximum 3 lines
          >
            {props?.farm?.description}
          </Text>

          <Text color={useColorModeValue('gray.600', 'gray.400')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={'10px'} preserveAspectRatio={true} fill={'#aaa'} style={{display: 'inline', margin: '0px 5px'}}><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7  64-64 64z"/></svg>
              {`${props?.farm?.address?.city}, ${props?.farm?.address?.state}`} 
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
            onClick={(e) => props.changeVerificationStatus(props.farm._id, e.target.name)}
            name={"accept"}
          >
            Accept
          </Button>
          <Button
            colorScheme="red"
            background={'#FC8181'}
            color={'black'}
            width={'150px'}
            onClick={(e) => props.changeVerificationStatus(props.farm._id, e.target.name)}
            name={"reject"}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VerifySingleFarm;
