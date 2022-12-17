import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Badge, Heading, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { get_mybooking } from '../api/farm.api';
import BookingComponent from '../components/farm/BookingComponent';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    const data = await get_mybooking();
    setBookings(data.data);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <Box minH="100vh">
      <Heading as="h2" size="xl" p={'25px 0px'}>
        Your Bookings
      </Heading>
      <Box
        display={'flex'}
        flexDirection="row"
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        mt={4}
      >
        {bookings.length ? (
          bookings.map((booking, index) => {
            return <BookingComponent key={index} booking={booking} />;
          })
        ) : (
          <Text as="p" size="md" my={3}>
            {' '}
            Booking history is not found!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MyBooking;
