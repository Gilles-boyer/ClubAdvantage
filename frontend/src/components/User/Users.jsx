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


    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])



    const handleAdd = async (newUser) => {
        try {
            if (newUser.id) {
                await dispatch(updateUserThunk({ id: newUser.id, data: newUser })).unwrap()
                setToast({show: true, message: "Utilisateur mis à jour avec succès", type: 'success'})
            } else {
                await dispatch(addUserThunk(newUser)).unwrap()
                setToast({show: true, message: "Utilisateur ajouté avec succès", type: 'success'})
            }
            setUpdtUser(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
            setToast({show: true, message: "Erreur lors de l'opération", type: 'error'})
        }
    };

    const handleToUpdate = async (userToEdit) => {
         setUpdtUser(userToEdit)
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteUserThunk(id)).unwrap()
            setToast({show: true, message: "Utilisateur supprimé avec succès", type: 'success'})
        } catch (err) {
            console.error("Erreur on DELETE :", err);
            setToast({show: true, message: "Erreur lors de la supression de l'utilisateur", type: 'error'})
        }
    };
    return (
        <div className="shadow-lg pb-5 my-10">
            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins bg-accent py-3 w-full mx-auto">
                Utilisateurs
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <Button 
                    action={'Ajouter un Utilisateur'} 
                    onAction={() => setToggle(true)}
                    className={'btn-secondary uppercase text-xs hover:btn-primary'}
                    />
                </div>
                {toggle && (
                <UsersForm onAddUser={handleAdd} onEditUser={updtUser}/>)}
                <UsersTable users={users} onUpdate={handleToUpdate} onDelete={handleDelete} setToggle={setToggle}/>
            </section>
            <ToastAlert toast={toast} setToast={setToast}/>
        </div>

    );
}
