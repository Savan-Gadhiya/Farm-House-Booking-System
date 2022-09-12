import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MainRoute from './routes/MainRoute';
import NavBar from './layouts/shared/NavBar';
import Footer from './layouts/shared/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <MainRoute />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
