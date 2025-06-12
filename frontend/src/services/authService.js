import axios from 'axios';

const rootURL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');

const authClient = axios.create({
    baseURL: rootURL,
    withCredentials: true,
});

export const login = ({ email, password }) => authClient.post('/login', { email, password });
export const logout = () => authClient.post('/logout');
