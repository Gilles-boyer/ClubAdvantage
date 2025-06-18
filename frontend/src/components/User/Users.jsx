import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import { addUserThunk, fetchUsers, listOfUsers, updateUserThunk, deleteUserThunk } from "../../store/slices/userSlice";
import ToastAlert from './../ToastAlert'
import Button from "../Button";
import { listOfCommittees } from "../../store/slices/CommitteeSlice";

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(listOfUsers)
    const committees = useSelector(listOfCommittees)
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

    const canceledEdit = () => {
        setUpdtUser(null)
    }
    const handleToUpdate = async (userToEdit) => {
        setUpdtUser(userToEdit)
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

            <section className="pt-5 max-w-5xl mx-auto" id="userForm">
                <div className='flex w-fit'>
                    <Button label={'Ajouter un Utilisateur'} onAction={() => setToggle(!toggle)}
                        className={'btn-neutral hover:btn-secondary mb-2 md:mb-0'} />
                </div>
                {toggle && (
                    <UsersForm
                        committees={committees}
                        onAddUser={handleAdd}
                        onEditUser={updtUser}
                        setToggle={setToggle}
                        onCancel={canceledEdit} />)}
                <UsersTable users={users}
                    committees={committees}
                    onUpdate={handleToUpdate}
                    onDelete={handleDelete}
                    setToggle={setToggle} />
            </section>
            <ToastAlert toast={toast} setToast={setToast} />
        </>

    );
}
