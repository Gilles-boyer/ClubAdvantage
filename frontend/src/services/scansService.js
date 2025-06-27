import client from "../api/axiosInstance";

// (Optionnel) Voir tous les scans
export const displayScans = () => client.get('/api/scans');

// (Optionnel) Voir un scan spécifique
export const displayScanById = (id) => client.get(`/api/scans/${id}`);

// Créer un nouveau scan
export const createScan = (data) => client.post('/api/scans/', data);

// (Optionnel) Supprimer un scan
export const deleteScan = (id) => client.delete(`/api/scans/${id}`);

