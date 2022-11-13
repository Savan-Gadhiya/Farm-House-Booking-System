import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Badge, Heading, Spinner } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { get_farm_by_id_api } from '../../api/farm.api';

const BookingComponent = props => {
  const [farm, setFarm] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const farmId = props.booking.farmId;
    const fetchFarms = async () => {
      const data = await get_farm_by_id_api(farmId);
      console.log(data.data);
      setFarm(data.data);
    };
    fetchFarms();
    setIsLoading(false);
  }, []);

  const property = {
    farmName: 'Modern home in city center in the heart of historic Los Angeles',
    totalPay: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

      {/* {console.log(props.booking.totalPrice)} */}
      {/* {console.log('farm: ', farm.farms[0].farmName)} */}
      
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {farm.farms.farmName}
        </Box>

        <Box>
          {props.booking.totalPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingComponent;
