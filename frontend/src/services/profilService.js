import client from "../api/axiosInstance";

// GET le profil de l'utilisateur connecté
export const displayProfil = () => client.get("/me");

// PUT pour mettre à jour prénom/nom/email
export const updateProfil = (data) => client.put("/me", data);

// PUT pour changer le mot de passe
export const updatePassword = (data) => client.put("/password", {
  current_password: data.current_password,
  new_password: data.new_password,
  new_password_confirmation: data.confirm_password,
});

// DELETE pour désactiver son propre compte
export const deleteProfil = () => client.delete("/me");
