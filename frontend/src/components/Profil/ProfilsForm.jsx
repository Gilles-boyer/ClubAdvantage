import { useState } from "react";

export default function ProfilsForm({ profil, onSubmit }) {
    const [form, setForm] = useState({
        first_name: profil.first_name || "",
        last_name: profil.last_name || "",
        email: profil.email || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <label className="block font-semibold mb-1">Prénom</label>
            <input
                name="first_name"
                className="w-full mb-4 p-2 border rounded"
                value={form.first_name}
                onChange={handleChange}
            />

            <label className="block font-semibold mb-1">Nom</label>
            <input
                name="last_name"
                className="w-full mb-4 p-2 border rounded"
                value={form.last_name}
                onChange={handleChange}
            />

            <label className="block font-semibold mb-1">Email</label>
            <input
                name="email"
                type="email"
                className="w-full mb-4 p-2 border rounded"
                value={form.email}
                onChange={handleChange}
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Enregistrer
            </button>
        </form>
    );
}
