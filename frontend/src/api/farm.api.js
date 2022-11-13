import { API } from './api_url';

// get all farms
export const get_all_farms_api = async () => {
  const res = await fetch(`${API}/farm/getAllFarms`, {
    method: 'GET',
  });
  return res.json();
};

// get one farm by id
export const get_farm_by_id_api = async (farmId) => {
  const res = await fetch(`${API}/farm/getFarmById/${farmId}`, {
    method: 'GET',
  });
  return res.json();
};
