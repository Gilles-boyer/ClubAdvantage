import UpdateButton from "../UpdateButton"
import DeleteButton from "../DeleteButton"

export default function UsersTable({users, onUpdate, onDelete}) {
    return (
        <>
            <div className="overflow-x-auto border rounded-xl bg-white">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Prénom</th>
                            <th className="px-4 py-2">Email</th>
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
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.status}</td>
                                <td className="px-4 py-2 space-x-2 bg-accent">
                                    <UpdateButton
                                        item={user}
                                        onUpdate={() => onUpdate(user)}
                                    />
                                    <DeleteButton id={user.id} onDelete={() => onDelete(user.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}