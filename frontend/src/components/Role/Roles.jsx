import { useEffect, useState } from "react";
import RolesForm from "./RolesForm";
import UpdateButton from "../UpdateButton";
import DeleteButton from "../DeleteButton";
import {displayRoles, createRole, updateRole, deleteRole, } from "../../services/rolesService";

export default function Roles() {
    // On stocke la liste des rôles récupérés depuis l'API
    const [roles, setRoles] = useState([]);
    // Pour savoir quel rôle est en cours de modification
    const [toUpdateRole, setToUpdateRole] = useState(null);

    // À l'affichage de la page, on récupère les rôles depuis l'API
    useEffect(() => {
        displayRoles()
            .then(res => setRoles(res.data.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    // Fonction appelée quand on ajoute ou modifie un rôle
    const handleAddRole = async (newRole) => {
        try {
            if (newRole.id) {
                // Si le rôle a déjà un id, on le modifie
                const res = await updateRole(newRole.id, newRole);
                setRoles((prev) =>
                prev.map((r) => (r.id === newRole.id ? res.data.data : r))
                );
            } else {
                // Sinon, on le crée
                const res = await createRole(newRole);
                setRoles((prev) => [...prev, res.data.data]);
            }
            // Réinitialise le champ de modification
            setToUpdateRole(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
        }
    };

    // On prépare un rôle pour le modifier (rempli le formulaire)
    const handleToUpdate = (roleToEdit) => {
        setToUpdateRole(roleToEdit);
    };


    // Supprime un rôle
    const handleDelete = async (id) => {
        try {
            await deleteRole(id);
            setRoles((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Erreur DELETE :", err);
        }
    };

    return (
        <>
            <RolesForm onAddRole={handleAddRole} onEditRole={toUpdateRole} />

            <h1 className="text-center text-2xl font-semibold my-4">Liste des rôles</h1>
            <section className="overflow-x-auto mx-auto w-175 rounded-2xl">
                <table className="table w-150 rounded shadow-md">
                    <thead>
                        <tr className="bg-primary text-white uppercase">
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2">{role.name}</td>
                            <td className="px-4 py-2 flex gap-2">
                            <UpdateButton item={role} onUpdate={handleToUpdate} />
                            <DeleteButton id={role.id} onDelete={handleDelete} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
