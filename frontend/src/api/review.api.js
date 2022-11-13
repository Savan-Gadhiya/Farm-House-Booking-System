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
