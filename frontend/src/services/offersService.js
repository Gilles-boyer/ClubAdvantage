import client from '../api/axiosInstance';

export const displayOffers = () => client.get('/api/offers');
export const createOffer = (data) => client.post('/api/offers', data);
export const updateOffer = (id, data) => client.put(`/api/offers/${id}`, data);
export const deleteOffer = (id) => client.delete(`/api/offers/${id}`);
