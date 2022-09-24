import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import { get_farm_by_id_api } from '../api/farm';
import PerticularFarm from '../components/farm/PerticularFarm';

const Farm = props => {
  const { farmId: _id } = useParams();
  const [farmData, setFarmData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function FetchPerticularFarm() {
      const res = await get_farm_by_id_api(_id);
      setIsLoading(false);
      setFarmData(res.data);
    }

    FetchPerticularFarm();
    console.log(farmData);
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Container maxW="95%">
      <PerticularFarm farm={farmData} />
    </Container>
  );
};

export default Farm;
