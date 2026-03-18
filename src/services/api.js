import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5280/api',
});

// Shto token automatikisht në çdo kërkesë
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Nëse token skadon, dërgo te Login
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getCategories = () => API.get('/categories');
export const getCitizens = () => API.get('/citizens');
export const createCitizen = (data) => API.post('/citizens', data);
export const getRequests = () => API.get('/requests');
export const createRequest = (data) => API.post('/requests', data);
export const updateRequestStatus = (id, data) => API.put(`/requests/${id}/status`, data);
export const deleteRequest = (id) => API.delete(`/requests/${id}`);
export const searchRequests = (params) => API.get('/requests/search', { params });

export default API;