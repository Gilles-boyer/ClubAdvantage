import client from '../api/axiosInstance';

export const displayCategories = () => client.get('/api/categories');
export const createCategory = (data) => client.post('/api/categories', data);
export const updateCategory = (id, data) => client.put(`/api/categories/${id}`, data);
export const deleteCategory = (id) => client.delete(`/api/categories/${id}`);
