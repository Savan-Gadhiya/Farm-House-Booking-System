import React, { createContext, useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import { API } from '../api/api_url';
import { ADMIN_ID } from '../config';
import VerificationRequests from '../pages/VerificationRequests';
import BookingReceived from '../pages/BookingReceived';
import MyBooking from '../pages/MyBooking';
import YourFarms from '../pages/YourFarms';
import UpdateFarm from '../pages/UpdateFarm';
import NearFarms from '../pages/NearFarms';

export const UserContext = createContext();

const MainRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    checkLogin();
  }, [loggedIn]);

  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.post(`${API}/auth/checkauth`, {
      token,
    });
    if (result.data.data._id === ADMIN_ID) {
      setIsAdmin(true);
    }
    if (result.data.statusCode === 200) {
      setLoggedIn(true);
      setUserImg(result.data.data.profileImage.imageUrl);
    } else setLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        isAdmin,
        setIsAdmin,
        userImg,
        searchText,
        setSearchText,
      }}
    >
      <>
        <NavBar />
        <Container maxW="95%" minH={'75vh'}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/nearfarms/:latitude/:longitude"
              element={<NearFarms />}
            ></Route>

            {!loggedIn && (
              <Route exact path="/login" element={<Login />}></Route>
            )}
            {!loggedIn && (
              <Route exact path="/register" element={<Register />}></Route>
            )}
            <Route exact path="/farmcard" element={<FarmCard />}></Route>
            {loggedIn && (
              <Route exact path="/addfarm" element={<AddFarm />}></Route>
            )}
            <Route exact path="/farms" element={<Farms />}></Route>
            <Route exact path="/farms/:farmId" element={<Farm />}></Route>
            {loggedIn && (
              <Route exact path="/profile" element={<Profile />}></Route>
            )}
            {loggedIn && isAdmin && (
              <Route
                exact
                path="/verificationRequests"
                element={<VerificationRequests />}
              ></Route>
            )}
            {loggedIn && (
              <Route exact path="/mybooking" element={<MyBooking />}></Route>
            )}
            {loggedIn && (
              <Route exact path="/yourfarms" element={<YourFarms />}></Route>
            )}
            {loggedIn && (
              <Route
                exact
                path="/updatefarm/:farmId"
                element={<UpdateFarm />}
              ></Route>
            )}
            {loggedIn && (
              <Route
                exact
                path="/bookingReceived"
                element={<BookingReceived />}
              ></Route>
            )}
          </Routes>
        </Container>
        <Footer />
      </>
    </UserContext.Provider>
  );
};

export default MainRoute;
