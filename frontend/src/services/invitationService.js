import client from "../api/axiosInstance";
export const sendInvitation = (payload) =>
  client.post("/api/invitations", payload);