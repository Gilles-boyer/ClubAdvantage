import client from "../api/axiosInstance";

export const displayProfils = () => client.get('/profils');
export const createProfil = (data) => client.post('/profils/', data);
export const updateProfil = (id, data) => client.patch(`/profils/${id}`, data);
export const deleteProfil = (id) => client.delete(`/profils${id}`);