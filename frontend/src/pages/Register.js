import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { register_api } from '../api/auth.api';
import Toast from '../utils/ShowToast';

const Register = () => {
  const [registerDetail, setRegisterDetail] = useState({
    email: '',
    password: '',
    cassword: '',
    isAdded: 'false',
  });
  const [toast, showToast] = Toast();

  const inputHandler = e => {
    const { name, value } = e.target;
    setRegisterDetail(prevVal => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    try {
      if (registerDetail.password != registerDetail.cpassword) {
        showToast({
          title: 'Password is not matching',
          description: 'Please enter same password.',
          status: 'error',
        });
      } else {
        const user = await register_api({
          email: registerDetail.email,
          password: registerDetail.password,
        });

        if (user.data.statusCode === 200) {
          showToast({
            title: 'Your account is created.',
            description: 'Please login.',
            status: 'success',
          });
        }
      }
    } catch (err) {
      showToast({
        title: err.response.statusText,
        description: err.response.data.message,
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
      <Stack spacing={8} mx={'auto'} w={'lg'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Register to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={inputHandler} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={inputHandler} />
            </FormControl>
            <FormControl id="cpassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="cpassword" onChange={inputHandler} />
            </FormControl>
            <Stack spacing={10} pt={3}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSubmit}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} href="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
