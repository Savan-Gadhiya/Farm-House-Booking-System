import { Flex, Circle, Box, Image, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CardCarousel from './CardCarousel';

const FarmCard = props => {
  const navigate = useNavigate();

  return (
    <Flex p={5} alignItems="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        minW="18em"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        cursor={'pointer'}
        onClick={() => {
          navigate('/farms/' + props.farmData._id);
        }}
      >
        <Image
          // src={props.farmData.image}
          src={
            props.farmData.images[0].imageUrl
              ? props.farmData.images[0].imageUrl
              : require('../../images/farm_image.jpeg')
          } //require('../../images/farm_image.jpeg')
          alt={`Picture of ${props.farmData.farmName}`}
          roundedTop="lg"
          h="250px"
          objectFit="fill"
          w="350px"
        />

        <Box p="3">
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
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="sm" color={useColorModeValue('gray.800', 'white')}>
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
