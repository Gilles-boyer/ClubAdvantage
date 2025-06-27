import client from "../api/axiosInstance";

// GET le profil de l'utilisateur connecté
export const displayProfil = () => client.get("/api/user/me");

// PUT pour mettre à jour prénom/nom
// export const updateProfil = (data) => client.put("/user/me", data);
export const updateProfil = (data) => client.patch("/api/user/me", data, {withCredentials: true});

// PUT pour changer le mot de passe
export const updatePassword = (data) => client.put("/api/password", {
  current_password: data.current_password,
  new_password: data.new_password,
  new_password_confirmation: data.confirm_password,
});

// DELETE pour désactiver son propre compte
export const deleteProfil = () => client.delete("/api/me");
