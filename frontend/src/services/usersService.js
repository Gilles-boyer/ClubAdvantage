import client from "../api/axiosInstance";

export const displayUsers = () => client.get('/users');
export const createUser = (data) => client.post('/users/', data);
export const updateUser = (id, data) => client.patch(`/users/${id}`, data);
export const deleteUser = (id) => client.delete(`/users${id}`);