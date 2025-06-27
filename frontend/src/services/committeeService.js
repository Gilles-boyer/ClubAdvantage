import client from '../api/axiosInstance';

export const displayCommittees = () => client.get('/api/committees');
export const createCommittee = (data) => client.post('/api/committees', data);
export const updateCommittee = (id, data) => client.put(`/api/committees/${id}`, data);
export const deleteCommittee = (id) => client.delete(`/api/committees/${id}`);
