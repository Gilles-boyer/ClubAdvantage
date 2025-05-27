import { createContext } from "react";

export const UserContext = createContext({
  user: null,         // Utilisateur connecté (objet)
  setUser: () => {}   // Fonction pour le modifier
});
