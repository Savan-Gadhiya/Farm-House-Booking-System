import React, { useState, useEffect } from 'react';
import { Box, Text, WrapItem, Avatar, Spinner } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { get_user_by_userId } from '../../api/user.api';

const OneReview = props => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    function wrapperFunc() {
      setReview(props.review);
      setAvgRating(props.avgRating);

      setIsLoading(false);

      if (props?.review.User) {
        setFullName(
          props?.review?.User[0]?.firstName +
            ' ' +
            props?.review?.User[0]?.lastName
        );
      }
    }

    wrapperFunc();
  }, [props]);

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box w="xl" borderWidth="1px" borderRadius="lg" overflow="hidden" m={'8px'}>
      <Box p="4">
        <Box display="flex">
          <WrapItem>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              boxSize={'45px'}
            />
          </WrapItem>
          <Box ml={'8px'}>
            <Box>
              <Text>{fullName}</Text>
            </Box>

            <Box display="flex" mt="1" alignItems="center">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < props.review.rating ? 'teal.500' : 'gray.300'}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box mt="2" lineHeight="tight" noOfLines={2}>
          {props.review.review}
        </Box>
      </Box>
    </Box>
  );
};

export default OneReview;
