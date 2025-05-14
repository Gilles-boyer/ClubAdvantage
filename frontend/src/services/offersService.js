import client from '../api/axiosInstance';

export const displayOffers = () => client.get('/offers');
export const createOffer = (data) => client.post('/offers', data);
export const updateOffer = (id, data) => client.put(`/offers/${id}`, data);
export const deleteOffer = (id) => client.delete(`/offers/${id}`);
