import client from '../api/axiosInstance';

export const displayCommittees = () => client.get('/committees');
export const createCommittee = (data) => client.post('/committees', data);
export const updateCommittee = (id, data) => client.put(`/committees/${id}`, data);
export const deleteCommittee = (id) => client.delete(`/committees/${id}`);
