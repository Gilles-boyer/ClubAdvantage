import client from "../api/axiosInstance";

export const getMembers = () => {
  return client.get("/api/members"); 
};

export const createMember = (lastName, FirstName, email, telephone, status) => {
  return client.post("/api/members", lastName, FirstName, email, telephone, status);
};

export const deleteMember= (id) => {
  return client.delete(`/api/members/${id}`);
};
