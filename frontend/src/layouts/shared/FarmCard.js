import {
  Flex,
  Box,
  useColorModeValue,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import CardCarousel from './CardCarousel';

function FarmCard() {
  return (
    <>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          // maxW="sm"
          // borderWidth="1px"
          // rounded="lg"
          // shadow="lg"
          // position="relative"
          style={{ border: '2px solid red' }}
        >
          <CardCarousel />

          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Farm Name
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}
              >
                <chakra.a href={'#'} display={'flex'}>
                  rating
                </chakra.a>
              </Tooltip>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              detail
              <Box
                fontSize="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                <Box as="span" color={'gray.600'} fontSize="lg">
                  10000
                </Box>
                Rupee
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          // maxW="sm"
          // borderWidth="1px"
          // rounded="lg"
          // shadow="lg"
          // position="relative"
          style={{ border: '2px solid red' }}
        >
          <CardCarousel />

          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Farm Name
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}
              >
                <chakra.a href={'#'} display={'flex'}>
                  rating
                </chakra.a>
              </Tooltip>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              detail
              <Box
                fontSize="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                <Box as="span" color={'gray.600'} fontSize="lg">
                  10000
                </Box>
                Rupee
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default FarmCard;
