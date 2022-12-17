import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import VerifySingleFarm from '../components/Admin/VerifySingleFarm';
import { get_pending_verifiation_farm } from '../api/farm.api';
import axios from 'axios';
import { API } from '../api/api_url';

const VerificationRequests = () => {
  const [farms, setFarms] = useState([]); // this will contain all farms with pending verification status
  const [reload, setReload] = useState(0); // This is for reloading the farms array when we update any requests

  const fetchPendingFarms = async () => {
    const result = await get_pending_verifiation_farm();
    console.log('result is: ', result.data);
    setFarms(result.data);
  };
  useEffect(() => {
    fetchPendingFarms();
  }, [reload]);

  const changeVerificationStatus = async (id, status) => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    const farmId = id;
    const verificationStatus = status;
    console.log(verificationStatus);
    const res = await axios.post(`${API}/farm/ChangeVerificationStatus`, {
      token,
      farmId,
      verificationStatus,
    });
    setReload(reload ^ 1); // change this values so that API called again and farm array are updated
  }
  return (
    <Box w="100%" minH={'67vh'} m={3} p={3}>
      {/* {console.log(farms)} */}
      <Heading as="h1" size={'xl'}>
        Pending Verification Requests
      </Heading>
      {/* <VerifySingleFarm /> */}
      {farms.length ? (
        farms.map((farm, index) => {
          return <VerifySingleFarm key={index} farm={farm} changeVerificationStatus={changeVerificationStatus}  />;
        })
      ) : (
        <Text as="p" size="md" my={5}>
          {' '}
          No pending verification requests
        </Text>
      )}
    </Box>
  );
};

export default VerificationRequests;
