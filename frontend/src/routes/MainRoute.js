import React, { createContext, useContext, useState } from 'react';
import { Container } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';
import FarmCard from '../layouts/shared/FarmCard';
import Profile from '../layouts/shared/Profile';
import Footer from '../layouts/shared/Footer';
import NavBar from '../layouts/shared/NavBar';
import AddFarm from '../pages/AddFarm';
import Farms from '../pages/Farms';
import Farm from '../pages/Farm';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const UserContext = createContext();

const MainRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    // <UserContext.Provider value={{ loggedIn }}>
    <>
      <NavBar />
      <Container maxW="95%">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/farmcard" element={<FarmCard />}></Route>
          <Route exact path="/addfarm" element={<AddFarm />}></Route>
          <Route exact path="/farms" element={<Farms />}></Route>
          <Route exact path="/farms/:farmId" element={<Farm />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
    // </UserContext.Provider>
  );
};

export default MainRoute;
