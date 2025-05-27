import client from "../api/axiosInstance";

// Créer un nouveau scan
export const createScan = (data) => client.post('/scans', data);

// (Optionnel) Voir tous les scans
export const displayScans = () => client.get('/scans');

// (Optionnel) Voir un scan spécifique
export const displayScanById = (id) => client.get(`/scans/${id}`);

// (Optionnel) Supprimer un scan
export const deleteScan = (id) => client.delete(`/scans/${id}`);
