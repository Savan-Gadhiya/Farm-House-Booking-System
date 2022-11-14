import React, { useState, useEffect, Spinner } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import OneReview from '../../layouts/review/OneReview';
import { fetch_farm_reviews } from '../../api/review.api';

const Review = props => {
  const { farmId } = props;
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    const data = await fetch_farm_reviews({ farmId });
    setReviews(data.data);
  };

  useEffect(() => {
    fetchReviews();
    setIsLoading(false);
  }, []);

  return (
    <Box p={'20px 0px'}>
      <Heading size={'xl'} as={'h2'} pb={'15px'}>
        Review
      </Heading>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-around'}
      >
        {reviews.map((review, index) => {
          return <OneReview review={review} key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default Review;
