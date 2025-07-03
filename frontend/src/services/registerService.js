import client from "../api/axiosInstance";

export const registerUser = (data) => client.post("/api/register", data);