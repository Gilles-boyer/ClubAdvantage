import axios from 'axios';
export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // ex: "http://…:8000/api"
    // timeout: 10000,
    withCredentials: true,
    // withXSRFToken: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});
