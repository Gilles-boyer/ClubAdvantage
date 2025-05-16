import { useState } from "react";
import Icon from "@mdi/react";
import { mdilAlert } from "@mdi/light-js";
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

export default function PasswordForm({ onUpdatePassword }) {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.current_password || !form.new_password || !form.confirm_password) {
      return setError("Tous les champs sont obligatoires.");
    }

    if (form.new_password !== form.confirm_password) {
      return setError("Les mots de passe ne correspondent pas.");
    }

    if (form.new_password.length < 8) {
      return setError("Le mot de passe doit contenir au moins 8 caractères.");
    }

    setError("");
    onUpdatePassword(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mt-6 bg-white shadow">
      <h3 className="text-lg font-bold mb-4 text-center">Changer le mot de passe</h3>

      {/* Mot de passe actuel */}
      <Textbox
        type="password"
        value={form.current_password}
        placeholder="Mot de passe actuel"
        onChange={(val) => handleChange("current_password", val)}
        attributesInput={{
          name: "current_password",
          className: "input input-bordered w-full mb-3",
        }}
      />

      {/* Nouveau mot de passe */}
      <Textbox
        type="password"
        value={form.new_password}
        placeholder="Nouveau mot de passe"
        onChange={(val) => handleChange("new_password", val)}
        attributesInput={{
          name: "new_password",
          className: "input input-bordered w-full mb-3",
        }}
        />

      {/* Confirmation */}
      <Textbox
        type="password"
        value={form.confirm_password}
        placeholder="Confirmer le mot de passe"
        onChange={(val) => handleChange("confirm_password", val)}
        attributesInput={{
          name: "confirm_password",
          className: "input input-bordered w-full mb-3",
        }}
      />

      {/* Erreur affichée */}
      {error && (
        <div className="text-red-700 flex justify-center items-center mt-2">
          <Icon path={mdilAlert} size={1} />
          <p className="ps-2 text-sm">{error}</p>
        </div>
      )}

      <button type="submit" className="btn btn-neutral w-full mt-4">
        Valider
      </button>
    </form>
  );
}
