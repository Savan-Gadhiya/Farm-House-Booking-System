import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Spinner } from '@chakra-ui/react';
import { get_farm_by_id_api } from '../api/farm.api';
import PerticularFarm from '../components/farm/PerticularFarm';

const Farm = props => {
  const { farmId: _id } = useParams();
  const [farmData, setFarmData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const FetchPerticularFarm = async () => {
    const res = await get_farm_by_id_api(_id);
    setIsLoading(false);
    setFarmData(res.data);
  }

  useEffect(() => {
    FetchPerticularFarm();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Container maxW="95%">
      <PerticularFarm farm={farmData} />
    </Container>
  );
};

export default Farm;
