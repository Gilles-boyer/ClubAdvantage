import axios from 'axios';
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // ex: "http://…:8000/api"
    // timeout: 10000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },

});

client.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
})
export default client