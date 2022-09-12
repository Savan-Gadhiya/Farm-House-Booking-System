import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FarmCard from '../layouts/shared/FarmCard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const MainRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/farmcard" element={<FarmCard />}></Route>
    </Routes>
  );
};

export default MainRoute;
