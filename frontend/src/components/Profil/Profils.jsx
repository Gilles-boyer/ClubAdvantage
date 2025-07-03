import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QRCode from "react-qr-code";

import ProfilsForm           from "./ProfilsForm";
import PasswordForm          from "./PasswordForm";
import DeleteAccountButton   from "../DeleteAccountButton";
import ToastAlert            from "../ToastAlert";

import { updateProfilThunk } from "../../store/slices/profilSlice";
import { fetchAuthUser, selectAuth } from "../../store/slices/authSlice";
import { fetchQrPayload } from "../../services/qrService"; // service axios pour récupérer la valeur du QR-Code

function UserQr({ value, size = 128 }) {
  if (!value) return null;               // rien à afficher tant qu’on n'a pas la valeur
  return (
    <div className="mx-auto my-4 w-32">
      <QRCode
        value={value}
        size={size}
        style={{ width: "100%", height: "auto" }}
        aria-label="QR-Code identifiant l’utilisateur"
      />
    </div>
  );
}

export default function Profils() {
    const profil      = useSelector(selectAuth);   // { id, last_name, first_name, email, … }
    const dispatch    = useDispatch();
    const navigate    = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [toast,    setToast]    = useState({ show: false, message: "", type: "" });
    
    /* ───── 1) Charge ou recharge l’utilisateur connecté ───── */
    useEffect(() => { dispatch(fetchAuthUser()); }, [dispatch]);

    const [qrValue, setQrValue] = useState("");
    useEffect(() => {
        fetchQrPayload()            // ← ton service axios
        .then(setQrValue)
        .catch(() => setQrValue(""));
    }, []);
    
    // Mise à jour des informations de profil
    const handleUpdate = async (data) => {
        try {
        await dispatch(updateProfilThunk(data)).unwrap();
        dispatch(fetchAuthUser());
        setToast({ show: true, message: "Profil mis à jour ✅", type: "success" });
        setEditMode(false);
        } catch (err) {
        console.error(err);
        setToast({ show: true, message: "Erreur lors de la mise à jour", type: "error" });
        }
    };

    // Changement du mot de passe
    const handlePasswordChange = (data) => {
        axios.put("/api/password", {
            current_password:        data.current_password,
            new_password:            data.new_password,
            new_password_confirmation: data.confirm_password,
        })
            .then(()   => alert("Mot de passe modifié"))
            .catch(() => alert("Erreur lors du changement de mot de passe"));
    };

    // Suppression du compte
    const handleDelete = () => {
        axios.delete("/api/me")
            .then(()   => { alert("Compte désactivé"); navigate("/login"); })
            .catch(() => alert("Erreur suppression du compte"));
    };
    
    if (!profil || profil.data) {
        return (
            <p className="text-center mt-10 text-gray-500">Chargement du profil…</p>
        );
    }

    return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-accent shadow rounded">
        <h1 className="text-2xl font-bold text-center mb-6">Mon Profil</h1>

        {editMode ? (
          <ProfilsForm
            profil={profil}
            onSubmit={handleUpdate}
            setEditMode={setEditMode}
          />
        ) : (
          <>
            <div className="card">
              <div className="card-body p-5 bg-white rounded border">
                <p className="uppercase">Nom&nbsp;: <span>{profil.last_name}</span></p>
                <p className="uppercase">Prénom&nbsp;: <span className="capitalize">{profil.first_name}</span></p>
                <p className="uppercase">Email&nbsp;: <span className="lowercase">{profil.email}</span></p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button onClick={() => setEditMode(true)} className="btn btn-neutral">
                Modifier mes infos
              </button>
            </div>
          </>
        )}

        {/* QR-Code perso */}
        <UserQr value={qrValue} size={128} />

        {/* Changement de mot de passe */}
        <PasswordForm onUpdatePassword={handlePasswordChange} />

        {/* Suppression du compte */}
        <div className="mt-6 text-center">
          <DeleteAccountButton onDelete={handleDelete} />
        </div>
      </div>

      <ToastAlert toast={toast} setToast={setToast} />
    </>
  );
}
