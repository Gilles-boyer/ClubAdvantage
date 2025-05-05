import client from "../api/axiosInstance";

export const getMembers = () => {
  return client.get("/members"); 
};

export const createMember = (lastName, FirstName, email, telephone, status) => {
  return client.post("/members", lastName, FirstName, email, telephone, status);
};

export const deleteMember= (id) => {
  return client.delete(`/members/${id}`);
};
