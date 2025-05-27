import { useEffect, useState } from "react";
import ProfilsForm from "./ProfilsForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountButton from "../DeleteAccountButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; // ← Import du générateur de QR code
import { fetchCurrentUser } from "../../services/usersService";

export default function Profils() {
    const [profil, setProfil] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    // Récupération de l'utilisateur connecté via /api/me
    useEffect(() => {
        // Simulation d’un profil utilisateur fictif
        fetchCurrentUser().then( res => setProfil(res.data.data))
    }, []);
    
{!editMode && (
    <div className="mt-6 text-center">
        <p className="font-medium mb-2">🎟️ Mon QR Code personnel</p>
        <QRCode value={String(profil.id)} size={180} />
        <p className="text-xs mt-2 text-gray-500">Présentez ce QR code au staff pour être scanné.</p>
    </div>
)}

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
                <DeleteAccountButton onDelete={handleDelete} />
            </div>
        </div>
    );
}
