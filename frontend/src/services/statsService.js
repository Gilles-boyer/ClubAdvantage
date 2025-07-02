import client from "../api/axiosInstance";

export const fetchStats = () => client.get("/api/stats");
