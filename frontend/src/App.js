import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './utils/ColorModeSwitcher';
import FarmCard from './layout/shared/FarmCard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Box>Farm House Booking System</Box>
        </Grid>
        <FarmCard />
      </Box>
    </ChakraProvider>
  );
}

export default App;
