import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { get_farm_by_id_api } from '../../api/farm.api';
import Rating from './Rating';
import { add_review, fetch_review_by_bookingId } from '../../api/review.api';
import Toast from '../../utils/ShowToast';

const BookingComponent = props => {
  const [farm, setFarm] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef (null);
  const finalRef = React.useRef(null);

  const [writeReview, setWriteReview] = useState('');
  const [writeRating, setWriteRating] = useState(0);

  const [toast, showToast] = Toast();

  const farmId = props.booking.farmId;

  const fetchFarms = async () => {
    const data = await get_farm_by_id_api(farmId);
    setFarm(data.data);
  };

  const fetchReview = async () => {
    const data = await fetch_review_by_bookingId({
      bookingId: props.booking._id,
    });
    setWriteReview(data.data.data.review);
    setWriteRating(data.data.data.rating);
  };

  useEffect(() => {
    fetchFarms();
    fetchReview();

    setIsLoading(false);
    console.log('props in booking component : ', props);
  }, [props]);

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  const onSubmit = async e => {
    e.preventDefault();
    const farmId = props.booking?.farmId;
    const bookingId = props.booking?._id;

    if (writeReview.length > 0) {
      const data = await add_review({
        farmId,
        bookingId,
        rating: writeRating,
        review: writeReview,
      });
      showToast({
        title: 'Review added.',
        description: 'Your review added',
        status: 'success',
      });
    } else {
      showToast({
        title: 'Please enter review.',
        description: 'You have to write a review',
        status: 'error',
      });
    }

    onClose();
  };

  return (
    <Box
      w="25em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={4}
      mb={4}
    >
      <Box p="6" display={'flex'} flexDirection="row">
        <Box>
          <Image
            boxSize={'160px'}
            src={farm?.images ? farm?.images[0]?.imageUrl : ''}
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
            {farm?.farmName}
          </Box>

          <Box>
            &#8377; {props?.booking?.totalPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              {' '}
              total pay
            </Box>
          </Box>

          <HStack mt={2} mb={1}>
            <Text fontSize={14}>Your Rating</Text>
            <Box display="flex" alignItems="center">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < writeRating ? 'teal.500' : 'gray.300'}
                  />
                ))}
            </Box>
          </HStack>

          <Button onClick={onOpen} mt={3}>
            Write Review
          </Button>

          {/* model start */}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Write Review</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Give Rating</FormLabel>
                  {/* <Input ref={initialRef} placeholder="First name" /> */}
                  <Rating
                    size={38}
                    scale={5}
                    fillColor="gold"
                    strokeColor="grey"
                    defaultValue={writeRating}
                    getRating={e => setWriteRating(e)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Give Review</FormLabel>
                  <Input
                    placeholder="Review"
                    defaultValue={writeReview}
                    onChange={e => setWriteReview(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingComponent;
