import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { API } from '../api/api_url';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default function SignupCard() {
  const [farmDetail, setFarmDetail] = useState({
    farmName: '',
    description: '',
    estimatedCapacity: 0,
    defaultRent: 0,
    isVisible: true,
  });
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  let coordinates = ['', ''];
  // const [coordinates, setCoordinates] = useState(['', '']);
  const { isOpen, onOpen, onClose } = useDisclosure(); // for displaying model
  const [files, setFiles] = useState([]);
  const [farmFile, setFarmFile] = useState('');
  const [farmDocument, setFarmDocument] = useState({
    docUrl: '',
    publicId: '',
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setFarmDetail(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleInputAddress = e => {
    const { name, value } = e.target;
    setAddress(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleLocation = e => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('geo location ', position);
      coordinates = [position.coords.longitude, position.coords.latitude];
    });
    // console.log('location ', coordinates);
  };
  var arr = [];
  const handleDrop = async () => {
    // Push all the axios request promise into a single array

    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'smiteshmaniya');

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dhybpb2nf/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          }
        )
        .then(response => {
          const data = response.data;

          // console.log(data);
          arr.push({ imageUrl: data.url, publicId: data.public_id });
        });
    });

    // Once all the files are uploaded
    await axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log('files uploaded... ', arr);
    });
  };

  const getFarmDocUrl = async () => {
    const formData = new FormData();
    formData.append('file', farmFile);
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
    return fileData.data;
  };

  const deleteFile = e => {
    console.log(e.target.name);
    const newFiles = files.filter((val, ind) => e.target.name != ind);
    setFiles(newFiles);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    await handleDrop();
    const idproof = await getFarmDocUrl();
    const token = localStorage.getItem('token');
    console.log('id...', idproof);
    const result = await axios.post(`${API}/farm/registerFarm`, {
      ...farmDetail,
      address,
      coordinates,
      token,
      images: arr,
      farmDocument: {
        docUrl: idproof.url,
        publicId: idproof.public_id,
      },
    });
    if (result.data.statusCode === 200) {
      alert('Your Farm registration is successfull.');
    } else {
      alert('Farm registration is failed.');
    }
  };

  // when marker position is changed on the google map
  const onMarkerChage = e => {
    // console.log(e.latLng.lat(), e.latLng.lng());
    coordinates = [e.latLng.lat(), e.latLng.lng()];
    // console.log(coordinates);
    // setCoordinates([e.latLng.lat(), e.latLng.lng()]);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      {console.log('files ', files)}
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Add Farm Detail
          </Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="farmName" isRequired>
                <FormLabel>Farm Name</FormLabel>
                <Input
                  type="text"
                  name="farmName"
                  value={farmDetail.farmName}
                  onChange={handleInput}
                />
              </FormControl>
            </Box>
            <FormControl id="address" isRequired>
              <FormLabel>Farm address Line1</FormLabel>
              <Input
                type="text"
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleInputAddress}
              />
            </FormControl>
            <FormControl id="address2" isRequired>
              <FormLabel>Farm address Line2</FormLabel>
              <Input
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleInputAddress}
              />
            </FormControl>
            <HStack>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleInputAddress}
                />
              </FormControl>

              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputAddress}
                />
              </FormControl>
            </HStack>

            <FormControl id="pincode" isRequired>
              <FormLabel>Pincode</FormLabel>
              <Input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleInputAddress}
              />
            </FormControl>

            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={farmDetail.description}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl id="files" isRequired mb={'7px'}>
              <FormLabel>Images</FormLabel>
              <Input
                type="file"
                name="files"
                onChange={e =>
                  setFiles(preImg => [...preImg, e.target.files[0]])
                }
              />
            </FormControl>

            <FormControl id="files" isRequired mb={'7px'}>
              <FormLabel>Farm Document</FormLabel>
              <Input
                type="file"
                name="files"
                onChange={e => setFarmFile(e.target.files[0])}
              />
            </FormControl>

            <FormControl>
              {files.map((file, ind) => {
                return (
                  <Button onClick={deleteFile} name={ind} ml={'3px'}>
                    {file.name.substr(0, 6) + '...'}
                  </Button>
                );
              })}
            </FormControl>

            <FormControl id="defaultRent" isRequired>
              <FormLabel>Default Rent</FormLabel>
              <Input
                type="text"
                name="defaultRent"
                value={farmDetail.defaultRent}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl id="estimatedCapacity" isRequired>
              <FormLabel>Estimated Capacity</FormLabel>
              <Input
                type="text"
                name="estimatedCapacity"
                value={farmDetail.estimatedCapacity}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Button onClick={handleLocation}>Current Location</Button>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
