import React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';
import MainRoute from './routes/MainRoute';
import NavBar from './layouts/shared/NavBar';
import Footer from './layouts/shared/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRoute />
    </ChakraProvider>
  );
}

export default App;
