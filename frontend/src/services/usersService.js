import client from "../api/axiosInstance";

export const displayUsers = () => client.get('/users');
export const fetchCurrentUser = () => client.get('/users/me')
export const createUser = (data) => client.post('/users/', data);
export const updateUser = (id, data) => client.put(`/users/${id}`, data);
export const deleteUser = (id) => client.delete(`/users/${id}`);