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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  AspectRatio,
  Divider,
  Link,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { API } from '../api/api_url';
import Map from '../components/Map';
import Toast from '../utils/ShowToast';

export default function AddFarm() {
  const [toast, showToast] = Toast();

  const [farmDetail, setFarmDetail] = useState({
    farmName: '',
    description: '',
    estimatedCapacity: 0,
    isVisible: true,
    defaultRent: '',
  });
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [coordinates, setCoordinates] = useState([0, 0]); // this is take location of farm from marker
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // for displaying model
  const [farmFile, setFarmFile] = useState('');
  const [farmDocument, setFarmDocument] = useState({
    docUrl: '',
    publicId: '',
  });
  const [featureDetail, setFeatureDetail] = useState('');

  const [featureIdhook, setfeatureIdhook] = useState('');

  const getFeaturesFromApi = async () => {
    const getFeatures = await axios.get(`${API}/feature/getallfeatures`);
    console.log('all features', getFeatures.data.data.data);
    setFeatureDetail(getFeatures.data.data.data);
  };

  useEffect(() => {
    getFeaturesFromApi();
  }, []);

  const [isLoading, setIsLoading] = useState(false); // for displaying spinner on button on submit

  const handleInput = e => {
    const { name, value } = e.target;
    setFarmDetail(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
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
      // coordinates = [position.coords.longitude, position.coords.latitude];
      setCoordinates([position.coords.longitude, position.coords.latitude]);
    });
    console.log('location ', coordinates);
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

  const deleteFile = e => {
    console.log(e.target.name);
    const newFiles = files.filter((val, ind) => e.target.name != ind);
    setFiles(newFiles);
  };

  const handleOnSubmit = async e => {
    setIsLoading(true); // displaying spinner in button
    e.preventDefault();
    console.log('fdlfdj...', featureIdhook);
    await handleDrop();
    const idproof = await getFarmDocUrl();
    const token = localStorage.getItem('token');

    let result;
    try {
      result = await axios.post(`${API}/farm/registerFarm`, {
        ...farmDetail,
        address,
        coordinates,
        token,
        images: arr,
        farmDocument: {
          docUrl: idproof.url,
          publicId: idproof.public_id,
        },
        featuresId: featureIdhook,
      });
      setIsLoading(false);

      console.log('result: ', result);

      if (result.data.statusCode === 200) {
        showToast({
          title: 'Congratulations.',
          description: 'Your Farm registration is successfull.',
          status: 'success',
        });
        // alert('Your Farm registration is successfull.');
      } else {
        showToast({
          title: 'Farm registration is failed.',
          description: 'Enter valid data.',
          status: 'error',
        });
        // alert('Farm registration is failed.');
      }
    } catch (e) {
      console.log('result: ', result);

      showToast({
        title: 'Something went wrong.',
        description: 'Enter valid data.',
        status: 'error',
      });
    }
  };

  // when marker position is changed on the google map
  const onMarkerChage = e => {
    setCoordinates([e.latLng.lat(), e.latLng.lng()]);
  };

  const handleFeature = e => {
    if (e.target.checked) {
      // featureIds.push(e.target.name);
      const nn = e.target.name;
      setfeatureIdhook(prev => {
        return [...prev, nn];
      });
    }
    var featureIds1;
    if (!e.target.checked) {
      const name = e.target.name;
      setfeatureIdhook(featureIdhook.filter(item => item !== name));
      // featureIds1 = featureIds.filter(fe => {
      //   return fe != e.target.name;
      // });
      // featureIds = featureIds1;
    }

    console.log(featureIdhook);
  };

  return (
    <>
      {/* for location model */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your farm location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text style={{ margin: `10px auto`, display: `inline-block` }}>
              Drag a marker and put on your farm location
            </Text>

            <AspectRatio ratio={16 / 9}>
              <Map
                width={'100%'} // default: 100%
                height={'300px'} // default :400px
                defaultCenter={{
                  // 23.22620304830154 72.16918945312504 => this is location of ahemdabad
                  lat:
                    coordinates[0] == '' ? 23.22620304830154 : coordinates[0],
                  lng:
                    coordinates[1] == '' ? 72.16918945312504 : coordinates[1],
                }}
                isMarkerShown
                markerProperty={{
                  position: {
                    lat:
                      coordinates[0] == '' ? 23.22620304830154 : coordinates[0],
                    lng:
                      coordinates[1] == '' ? 72.16918945312504 : coordinates[1],
                  },
                  draggable: true,
                  onDragEnd: onMarkerChage,
                }}
              />
            </AspectRatio>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Choose</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* UI start form Here */}
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Add Farm Detail
            </Heading>
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

              <FormControl id="pincode" isRequired>
                <FormLabel>Features</FormLabel>

                {featureDetail
                  ? featureDetail.map((feature, ind) => {
                      return (
                        <>
                          <Checkbox
                            colorScheme="green"
                            onChange={handleFeature}
                            name={feature._id}
                            key={ind}
                          >
                            {feature?.featureName}
                          </Checkbox>
                          <br />
                        </>
                      );
                    })
                  : ''}
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
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
              <FormControl>
                {files.map((file, ind) => {
                  return (
                    <Button
                      onClick={deleteFile}
                      name={ind}
                      ml={'3px'}
                      key={ind}
                    >
                      {file.name.substr(0, 6) + '...'}
                    </Button>
                  );
                })}
              </FormControl>

              <FormControl id="files" isRequired mb={'7px'}>
                <FormLabel>Farm Document</FormLabel>
                <Input
                  type="file"
                  name="files"
                  onChange={e => setFarmFile(e.target.files[0])}
                />
              </FormControl>

              <FormControl id="defaultRent" isRequired>
                <FormLabel>Default Rent</FormLabel>
                <Input
                  type="number"
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
                <HStack>
                  <Button onClick={handleLocation}>Current Location</Button>
                  <Button onClick={onOpen}>Pick from map</Button>
                </HStack>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleOnSubmit}
                  isLoading={isLoading}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
