import axios from 'axios';
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // ex: "http://…:8000/api"
    // timeout: 10000,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },

});

export default client
