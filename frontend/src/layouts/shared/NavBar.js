import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../routes/MainRoute';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  console.log('login ', loggedIn);

  useEffect(() => {}, [loggedIn]);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setLoggedIn(false);
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <InputGroup>
                <Input placeholder="Search Here..." />
                <InputRightElement
                  children={<Search2Icon color="green.500" />}
                />
              </InputGroup>

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {loggedIn ? (
                <Flex alignItems={'center'}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar
                        size={'sm'}
                        src={
                          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                      />
                    </MenuButton>
                    <MenuList>
                      <Link to={'/profile'}>
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <Link>
                        <MenuItem>Help</MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link>
                        <MenuItem>My Bookings</MenuItem>
                      </Link>
                      <Link to={'/farms'}>
                        <MenuItem>All Farms</MenuItem>
                      </Link>
                      <Link to={'/addfarm'}>
                        <MenuItem>Add Farm</MenuItem>
                      </Link>
                      <Link>
                        <MenuItem>View Ratins</MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Stack
                  flex={{ base: 1, md: 0 }}
                  justify={'flex-end'}
                  direction={'row'}
                  spacing={6}
                >
                  <Link to={'/login'}>
                    <Button
                      as={'a'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'pink.400'}
                      _hover={{
                        bg: 'pink.300',
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link to={'/register'}>
                    <Button
                      as={'a'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'pink.400'}
                      _hover={{
                        bg: 'pink.300',
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
