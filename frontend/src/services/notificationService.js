import api from './api';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      return [
        { text: 'Please rate your worker', time: '10 mins ago', desc: 'Submit feedback for Arun Kumar to complete co-op records.', action: '/user/rating/bk_123', type: 'rate' },
        { text: 'Payment successful', time: '15 mins ago', desc: 'Transaction of ₹510 verified on ledger.', action: '/user/history', type: 'payment' }
      ];
    }
  }
};
