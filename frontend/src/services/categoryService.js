import client from '../api/axiosInstance';

export const displayCategories = () => client.get('/categories');
export const createCategory = (data) => client.post('/categories', data);
export const updateCategory = (id, data) => client.put(`/categories/${id}`, data);
export const deleteCategory = (id) => client.delete(`/categories/${id}`);
