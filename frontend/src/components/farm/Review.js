import React, { useState, useEffect, Spinner } from 'react';
import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { average } from 'https://unpkg.com/average-rating/dist/average-rating.esm.js';

import OneReview from '../../layouts/review/OneReview';
import { fetch_farm_reviews } from '../../api/review.api';
import axios from 'axios';
import { API } from '../../api/api_url';

const Review = props => {
  const { farmId } = props;
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [allRating, setAllRating] = useState([0, 0, 0, 0, 0]);
  const [avgRating, setAvgRating] = useState(0);
  const [profileUrl, setProfileUrl] = useState('');

  const fetchReviews = async () => {
    const token = localStorage.getItem('token');
    const data = await fetch_farm_reviews({ farmId });

    console.log('revi...', data);
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
      <Box mb={3}>
        <Heading size={'xl'} as={'h2'} pb={'15px'}>
          Review
        </Heading>
        <Box>
          <Text fontSize={'18px'}>
            Average Rating: {average(allRating)} <StarIcon />
          </Text>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-around'}
      >
        {reviews.map((review, index) => {
          {
            console.log(
              'review is ',
              review?.User ? review.User[0]?.profileImage.imageUrl : ''
            );
          }
          return (
            <OneReview
              review={review}
              key={index}
              avgRating={average(allRating)}
              image={review?.User ? review.User[0]?.profileImage.imageUrl : ''}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Review;
