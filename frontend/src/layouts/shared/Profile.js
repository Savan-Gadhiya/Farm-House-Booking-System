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
  Center,
  Box,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchEmail, saveUserData } from '../../api/user.api';
import Toast from '../../utils/ShowToast';

export default function Profile() {
  const [toast, showToast] = Toast();
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
  const [profileImage, setProfileImage] = useState({
    imageUrl: '',
    publicId: '',
  });
  const [profileImg, setProfileImg] = useState({});

  // get email address of logged in user and display it into email field
  useEffect(() => {
    async function getEmail() {
      const response = await fetchEmail();
      const data = response.data;
      // console.log('front', response);
      setAddressDetail(prev => {
        return {
          ...prev,
          ...data?.address,
        };
      });
      setProfileImage(prev => {
        return {
          ...prev,
          ...data?.profileImage,
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

  const handleImage = async e => {
    const formData = new FormData();
    formData.append('file', profileImg);
    formData.append('upload_preset', 'smiteshmaniya');

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    const fileData = await axios.post(
      'https://api.cloudinary.com/v1_1/dhybpb2nf/image/upload',
      formData,
      {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }
    );
    console.log('file data', fileData);
    return fileData;
  };

  // send data to backend when form is submitted
  const onSubmit = async e => {
    e.preventDefault();
    let profileImage;
    if (profileImg.name != null) {
      console.log('in...');
      const imageData = await handleImage();
      console.log('image res ', imageData);
      profileImage = {
        imageUrl: imageData.data.url,
        publicId: imageData.data.public_id,
      };
    }
    const compeleteUserDetail = {
      ...userDetail,
      address: addressDetail,
      profileImage,
    };

    const data = await saveUserData(compeleteUserDetail);
    if (data.statusCode == 200) {
      showToast({
        title: 'Your data is updated.',
        description: 'Your data is updated.',
        status: 'success',
      });
    } else {
      showToast({
        title: 'Something went wrong.',
        description: data.error,
        status: 'error',
      });
    }
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
              <Avatar size="xl" src={profileImage.imageUrl}></Avatar>
            </Center>
            <Center w="full">
              <Input
                type="file"
                name="files"
                onChange={e => setProfileImg(e.target.files[0])}
              />
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
        <FormControl id="phoneNumber" isRequired>
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
        <FormControl id="address2">
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
