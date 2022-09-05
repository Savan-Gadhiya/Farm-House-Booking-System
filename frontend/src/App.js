import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MainRoute from './routes/MainRoute';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRoute />
    </ChakraProvider>
  );
}

export default App;
