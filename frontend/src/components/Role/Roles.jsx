import { useEffect, useState } from "react";
import RolesForm from "./RolesForm";
import { } from "../../services/rolesService";
import RoleTable from "./RoleTable";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, listOfRoles, updateRoleThunk, deleteRoleThunk, addRoleThunk } from "../../store/slices/rolesSlice";

export default function Roles() {
    const roles = useSelector(listOfRoles)
    const [toUpdateRole, setToUpdateRole] = useState(null);
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])


    const handleAddRole = async (newRole) => {
        try {
            if (newRole.id) {
                await dispatch(updateRoleThunk({ id: newRole.id, data: newRole })).unwrap()
            } else {
                await dispatch(addRoleThunk(newRole)).unwrap()
            }
            setToUpdateRole(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
        }
    };


    const handleUpdate = (roleToEdit) => {
        setToUpdateRole(roleToEdit)
    };


    const handleDelete = async (id) => {
        try {
            await dispatch(deleteRoleThunk(id)).unwrap()
        } catch (err) {
            console.error("Erreur DELETE :", err);
        }
    };

    return (
        <>
            <h1 className="text-center text-2xl font-semibold my-4">Liste des rôles</h1>
            <div className='flex w-fit'>
                <Button action={'Ajouter un Role'} onAction={() => setToggle(!toggle)} className={'btn-secondary uppercase btn-md text-xs hover:btn-primary'}/>
            </div>
            {toggle && (<RolesForm onAddRole={handleAddRole} onEditRole={toUpdateRole} /> )}

            <section className="overflow-x-auto">
                <RoleTable roles={roles} onUpdate={handleUpdate} onDelete={handleDelete} setToggle={setToggle}/>
            </section>
        </>
    );
}
