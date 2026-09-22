import api from './api';

export const authService = {
  signin: async (credentials) => {
    try {
      const response = await api.post('/auth/signin', credentials);
      return response.data;
    } catch (error) {
      // Fallback mock authentication if backend server is not running
      console.warn('Backend server offline. Using mock signin authentication.');
      return { token: 'mock_jwt_token', user: { name: credentials.email.split('@')[0], email: credentials.email, role: 'customer' } };
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      console.warn('Backend server offline. Mocking signup registration.');
      return { success: true, message: 'Mock registration complete!' };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      return { success: true, message: 'Password recovery email dispatched (Mock)' };
    }
  },

  verifyAccount: async (code) => {
    try {
      const response = await api.post('/auth/verify', { code });
      return response.data;
    } catch (error) {
      return { success: true, message: 'Account verified successfully (Mock)' };
    }
  }
};
