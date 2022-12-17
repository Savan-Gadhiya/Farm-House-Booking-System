import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { booking_received, get_mybooking } from '../api/farm.api';
import BookingReceivedComponent from '../components/farm/BookingReceivedComponent';

const BookingReceived = () => {
  const [bookingRec, setbookingRec] = useState([]);

  const fetchMybookingRec = async () => {
    const response = await booking_received();
    console.log('response: ', response);
    setbookingRec(response.data);
  };

  useEffect(() => {
    fetchMybookingRec();
  }, []);
  return (
    <>
      <Heading as="h1" size={'xl'} my={3}>
        Booking Received
      </Heading>
      <Box width={'100%'} display="flex" flexDirection="row" flexWrap={'wrap'}>
        {bookingRec.length ? (
          bookingRec.map((booking, key) => {
            return (
              <BookingReceivedComponent bookingDetail={booking} key={key} />
            );
          })
        ) : (
          <Text as="p" size="md" my={5}>
            {' '}
            Not any booking received!
          </Text>
        )}
      </Box>
    </>
  );
};

export default BookingReceived;
