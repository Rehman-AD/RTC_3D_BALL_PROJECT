import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (username, password) => {
  return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username, password) => {
  return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const savePosition = async (x, y, z) => {
  const response = await axios.post(`${API_URL}/ball/position`, { x, y, z });
  return response.data;
};

export const getAllPositions = async () => {
  const response = await axios.get(`${API_URL}/ball/positions`);
  return response.data;
};

