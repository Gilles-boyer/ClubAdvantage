import client from '../api/axiosInstance';

export const displayRoles = () => client.get('/api/roles');
export const createRole = (data) => client.post('/api/roles', data);
export const updateRole = (id, data) => client.put(`/api/roles/${id}`, data);
export const deleteRole = (id) => client.delete(`/api/roles/${id}`);
