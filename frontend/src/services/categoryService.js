import client from "../api/axiosInstance";

export const displayCategories = () => {
  return client.get("/categories"); 
};

export const createCategory = (nameCategory) => {
    console.log("Contenu envoyé :", nameCategory);
  return client.post("/categories", nameCategory);
};

export const deleteCategory = (id) => {
  return client.delete(`/categories/${id}`);
};
