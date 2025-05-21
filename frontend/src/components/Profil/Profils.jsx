import { useEffect, useState } from "react";
import ProfilsForm from "./ProfilsForm";
import PasswordForm from "./PasswordForm";
import DeleteButton from "../DeleteButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profils() {
    const [profil, setProfil] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    // Récupération de l'utilisateur connecté via /api/me
    useEffect(() => {
    //     axios.get("/api/me")
    //         .then((res) => {
    //             // Si res.data contient l'utilisateur directement :
    //             const user = res.data.data;
    //             if (user?.id) {
    //                 setProfil(user);
    //             } else {
    //                 console.warn("Structure inattendue de /api/me :", res.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Erreur chargement profil :", err);
    //             if (err.response?.status === 401) navigate("/login");
    //         });

axios.get("/api/me")
  .then((res) => {
    const user = res.data.data;
    if (user?.id) setProfil(user);
    else console.warn("Données utilisateur absentes");
  })
  .catch((err) => {
    if (err.response) {
      console.error("Erreur API : ", err.response.status, err.response.data);
    } else {
      console.error("Erreur inconnue : ", err);
    }
  });

    }, []);

    // Mise à jour des informations de profil
    const handleUpdate = (data) => {
        axios.put("/api/profile", data)
            .then((res) => {
                const updatedUser = res.data.data;
                setProfil(updatedUser);
                setEditMode(false);
                alert("Profil mis à jour !");
            })
            .catch(() => alert("Erreur lors de la mise à jour"));
    };

    // Changement du mot de passe
    const handlePasswordChange = (data) => {
        axios.put("/api/password", {
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.confirm_password,
        })
            .then(() => alert("Mot de passe modifié"))
            .catch(() => alert("Erreur lors du changement de mot de passe"));
    };

    // Suppression du compte
    const handleDelete = () => {
        axios.delete("/api/me")
            .then(() => {
                alert("Compte désactivé");
                navigate("/login");
            })
            .catch(() => alert("Erreur suppression du compte"));
    };

    if (!profil) return <p className="text-center mt-10 text-gray-500">Chargement du profil...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold text-center mb-6">Mon Profil</h1>

            {editMode ? (
                <ProfilsForm profil={profil} onSubmit={handleUpdate} />
            ) : (
                <>
                    <p><strong>Prénom :</strong> {profil.first_name}</p>
                    <p><strong>Nom :</strong> {profil.last_name}</p>
                    <p><strong>Email :</strong> {profil.email}</p>

                    <div className="mt-4">
                        <button onClick={() => setEditMode(true)} className="btn btn-neutral">
                            Modifier mes infos
                        </button>
                    </div>
                </>
            )}

            {/* Formulaire de changement de mot de passe */}
            <PasswordForm onUpdatePassword={handlePasswordChange} />

            {/* Suppression du compte */}
            <div className="mt-6 text-center">
                <DeleteButton onDelete={handleDelete} />
            </div>
        </div>
    );
}
