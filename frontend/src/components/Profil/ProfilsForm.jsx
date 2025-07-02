import { useState, useEffect } from "react";

/**
 * Formulaire de modification des informations utilisateur (Prénom, Nom, Email).
 * Les champs sont initialisés à partir de la prop "profil".
 * Lors de la soumission, les données sont validées et transmises via la prop "onSubmit".
 */

export default function ProfilsForm({ profil, onSubmit, setEditMode }) {
    // État local pour stocker les valeurs du formulaire
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    // État pour les messages d'erreurs par champ
    const [errors, setErrors] = useState({});

    // Pré-remplit les champs avec les données de l'utilisateur reçu via "profil"
    useEffect(() => {
        if (profil) {
            setForm({
                first_name: profil.first_name || "",
                last_name: profil.last_name || "",
                email: profil.email || "",
            });
        }
    }, [profil]);

    // Met à jour le champ correspondant quand l'utilisateur modifie un input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Réinitialise le message d’erreur dès que l’utilisateur commence à corriger
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Objet temporaire pour stocker les erreurs détectées
        const newErrors = {};
        if (!form.first_name.trim()) newErrors.first_name = "Le prénom est obligatoire.";
        if (!form.last_name.trim()) newErrors.last_name = "Le nom est obligatoire.";

        // S'il y a des erreurs, on les affiche et on arrête la soumission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Sinon, on vide les erreurs et on envoie les données
        setErrors({})
        onSubmit(form);
    };

    // Affichage du formulaire
    return (
        <form onSubmit={handleSubmit} className="w-full border rounded-md p-4 mx-auto bg-white shadow-md mt-6">
            <h3 className="uppercase font-medium text-center bg-primary text-white py-2 rounded mb-4">
                Modifier mes informations
            </h3>
            {/* Champ prénom */}
            <div className="form-control mb-4">
                <label htmlFor="first_name"> Prénom </label>
                <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Prénom"
                    className="input input-bordered w-full"
                />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
            </div>

            {/* Champ nom */}
            <div className="form-control mb-4">
                <label htmlFor="last_name"> Nom </label>
                <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="input input-bordered w-full"
                />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-center space-x-5">
                <button type="submit" className="btn btn-neutral w-30">
                    Valider
                </button>
                <button onClick={() => setEditMode(false)} className="btn btn-neutral w-30">
                    Annuler
                </button>
            </div>
        </form>
    );
}
