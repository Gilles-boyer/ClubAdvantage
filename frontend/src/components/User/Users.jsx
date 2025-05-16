import { displayUsers, createUser, updateUser, deleteUser } from "../../services/usersService";
import { useEffect, useState } from "react";
import UsersForm from "./UsersForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [updtUser, setUpdtUser] = useState(null)

    useEffect(() => {
        displayUsers()
            .then(res => setUsers(res.data.data))
            .catch(err => console.log('Error CREATE/UPDATE :', err)
            )
    })


    const handleAdd = async (newUser) => {
        try {
            if (newUser.id) {

                const res = await updateUser(newUser.id, newUser);
                setUsers((prev) =>
                    prev.map((u) => (u.id === newUser.id ? res.data.data : u))
                );
            } else {

                const res = await createUser(newUser);
                setUsers((prev) => [...prev, res.data.data]);
            }

            setUpdtUser(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE role :", err);
        }
    };

    // const handleStatus = async () => {

    // };


    const handleToUpdate = (userToEdit) => {
        setUpdtUser(userToEdit)
    }

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            console.error("Erreur on DELETE :", err);
        }
    };
    return (
        <>
            <UsersForm onAddUser={handleAdd} onEditUser={updtUser}/>
            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins">
                Utilisateurs Existants
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <div className="overflow-x-auto border rounded-xl bg-white">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Prénom</th>
                                <th className="px-4 py-2">CSE</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Mot de passe</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium bg-accent">{user.last_name}</td>
                                    <td className="px-4 py-2">{user.first_name}</td>
                                    <td className="px-4 py-2">{user.committee_name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.password}</td>
                                    <td className="px-4 py-2">{user.status}</td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton
                                            item={user}
                                            onUpdate={handleToUpdate}
                                        />
                                        <DeleteButton id={user.id} onDelete={handleDelete} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>

    );
}
