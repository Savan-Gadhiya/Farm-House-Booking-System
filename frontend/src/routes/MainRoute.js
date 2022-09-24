import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Farms from '../pages/Farms';
import Farm from "../pages/Farm"
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const MainRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/farms" element={<Farms />}></Route>
      <Route exact path="/farms/:farmId" element={<Farm />}></Route>
    </Routes>
  );
};

export default MainRoute;
