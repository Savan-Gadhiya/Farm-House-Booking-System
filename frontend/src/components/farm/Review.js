import React, { useState, useEffect, Spinner } from 'react';
import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { average } from 'https://unpkg.com/average-rating/dist/average-rating.esm.js';

import OneReview from '../../layouts/review/OneReview';
import { fetch_farm_reviews } from '../../api/review.api';

const Review = props => {
  const { farmId } = props;
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [allRating, setAllRating] = useState([0, 0, 0, 0, 0]);
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviews = async () => {
    const data = await fetch_farm_reviews({ farmId });
    let newArr = [0, 0, 0, 0, 0];
    data.data.map((val, index) => {
      newArr[val.rating - 1] += 1;
    });

    setAllRating(newArr);
    setAvgRating(average(allRating));

    setReviews(data.data);
  };

  useEffect(() => {
    fetchReviews();
    setIsLoading(false);
  }, []);

  return (
    <Box p={'20px 0px'}>
      <Box>
        <Heading size={'xl'} as={'h2'} pb={'15px'}>
          Review
        </Heading>
        <Box>
          Average Rating: {average(allRating)} <StarIcon />
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-around'}
      >
        {reviews.map((review, index) => {
          return (
            <OneReview
              review={review}
              key={index}
              avgRating={average(allRating)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Review;
