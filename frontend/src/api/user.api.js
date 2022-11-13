import { API } from './api_url';

// For getting email address of user for profile page
export const fetchEmail = async body => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/user/getemail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    // body: JSON.stringify(body),
  });

  const response = await res.json();
  return response;
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

// get user by userId
export const get_user_by_userId = async ({ userId }) => {
  const res = await fetch(`${API}/user/getOneUser/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await res.json();
  return response;
};
