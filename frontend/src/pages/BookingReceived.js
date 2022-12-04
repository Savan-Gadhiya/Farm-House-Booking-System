import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { booking_received, get_mybooking } from '../api/farm.api';
import BookingReceivedComponent from '../components/farm/BookingReceivedComponent';

const BookingReceived = () => {
  const [bookingRec, setbookingRec] = useState([]);

  const fetchMybookingRec = async () => {
    const response = await booking_received();
    console.log("response: ", response)
    setbookingRec(response.data);
  };

  useEffect(() => {
    fetchMybookingRec();
  }, []);
  return (
    <>
      <Box width={"100%"} display="flex" flexDirection="row" flexWrap={"wrap"} >
      {
        bookingRec.map((booking, key) => {
          return <BookingReceivedComponent bookingDetail={booking} key={key}/>
        })
      }
      </Box>			
		</>
  )
}

export default BookingReceived;