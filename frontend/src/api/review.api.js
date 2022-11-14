import { API } from './api_url';

export const fetch_farm_reviews = async ({ farmId }) => {
  const res = await fetch(`${API}/review/getreview/${farmId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();
  return response;
};

export const add_review = async ({ farmId, bookingId, rating, review }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/review/addreview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({ farmId, bookingId, rating, review }),
  });

  const response = await res.json();
  return response;
};

export const fetch_review_by_bookingId = async ({ bookingId }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/review/getReviewByBookingId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({ bookingId }),
  });
  const response = await res.json();
  return response;
};
