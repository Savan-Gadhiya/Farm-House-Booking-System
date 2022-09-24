import React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';
import MainRoute from './routes/MainRoute';
import NavBar from './layouts/shared/NavBar';
import Footer from './layouts/shared/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Container maxW="95%">
        <MainRoute />
      </Container>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
