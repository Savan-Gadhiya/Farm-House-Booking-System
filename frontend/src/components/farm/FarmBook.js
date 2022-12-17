import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { API } from '../../api/api_url';
import { UserContext } from '../../routes/MainRoute';
import Toast from '../../utils/ShowToast';
import { Link } from 'react-router-dom';

const FarmBook = props => {
  const { loggedIn } = useContext(UserContext);
  const [farmData, setFarmData] = useState({});
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection',
    },
  ]);
  const [bookedDates, setBookedDates] = useState([]);
  const [otherBookingDetail, setOtherBookingDetail] = useState({
    totalPrice: 0,
    noOfPeople: 0,
  });
  const [pymentDetail, setPaymentDetail] = useState({
    cardNumber: '',
    cvv: '',
    holderName: '',
  });

  // open close
  const [open, setOpen] = useState(false);
  const [toast, showToast] = Toast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // get the target element to toggle
  const refOne = useRef(null);

  //booked dates
  // const bookedDates = [new Date('9/9/2022'), new Date('9/4/2022')];

  useEffect(() => {
    // event listeners
    setFarmData(props.booking);
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
    const strToDate = props.booking.unavailableDates.map(val => {
      return new Date(val);
    });
    setBookedDates(strToDate);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = e => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = e => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    setOtherBookingDetail(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const paymentInputHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    setPaymentDetail(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const calculateTotalRent = () => {
    var d1 = new Date(range[0].startDate);
    var d2 = new Date(range[0].endDate);
    var day = 0;
    while (d1 <= d2) {
      day += 1;
      d1.setDate(d1.getDate() + 1);
    }

    return day * farmData?.rents?.defaultRent; // remaining to set... return default price
  };

  const handleOnSubmit = async () => {
    try {
      if (pymentDetail.cardNumber.length != 16)
        return showToast({
          title: 'Invalid Card Number',
          description: 'Please Enter Valid Card Number.',
          status: 'error',
        });

      if (pymentDetail.cvv.length != 3) {
        return showToast({
          title: 'Invalid CVV Number',
          description: 'Please Enter Valid CVV Number.',
          status: 'error',
        });
      }

      if (!loggedIn) return alert('Your should log in to book farm.');
      if (otherBookingDetail.noOfPeople > farmData.estimatedCapacity) {
        showToast({
          title: 'Enter valid capacity of farm',
          description: 'Please check the capacity of farm.',
          status: 'error',
        });
        return;
      }
      const token = localStorage.getItem('token');
      const result = await axios.post(`${API}/booking/bookFarm`, {
        farmId: farmData._id,
        checkInDate: range[0].startDate,
        checkOutDate: range[0].endDate,
        totalPrice: calculateTotalRent(),
        noOfPeople: otherBookingDetail.noOfPeople,
        token: token,
      });
      if (result.data.statusCode === 200) {
        showToast({
          title: 'Farm Booking',
          description: 'Farm is booked.',
          status: 'success',
        });
      }
    } catch (err) {
      showToast({
        title: 'Error',
        description: 'Please enter valid detail.',
        status: 'success',
      });
    }
  };
  return (
    <Flex minH={'100vh'} bg={useColorModeValue('gray.10', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Book Farm
          </Heading>
        </Stack>
        <Box {...props?.style}>
          <Text fontSize={'30px'}>
            &#8377; {farmData?.rents?.defaultRent}
            <Text fontSize={'18px'} display={'inline-block'} pl={3}>
              {' '}
              per day{' '}
            </Text>
          </Text>
          <HStack mt={'20px'}>
            <FormControl id="checkInDate" isRequired>
              <FormLabel>checkInDate </FormLabel>
              <Input
                value={`${format(range[0].startDate, 'dd/MM/yyyy')} `}
                readOnly
                className="inputBox"
                onClick={() => setOpen(open => !open)}
              />
            </FormControl>

            <FormControl id="checkOutDate" isRequired>
              <FormLabel>checkOutDate</FormLabel>
              <Input
                value={`${format(range[0].endDate, 'dd/MM/yyyy')} 
          `}
                readOnly
                className="inputBox"
                onClick={() => setOpen(open => !open)}
              />
            </FormControl>
          </HStack>
          <div ref={refOne}>
            {open && (
              <DateRange
                onChange={item => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                className="calendarElement"
                disabledDates={bookedDates}
                minDate={new Date()}
              />
            )}
          </div>
          <FormControl id="noOfPeople" isRequired mt={'20px'}>
            <FormLabel>Number of People</FormLabel>
            <Input
              type="text"
              name="noOfPeople"
              value={otherBookingDetail.noOfPeople}
              onChange={handleInput}
            />
          </FormControl>
          <Text fontSize={'18px'} mt={3}>
            Total Rent: &#8377; {calculateTotalRent()}{' '}
          </Text>
          <Stack spacing={10} pt={2} mt={'20px'}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={onOpen}
            >
              Submit
            </Button>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Enter Payment Detail</ModalHeader>
                <ModalCloseButton />
                {/* <ModalBody><Lorem count={2} />hello world</ModalBody> */}
                {/* <Stack
                  spacing={8}
                  mx={'auto'}
                  w={'lg'}
                  maxW={'lg'}
                  // py={12}
                  // px={6}
                > */}
                <Box
                  // rounded={'lg'}
                  // bg={useColorModeValue('white', 'gray.700')}
                  // boxShadow={'lg'}
                  p={5}
                >
                  <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                      <Input
                        type="number"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={pymentDetail.cardNumber}
                        onChange={paymentInputHandler}
                      />
                    </FormControl>
                    <HStack spacing="24px">
                      <Input
                        type="number"
                        name="cvv"
                        placeholder="Card CVV"
                        value={pymentDetail.cvv}
                        onChange={paymentInputHandler}
                      />
                      <Input
                        type="date"
                        name="date"
                        placeholder="Expiry Date"
                        // onChange={handleInput}
                      />
                    </HStack>
                    <FormControl id="name">
                      <Input
                        type="text"
                        name="holderName"
                        placeholder="Card Holder Name"
                        value={pymentDetail.holderName}
                        onChange={paymentInputHandler}
                      />
                    </FormControl>
                  </Stack>
                </Box>
                {/* </Stack> */}
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    // variant="ghost"
                    colorScheme={'green'}
                    onClick={handleOnSubmit}
                  >
                    Place Your Order
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default FarmBook;
