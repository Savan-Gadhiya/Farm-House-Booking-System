import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login_api } from '../api/auth.api';
import { UserContext } from '../routes/MainRoute';
import Toast from '../utils/ShowToast';

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({ email: '', password: '' });
  const [toast, showToast] = Toast();
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const inputHandler = e => {
    const { name, value } = e.target;
    setLoginDetail(prevVal => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();
      const response = await login_api(loginDetail);
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.data.token);
        showToast({
          title: 'Login Successful.',
          description: 'Enjoy....',
          status: 'success',
        });
        setLoggedIn(true);
        navigate('/');
      }
      if (response.statusCode !== 200) {
        showToast({
          title: 'Please enter valid details.',
          description: response.message,
          status: 'error',
        });
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
      <Stack spacing={10} mx={'auto'} w={'lg'} maxW={'lg'} py={10} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={inputHandler} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={inputHandler} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSubmit}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={'center'}>
                Don't have an account?{' '}
                <Link color={'blue.400'} href="/register">
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
