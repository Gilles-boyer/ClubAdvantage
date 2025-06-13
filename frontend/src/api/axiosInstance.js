import axios from 'axios';

 let client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

export default client;

