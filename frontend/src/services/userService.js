import api from './api';

export const userService = {
  getHistory: async () => {
    try {
      const response = await api.get('/user/history');
      return response.data;
    } catch (error) {
      return [
        { id: 'bk_123', service: 'Plumbing', worker: 'Arun Kumar', date: '25 Aug 2026', price: 510, status: 'Completed' },
        { id: 'bk_124', service: 'Electrical Works', worker: 'Marcus Vance', date: '18 Aug 2026', price: 750, status: 'Completed' }
      ];
    }
  },

  getSavedWorkers: async () => {
    try {
      const response = await api.get('/user/saved-workers');
      return response.data;
    } catch (error) {
      return [
        { id: 'w1', name: 'Arun Kumar', role: 'Plumbing Specialist', rating: 4.9, reviews: 142, avatar: '👷', rate: 350 }
      ];
    }
  },

  saveWorker: async (workerId) => {
    try {
      const response = await api.post(`/user/saved-workers/${workerId}`);
      return response.data;
    } catch (error) {
      return { success: true, message: 'Worker saved to favorites (Mock)' };
    }
  }
};
