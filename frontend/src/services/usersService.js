import client from "../api/axiosInstance";

export const displayUsers = () => client.get('/api/users');
// export const fetchCurrentUser = () => client.get('/api/user/me')
export const fetchUserById = (id) => client.get(`/api/users/${id}`);
export const createUser = (data) => client.post('/api/users/', data);
export const updateUser = (id, data) => client.patch(`/api/users/${id}`, data);
export const deleteUser = (id) => client.delete(`/api/users/${id}`);