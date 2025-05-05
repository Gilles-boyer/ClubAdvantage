import client from "../api/axiosInstance";

export const getMembers = () => {
  return client.get("/members"); 
};

export const createMember = (lastName, FirstName, email, phone) => {
    alert("Membre Enregistré !");
  return client.post("/members", lastName, FirstName, email, phone);
};

export const deleteMember= (id) => {
  return client.delete(`/members/${id}`);
};
