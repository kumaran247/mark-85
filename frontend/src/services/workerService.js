import api from './api';

export const workerService = {
  getProfile: async (id) => {
    try {
      const response = await api.get(`/workers/${id}`);
      return response.data;
    } catch (error) {
      return {
        id: id || 'w1',
        name: 'Arun Kumar',
        role: 'Plumbing Specialist',
        rating: 4.9,
        reviews: 142,
        avatar: '👷',
        rate: 350,
        experience: '7 years',
        location: 'Karur North',
        availabilities: ['Monday', 'Tuesday', 'Thursday', 'Friday']
      };
    }
  },

  updateAvailability: async (schedule) => {
    try {
      const response = await api.put('/workers/availability', schedule);
      return response.data;
    } catch (error) {
      return { success: true, message: 'Availability schedule synced (Mock)' };
    }
  },

  uploadDocuments: async (formData) => {
    try {
      const response = await api.post('/workers/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return { success: true, message: 'Verification documents uploaded (Mock)' };
    }
  }
};
