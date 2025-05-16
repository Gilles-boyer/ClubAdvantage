import { useState } from "react";

export default function PasswordForm({ onUpdatePassword }) {
    const [form, setForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.new_password !== form.confirm_password) {
        return setError("Les mots de passe ne correspondent pas !");
        }
        onUpdatePassword(form);
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded mt-6 bg-white shadow">
        <h3 className="text-lg font-bold mb-2">Changer le mot de passe</h3>

        <input
            type="password"
            name="current_password"
            placeholder="Mot de passe actuel"
            value={form.current_password}
            onChange={handleChange}
            className="input input-bordered w-full mb-3"
        />

        <input
            type="password"
            name="new_password"
            placeholder="Nouveau mot de passe"
            value={form.new_password}
            onChange={handleChange}
            className="input input-bordered w-full mb-3"
        />

        <input
            type="password"
            name="confirm_password"
            placeholder="Confirmer le mot de passe"
            value={form.confirm_password}
            onChange={handleChange}
            className="input input-bordered w-full mb-3"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="btn btn-neutral w-full">Valider</button>
        </form>
    );
}
