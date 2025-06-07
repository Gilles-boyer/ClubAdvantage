import UpdateButton from "../UpdateButton"
import DeleteButton from "../DeleteButton"

export default function RoleTable({ roles, onUpdate, onDelete }) {
    return (
        <>
            <div className="overflow-x-auto border rounded-xl bg-white">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                        <tr className="bg-primary text-white uppercase">
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}  className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2">{role.name}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <UpdateButton item={role} onUpdate={() => onUpdate(role)} />
                                    <DeleteButton id={role.id} onDelete={() => onDelete(role.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}