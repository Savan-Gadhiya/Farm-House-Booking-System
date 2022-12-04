import axios from 'axios';
import { API } from './api_url';

// get all farms
export const get_all_farms_api = async () => {
  const res = await fetch(`${API}/farm/getAllFarms`, {
    method: 'GET',
  });
  return res.json();
};

// get one farm by id
export const get_farm_by_id_api = async farmId => {
  const res = await fetch(`${API}/farm/getFarmById/${farmId}`, {
    method: 'GET',
  });
  // console.log("Get farm by id: ",await res.json());
  return res.json();
};

// get my booking farms
export const get_mybooking = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API}/booking/getAllBookingByUserId/`, {
    token,
  });
  return res.data;
};

// Get all farm which verification status  is pending
export const get_pending_verifiation_farm = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API}/farm/getPendingFarms`, {
    token,
  });
  return res.data;
}

// change farm verification status
export const acceptFarm = async (farmId, verificationStatus) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API}/farm/getPendingFarms`, {
    token,
    farmId, verificationStatus
  });
  return res.data;
}

// change farm verification status
export const booking_received = async (farmId, verificationStatus) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API}/booking/bookingReceived`, {
    token,
  });
  return res.data;
}