import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import { addUserThunk, fetchUsers, listOfUsers, updateUserThunk, deleteUserThunk } from "../../store/slices/userSlice";
import ToastAlert from './../ToastAlert'
import Button from "../Button";

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(listOfUsers)
    const [updtUser, setUpdtUser] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [toast, setToast] = useState('')
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])



    const handleAdd = async (newUser) => {
        try {
            if (newUser.id) {
                await dispatch(updateUserThunk({ id: newUser.id, data: newUser })).unwrap()
                setToast({ show: true, message: "Utilisateur mis à jour avec succès", type: 'success' })
            } else {
                await dispatch(addUserThunk(newUser)).unwrap()
                setToast({ show: true, message: "Utilisateur ajouté avec succès", type: 'success' })
            }
            setUpdtUser(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
            // setToast({ show: true, message: "Erreur lors de l'opération", type: 'error' })
            setToast({ show: true, message: err.toString(), type: 'error' })
        }
    };

    const handleToUpdate = async (userToEdit) => {
        console.table(userToEdit);
        setUpdtUser(userToEdit)
    }
    const handleCancelUpdate = () => {
        setUpdtUser(null)
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteUserThunk(id)).unwrap()
            setToast({ show: true, message: "Utilisateur supprimé avec succès", type: 'success' })
        } catch (err) {
            console.error("Erreur on DELETE :", err);
            setToast({ show: true, message: "Erreur lors de la supression de l'utilisateur", type: 'error' })
        }
    };
    return (
        <>
            <div className="flex items-center gap-6 mt-20 mb-4">
                <div className="flex-grow border-t border-neutral"></div>
                <h2 className="text-2xl font-semibold text-gray-700">Utilisateurs</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>

            <section className="pt-5 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <Button label={'Ajouter un Utilisateur'} onAction={() => setToggle(!toggle)}
                        className={'btn-neutral hover:btn-secondary mb-2 md:mb-0'} />
                </div>
                {toggle && (
                    <UsersForm onAddUser={handleAdd}
                        onEditUser={updtUser}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        onCancel={handleCancelUpdate} />)}
                <UsersTable users={users}
                    onUpdate={handleToUpdate}
                    onDelete={handleDelete}
                    setToggle={setToggle}
                    setEditMode={setEditMode} />
            </section>
            <ToastAlert toast={toast} setToast={setToast} />
        </>

    );
}
