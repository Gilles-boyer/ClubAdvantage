import { useState } from "react";

/**
 * Formulaire de changement de mot de passe
 * Reçoit une fonction onUpdatePassword pour envoyer les données
*/
export default function PasswordForm({ onUpdatePassword }) {
    
    // États pour afficher / masquer les mots de passe
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // États pour les champs
    const [form, setForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    // États pour les erreurs
    const [errors, setErrors] = useState({});

    // Validation + envoi
    const handleSubmit = (e) => {
        e.preventDefault();
                    
        const newErrors = {};
        if (!form.current_password) newErrors.current_password = "Mot de passe actuel requis.";
        if (!form.new_password) newErrors.new_password = "Nouveau mot de passe requis.";
        if (form.new_password.length < 8) newErrors.new_password = "Le mot de passe doit contenir au moins 8 caractères.";
        if (form.new_password !== form.confirm_password) newErrors.confirm_password = "Les mots de passe ne correspondent pas.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onUpdatePassword(form); // Envoie les données validées
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-4 border rounded bg-white">
            <h3 className="text-lg font-bold text-center"> Changer le mot de passe </h3>

            {/* Champ : mot de passe actuel */}
            <div className="relative">
                <input
                    type={showCurrent ? "text" : "password"}
                    name="current_password"
                    value={form.current_password}
                    onChange={(e) => setForm({ ...form, current_password: e.target.value })}
                    placeholder="Mot de passe actuel"
                    className="input input-bordered w-full pr-10"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
                    onClick={() => setShowCurrent(!showCurrent)}
                    title="Afficher / masquer"
                >
                    {showCurrent ? "🙈" : "👁️"}
                </button>
                {errors.current_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                )}
            </div>

            {/* Champ : nouveau mot de passe */}
            <div className="relative">
                <input
                    type={showNew ? "text" : "password"}
                    name="new_password"
                    value={form.new_password}
                    onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                    placeholder="Nouveau mot de passe"
                    className="input input-bordered w-full pr-10"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
                    onClick={() => setShowNew(!showNew)}
                    title="Afficher / masquer"
                >
                    {showNew ? "🙈" : "👁️"}
                </button>
                {errors.new_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
                )}
            </div>

            {/* Champ : confirmation */}
            <div className="relative">
                <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                    placeholder="Confirmer le mot de passe"
                    className="input input-bordered w-full pr-10"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
                    onClick={() => setShowConfirm(!showConfirm)}
                    title="Afficher / masquer"
                >
                    {showConfirm ? "🙈" : "👁️"}
                </button>
                {errors.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                )}
            </div>
                
            {/* Bouton de validation */}
            <button type="submit" className="btn btn-neutral w-full">
                Valider
            </button>
        </form>
    );
}
