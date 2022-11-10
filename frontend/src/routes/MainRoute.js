import React, { createContext, useContext, useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';
import FarmCard from '../layouts/shared/FarmCard';
import Profile from '../layouts/shared/Profile';
import Footer from '../layouts/shared/Footer';
import NavBar from '../layouts/shared/NavBar';
import AddFarm from '../pages/AddFarm';
import Gmap from '../pages/Gmap';
import Farms from '../pages/Farms';
import Farm from '../pages/Farm';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import axios from 'axios';
import { API } from '../api/api_url';

export const UserContext = createContext();

const MainRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState('');
  useEffect(() => {
    checkLogin();
  }, [loggedIn]);

  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.post(`${API}/auth/checkauth`, {
      token,
    });
    if (result.data.statusCode == 200) {
      setLoggedIn(true);
      setUserImg(result.data.data.profileImage.imageUrl);
    } else setLoggedIn(false);
  };
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, userImg }}>
      <>
        <NavBar />
        <Container maxW="95%">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/farmcard" element={<FarmCard />}></Route>
            <Route exact path="/addfarm" element={<AddFarm />}></Route>
            <Route exact path="/gmaps" element={<Gmap />}></Route>
            <Route exact path="/farms" element={<Farms />}></Route>
            <Route exact path="/farms/:farmId" element={<Farm />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
          </Routes>
        </Container>
        <Footer />
      </>
    </UserContext.Provider>
  );
};

export default MainRoute;
