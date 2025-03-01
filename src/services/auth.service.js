import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  validateToken: async (token) => {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  updateProfile: async (userId, profileData) => {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};