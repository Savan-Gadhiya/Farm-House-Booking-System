import React, { useState, useEffect } from 'react';
import { Box, Heading, List, Stack, Text } from '@chakra-ui/react';
import { API } from '../../api/api_url';
import axios from 'axios';

const FarmDetails = props => {
  const [farmData, setFarmData] = useState({});
  const [features, setFeatures] = useState('');

  const getAllFeatures = async () => {
    const getFeatures = await axios.get(`${API}/feature/getallfeatures`);
    console.log('all features', getFeatures.data.data.data);
    return getFeatures.data.data.data;
  };

  async function getFeatures() {
    setFarmData(props.farm);
    const detail = await getAllFeatures();
    setFeatures(detail);
  }

  useEffect(() => {
    getFeatures();
  }, []);

  return (
    <Box {...props?.style}>
      {console.log('farm detail ', farmData)}
      <Heading as="h2" size="xl" noOfLines={1} mt={'2px'}>
        {farmData.farmName}
      </Heading>
      <Text size="lg" textAlign={'justify'} mt={'2px'}>
        {farmData.description}
      </Text>
      <Box mt={'30px'}></Box>
      <Box>
        <Text as="b" fontSize="3xl">
          Farm Capacity: {farmData.estimatedCapacity}
        </Text>
      </Box>
      <Box mt={4}>
        <Text as="b" fontSize="3xl">
          Features
        </Text>
        {features
          ? features.map((feature, ind) => {
              if (farmData.featuresId.indexOf(feature._id) !== -1) {
                return (
                  <>
                    <Stack spacing={3}>
                      <Text fontSize="md">{feature.featureName}</Text>
                    </Stack>
                  </>
                );
              }
            })
          : ''}
      </Box>

      <Box>
        <Text fontSize="3xl" mt="20px">
          <b> Farm Address:</b>{' '}
        </Text>
        <Text fontSize={'md'} mb={'30px'}>
          {' '}
          {farmData.address?.addressLine1} {farmData.address?.addressLine2}{' '}
          {farmData.address?.city} {farmData.address?.state},{' '}
          {farmData.address?.pincode}.
        </Text>
      </Box>
    </Box>
  );
};

export default FarmDetails;
