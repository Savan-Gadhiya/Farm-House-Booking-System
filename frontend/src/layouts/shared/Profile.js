import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  RadioGroup,
  Radio,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { API } from '../../api/api_url';
import { fetchEmail, saveUserData } from '../../api/user.api';

export default function Profile() {
  const [userDetail, setUserDetail] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: Date.now(),
  });
  const [addressDetail, setAddressDetail] = useState({
    address: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // get email address of logged in user and display it into email field
  useEffect(() => {
    async function getEmail() {
      const response = await fetchEmail();
      const data = response.data;
      console.log(response);
      setAddressDetail(prev => {
        return {
          ...prev,
          ...data?.address,
        };
      });
      data.email = data.authId.email;
      data.authId = undefined;
      setUserDetail(prev => {
        return {
          ...prev,
          ...data,
        };
      });
    }
    getEmail();
  }, []);

  // for handling input change
  const inputHandler = e => {
    const { name, value } = e.target;
    // console.log(userDetail);
    setUserDetail(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // for handling change in address field
  const addressHandler = e => {
    const { name, value } = e.target;
    // console.log(name, value)
    setAddressDetail(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // send data to backend when form is submitted
  const onSubmit = async e => {
    e.preventDefault();
    const compeleteUserDetail = {
      ...userDetail,
      address: addressDetail,
    };
    console.log(compeleteUserDetail);
    await saveUserData(compeleteUserDetail);
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Details
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Image</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo"></Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>

        <HStack>
          <Box>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                onChange={inputHandler}
                value={userDetail.firstName}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                onChange={inputHandler}
                value={userDetail.lastName}
              />
            </FormControl>
          </Box>
        </HStack>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            defaultValue={userDetail.email}
            isDisabled
          />
        </FormControl>

        {/* Phone number */}
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="number"
            name="phoneNumber"
            onChange={inputHandler}
            value={userDetail.phoneNumber}
          />
        </FormControl>

        {/* gender */}
        <RadioGroup value={userDetail.gender} name="gender">
          <FormLabel>Gender</FormLabel>
          <Stack spacing={20} direction="row" onChange={inputHandler}>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Stack>
        </RadioGroup>

        {/* DOB */}
        <FormControl id="dob">
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dob"
            onChange={inputHandler}
            value={new Date(userDetail.dob).toISOString().split('T')[0]} // for converting string at YYYY-MM-DD format
          />
        </FormControl>

        {/* Address */}
        <FormControl id="address" isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            onChange={addressHandler}
            value={addressDetail.address}
          />
        </FormControl>
        <FormControl id="address2" isRequired>
          <FormLabel>Address2</FormLabel>
          <Input
            type="text"
            name="address2"
            onChange={addressHandler}
            value={addressDetail.address2}
          />
        </FormControl>
        <HStack>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              onChange={addressHandler}
              value={addressDetail.city}
            />
          </FormControl>

          <FormControl id="state" isRequired>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              name="state"
              onChange={addressHandler}
              value={addressDetail.state}
            />
          </FormControl>
        </HStack>

        <FormControl id="pincode" isRequired>
          <FormLabel>Pincode</FormLabel>
          <Input
            type="text"
            name="pincode"
            onChange={addressHandler}
            value={addressDetail.pincode}
          />
        </FormControl>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
