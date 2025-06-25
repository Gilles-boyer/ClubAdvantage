import client from "../api/axiosInstance";

export const getToken = () => client.get('/sanctum/csrf-cookie')

// export const fetchUser = () => client.get('/api/user')
export const fetchUser = () => client.get("/user/me");

export const loginRequest = ({ email, password }) => client.post('/login', { email, password })

export const logout = () => client.post('/logout')
