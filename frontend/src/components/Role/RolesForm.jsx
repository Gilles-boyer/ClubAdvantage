import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiAlert } from "@mdi/js";
import { Textbox } from "react-inputs-validation";

export default function RolesForm({ onAddRole, onEditRole }) {
    // Champs du formulaire
    const [roleName, setRoleName] = useState("");
    const [error, setError] = useState("");

    // Préremplit le champ si on modifie un rôle
    useEffect(() => {
        if (onEditRole) {
        setRoleName(onEditRole.name);
        }
    }, [onEditRole]);

    // Réinitialise les champs
    const reset = () => {
        setRoleName("");
        setError("");
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation simple
        if (!roleName.trim()) {
            return setError("Le nom ne peut pas être vide !");
        }

        if (roleName.length > 255) {
            return setError("Le nom ne doit pas dépasser 255 caractères !");
        }

        const newRole = {
            name: roleName,
            is_active: true,
        };

        if (onEditRole?.id !== undefined) {
            newRole.id = onEditRole.id;
        }

        onAddRole(newRole);
        reset();
    };

    return (
        <form className="w-full border rounded-md p-4 mx-auto bg-white shadow-md" onSubmit={handleSubmit}>
            <h3 className="font-poppins text-lg font-medium bg-primary py-1 text-center text-white rounded mb-4">
                {onEditRole ? "Modifier un rôle" : "Ajouter un rôle"}
            </h3>

            <div className="form-control mb-4">
                <label htmlFor="roleName" className="label">
                    <span className="label-text">Nom du rôle</span>
                </label>
                <Textbox
                    attributesInput={{ 
                        id: "roleName", 
                        name: "roleName", 
                        placeholder: "Nom du rôle", 
                        className: "input input-bordered w-full" 
                    }}
                    value={roleName}
                    onChange={(val) => setRoleName(val)}
                    onBlur={() => {
                        if (!roleName.trim()) {
                            setError("Le nom ne peut pas être vide !");
                        } else if (roleName.length > 255) {
                            setError("Le nom ne doit pas dépasser 255 caractères !");
                        } else {
                            setError("");
                        }
                    }}
                />
                {error && (
                <div className="text-red-700 flex justify-center mt-2">
                    <Icon path={mdiAlert} size={1} />
                    <p className="ps-2 text-sm">{error}</p>
                </div>
                )}
            </div>

            <button type="submit" className="btn btn-neutral w-full">
                {onEditRole ? "Modifier" : "Valider"}
            </button>
        </form>
    );
}
