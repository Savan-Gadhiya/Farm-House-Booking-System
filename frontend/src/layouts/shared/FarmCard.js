import {
  Flex,
  Circle,
  Box,
  Image,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardCarousel from './CardCarousel';

const FarmCard = props => {
  const navigate = useNavigate();
  return (
    <Flex p={5} alignItems="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        width="18em"
        minHeight="18em"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        cursor={'pointer'}
        onClick={() => {
          navigate('/farms/' + props.farmData._id);
        }}
      >
        {/* {true && (
          <Badge
            rounded="full"
            px="2"
            fontSize="0.7em"
            colorScheme="green"
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="green.200"
          >verified</Badge>
        )} */}
        {/* <CardCarousel id={farmData.id} data={farmData.image} /> */}
        <Image
          width={'100%'}
          height={'75%'}
          src={props.farmData.images[0].imageUrl}
          alt={`Picture of ${props.farmData.farmName}`}
          roundedTop="lg"
          flexGrow={2}
        />

        <Box p="3" flexGrow={1}>
          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.farmData.farmName}
            </Box>

            <Box>
              {props.farmData.verificationStatus === "verified" && (
                <Badge
                  rounded="full"
                  px="2"
                  fontSize="0.7em"
                  colorScheme="green"
                >
                  verified
                </Badge>
              )}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="sm"
              color={useColorModeValue('gray.800', 'white')}
              isTruncated
            >
              {/* {props.farmData.farmLocation} */}
              {'Surat, Gujarat'}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default FarmCard;
