import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import { addUserThunk, fetchUsers, listOfUsers, updateUserThunk, deleteUserThunk } from "../../store/slices/userSlice";

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(listOfUsers)
    const [updtUser, setUpdtUser] = useState(null)


    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])



    const handleAdd = async (newUser) => {
        try {
            if (newUser.id) {
                await dispatch(updateUserThunk({ id: newUser.id, data: newUser })).unwrap()
            } else {
                await dispatch(addUserThunk(newUser)).unwrap()
            }

            setUpdtUser(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
        }
    };

    // const handleStatus = async () => {

    // };


    const handleToUpdate = async (userToEdit) => {
         setUpdtUser(userToEdit)
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteUserThunk(id)).unwrap()
        } catch (err) {
            console.error("Erreur on DELETE :", err);
        }
    };
    return (
        <>
            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins">
                Utilisateurs Existants
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <UsersForm onAddUser={handleAdd} onEditUser={updtUser} />
                <UsersTable users={users} onUpdate={handleToUpdate} onDelete={handleDelete} />
            </section>
        </>

    );
}
