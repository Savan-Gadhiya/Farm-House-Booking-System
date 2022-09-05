import React from 'react';
import { Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../utils/ColorModeSwitcher';
const Home = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box>Farm House Booking System</Box>
      </Grid>
    </Box>
  );
};

export default Home;
