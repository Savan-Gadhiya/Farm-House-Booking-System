import axios from 'axios';
import { API } from './api_url';

// For getting email address of user for profile page
export const fetchEmail = async body => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API}/user/getuser`, {
    token,
  });

  // const response = await res.json();
  // console.log('resemail', response);
  return res.data;
};

// For save the details of user into
export const saveUserData = async body => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  return response;
};
