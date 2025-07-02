import client from "../api/axiosInstance";

export const getToken = () => client.get('/sanctum/csrf-cookie')

export const verifyToken = () => client.get('/api/auth/validate')

export const fetchUser = async () => {
    const response = await client.get("/api/user/me");
    // console.log('RESPONSE SERVICE =>', response.data.user);
    
    return response.data.user
}

export const loginRequest = ({ email, password }) => client.post('/api/login', { email, password })

export const logout = () => client.post('/api/logout')
