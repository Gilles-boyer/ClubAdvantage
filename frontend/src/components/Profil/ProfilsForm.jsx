import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdilAlert } from "@mdi/light-js";
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

export default function ProfilsForm({ profil, onSubmit }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [error, setError] = useState("");

  // Pré-remplit les champs avec les infos du profil
  useEffect(() => {
    if (profil) {
      setForm({
        first_name: profil.first_name || "",
        last_name: profil.last_name || "",
        email: profil.email || "",
      });
    }
  }, [profil]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation de base
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      return setError("Tous les champs sont obligatoires.");
    }

    if (form.email.length > 255 || form.first_name.length > 255 || form.last_name.length > 255) {
      return setError("Les champs ne doivent pas dépasser 255 caractères.");
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full border rounded-md p-4 mx-auto bg-white shadow-md mt-6">
      <h3 className="text-lg font-medium text-center bg-primary text-white py-2 rounded mb-4">Modifier mes informations</h3>

      {/* Prénom */}
      <div className="form-control mb-4">
        <label htmlFor="first_name" className="label-text mb-1">Prénom</label>
        <Textbox
          attributesInput={{
            id: "first_name",
            name: "first_name",
            placeholder: "Votre prénom",
            className: "input input-bordered w-full",
          }}
          value={form.first_name}
          onChange={(val) => setForm({ ...form, first_name: val })}
          onBlur={() => {
            if (!form.first_name.trim()) {
              setError("Le prénom est obligatoire.");
            } else {
              setError("");
            }
          }}
        />
      </div>

      {/* Nom */}
      <div className="form-control mb-4">
        <label htmlFor="last_name" className="label-text mb-1">Nom</label>
        <Textbox
          attributesInput={{
            id: "last_name",
            name: "last_name",
            placeholder: "Votre nom",
            className: "input input-bordered w-full",
          }}
          value={form.last_name}
          onChange={(val) => setForm({ ...form, last_name: val })}
          onBlur={() => {
            if (!form.last_name.trim()) {
              setError("Le nom est obligatoire.");
            } else {
              setError("");
            }
          }}
        />
      </div>

      {/* Email */}
      <div className="form-control mb-4">
        <label htmlFor="email" className="label-text mb-1">Email</label>
        <Textbox
          attributesInput={{
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Votre adresse email",
            className: "input input-bordered w-full",
          }}
          value={form.email}
          onChange={(val) => setForm({ ...form, email: val })}
          onBlur={() => {
            if (!form.email.trim()) {
              setError("L'adresse email est obligatoire.");
            } else {
              setError("");
            }
          }}
        />
      </div>

      {/* Affichage d'erreur */}
      {error && (
        <div className="text-red-700 flex justify-center items-center mt-2">
          <Icon path={mdilAlert} size={1} />
          <p className="ps-2 text-sm">{error}</p>
        </div>
      )}

      {/* Bouton */}
      <button type="submit" className="btn btn-neutral w-full mt-4">
        Enregistrer
      </button>
    </form>
  );
}
