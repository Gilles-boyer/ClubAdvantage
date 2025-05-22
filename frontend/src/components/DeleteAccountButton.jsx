import { useState } from "react";

/**
 * Bouton de suppression de compte avec modale de confirmation animée
 * - Affiche une popup avec message d'alerte
 * - Nécessite une prop `onDelete()` pour supprimer le compte
 */
export default function DeleteAccountButton({ onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // Fonction appelée quand l’utilisateur confirme
    const handleConfirm = () => {
        setShowConfirm(false); // Ferme la modale
        onDelete(); // appelle l'action de suppression
    };

    return (
        <div className="text-center mt-8">

            {/* Bouton principal visible */}
            <button className="btn btn-error" onClick={() => setShowConfirm(true)}> Supprimer mon compte </button>

            {/* Modale avec animation d’apparition */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center transform transition-all duration-300 scale-100 opacity-100">
                        <h2 className="text-lg font-semibold text-red-600 mb-2">
                            Êtes-vous sûr ?
                        </h2>
                        <p className="text-gray-600 mb-4">Cette action est irréversible.</p>

                        <div className="flex justify-around mt-4">
                            <button className="btn btn-outline" onClick={() => setShowConfirm(false)} > Annuler </button>
                            <button className="btn btn-error" onClick={handleConfirm} > Oui, supprimer </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
