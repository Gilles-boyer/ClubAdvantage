import client from "../api/axiosInstance";

export const getToken = () => {
    client.get('/sanctum/cstf-cookie')
}

export const fetchUser = () => {
    client.get('/api/user')
}

export const loginRequest = ({ email, password }) => {
    client.post('/user', { email, password })
}

export const logout = () => {
    client.post('/logout')
}
export const me = () => client.get("/user/me");