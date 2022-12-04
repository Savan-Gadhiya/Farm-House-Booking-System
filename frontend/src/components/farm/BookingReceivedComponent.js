import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Spinner,
} from '@chakra-ui/react';
import Toast from '../../utils/ShowToast';

const BookingReceivedComponent = props => {
  const [isLoading, setIsLoading] = useState(true);

  const [toast, showToast] = Toast();


  // if(props.bookingDetail){
  //   setIsLoading(true);
  // }
  // if (isLoading) {
  //   return (
  //     <Box>
  //       <Spinner />
  //     </Box>
  //   );
  // }


  return (
    <Box maxW="lg" minW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" m={4}>
      <Box p="3" display={'flex'} flexDirection="row">
        <Box>
          <Image
            boxSize={'160px'}
            src={props.bookingDetail?.farmImages ? props.bookingDetail?.farmImages[0]?.imageUrl : ''}
          />
        </Box>
        <Box ml={'15px'}>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            fontSize={'22px'}
          >
            {props.bookingDetail?.farmName}
          </Box>

          <Box>
          &#8377;   {props.bookingDetail?.totalPrice}
            <Box as="span" fontSize="sm">
              {' '}
              total pay
            </Box>
          </Box>
          <Box fontSize="sm" my={1}>
            <Text fontWeight={500} display={'inline'}> Duration: </Text>
            {`${new Date(props.bookingDetail?.checkInDate).toLocaleDateString()} to ${new Date(props.bookingDetail?.checkOutDate).toLocaleDateString()}`}
          </Box>
          <Box fontSize="sm" my={1}>
            <Text fontWeight={500} display={'inline'}> Number of Peoples: </Text>
            {props.bookingDetail?.noOfPeople}
          </Box>

          <Box fontSize="sm" my={1}>
            <Text fontWeight={500} display={'inline'}> Booked by: </Text>
            {props.bookingDetail?.userDetail?.firstName + props.bookingDetail?.userDetail?.lastName}
          </Box>

          <Box fontSize="sm" my={1}>
            <Text fontWeight={500} display={'inline'}> Contect Info: </Text>
            {props.bookingDetail?.userDetail?.phoneNumber}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingReceivedComponent;
