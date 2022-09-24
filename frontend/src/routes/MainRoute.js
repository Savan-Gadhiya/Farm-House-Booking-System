import React, { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FarmCard from '../layouts/shared/FarmCard';
import Footer from '../layouts/shared/Footer';
import NavBar from '../layouts/shared/NavBar';
import FarmDetail from '../pages/FarmDetail';
import Gmap from '../pages/Gmap';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const UserContext = createContext();

const MainRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ loggedIn }}>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/farmcard" element={<FarmCard />}></Route>
        <Route exact path="/farmdetail" element={<FarmDetail />}></Route>
        <Route exact path="/gmaps" element={<Gmap />}></Route>
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
};

export default MainRoute;
