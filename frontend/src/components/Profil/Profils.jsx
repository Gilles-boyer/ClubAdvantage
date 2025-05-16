import { useEffect, useState } from "react";
import { displayProfils, updateProfil } from "../../services/profilService";
import ProfilsForm from "./ProfilsForm";
import PasswordForm from "./PasswordForm";
import DeleteButton from "../DeleteButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profils() {
    const [profil, setProfil] = useState(null);
    const [toUpdate, setToUpdate] = useState(false);
    const navigate = useNavigate();

    // Récupération des infos de l'utilisateur connecté
    useEffect(() => {
        displayProfils()
            .then((res) => setProfil(res.data))
            .catch((err) => {
                console.error("Erreur GET profil :", err);
                if (err.response?.status === 401) navigate("/login");
            });
    }, []);

    // Mise à jour des infos personnelles
    const handleUpdate = async (updatedData) => {
        try {
            const res = await updateProfil("me", updatedData);
            setProfil(res.data);
            setToUpdate(false);
        } catch (err) {
            console.error("Erreur UPDATE profil :", err);
        }
    };

    // Mise à jour du mot de passe
    const handlePasswordChange = (data) => {
        axios.put("/api/password", {
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.confirm_password,
            })
        .then(() => alert("Mot de passe modifié"))
        .catch(() => alert("Erreur lors du changement"));
    };

    // Désactivation du compte
    const handleDelete = () => {
        axios.delete("/api/me")
            .then(() => {
                alert("Compte désactivé");
                navigate("/login");
            })
            .catch(() => alert("Erreur suppression du compte"));
    };

    if (!profil) return <p className="text-gray-500 text-center mt-10">Chargement du profil...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold text-center mb-6">Mon profil</h1>

            {toUpdate ? (
                <ProfilsForm profil={profil} onSubmit={handleUpdate} />
            ) : (
                <>
                    <p><strong>Prénom :</strong> {profil.first_name}</p>
                    <p><strong>Nom :</strong> {profil.last_name}</p>
                    <p><strong>Email :</strong> {profil.email}</p>

                    <div className="mt-4">
                        <button
                            onClick={() => setToUpdate(true)}
                            className="btn btn-neutral"
                        >
                            Modifier mes infos
                        </button>
                    </div>
                </>
            )}

            {/* Formulaire de changement de mot de passe */}
            <PasswordForm onUpdatePassword={handlePasswordChange} />

            {/* Bouton de désactivation du compte */}
            <div className="mt-6 text-center">
                <DeleteButton onDelete={handleDelete} />
            </div>
        </div>
    );
}