import { useEffect, useState } from "react";
import ProfilsForm from "./ProfilsForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountButton from "../DeleteAccountButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilThunk } from "../../store/slices/profilSlice";
import { fetchAuthUser, selectAuth } from "../../store/slices/authSlice";
export default function Profils() {
    const profil = useSelector(selectAuth);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Récupération de l'utilisateur connecté via /api/me
    useEffect(() => {
        dispatch(fetchAuthUser());
    }, [dispatch]);

    // Mise à jour des informations de profil
    const handleUpdate = (data) => {
        console.log('Valeurs envoyées :', data);
        
        dispatch(updateProfilThunk(data))
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

    console.log("Valeur du profil", profil);
    
    if (!profil || profil.data) {
        return <>
            <p className="text-center mt-10 text-gray-500">Chargement du profil...</p>
            <pre>{JSON.stringify(profil, null, 2)}</pre>
        </>;
    }



    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-accent shadow rounded">
            <h1 className="text-2xl font-bold text-center mb-6">Mon Profil</h1>

            {editMode ? (
                <ProfilsForm profil={profil} onSubmit={handleUpdate} setEditMode={setEditMode} />
            ) : (
                <>
                    <div className="card">
                        <div className="card-body p-5 bg-white rounded border">
                            <p className="uppercase">Nom : <span>{profil.last_name}</span></p>
                            <p className="uppercase">Prénom : <span className="capitalize">{profil.first_name}</span></p>
                            <p className="uppercase">Email : <span className="lowercase">{profil.email}</span></p>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
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
