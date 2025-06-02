import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import { addUserThunk, fetchUsers, listOfUsers, updateUserThunk, deleteUserThunk } from "../../store/slices/userSlice";

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(listOfUsers)
    const [updtUser, setUpdtUser] = useState(null)
    const [toggle, setToggle] = useState(false)


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
        <div className="shadow-lg pb-5 my-10">
            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins bg-accent py-3 w-full mx-auto">
                Utilisateurs
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <button onClick={() => setToggle(!toggle)} className='btn btn-secondary uppercase font-medium text-xs hover:bg-primary hover:text-white'>Ajouter un utilisateur</button>
                </div>
                {toggle && (
                <UsersForm onAddUser={handleAdd} onEditUser={updtUser}/>)}
                <UsersTable users={users} onUpdate={handleToUpdate} onDelete={handleDelete} setToggle={setToggle}/>
            </section>
        </div>

    );
}
