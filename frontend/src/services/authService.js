import axios from 'axios'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // http://192.168.1.17:8000/api
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

export const csrf   = ()            => authClient.get("/sanctum/csrf-cookie");
export const login  = creds         => authClient.post("/login", creds);
export const logout = ()            => authClient.post("/logout");
export const me     = ()            => authClient.get("/user/me");
