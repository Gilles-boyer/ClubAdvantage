import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // ex: http://192.168.1.27:8000
  timeout: 10000,
  withCredentials: true,                   // <— activate cookies on all requests
  xsrfCookieName: 'XSRF-TOKEN',            // (optionnel : RESTORE les noms par défaut de Laravel)
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
