import Button from "../Button"

export default function RoleTable({ roles }) {
    return (
        <>
            <div className="overflow-x-auto border rounded-xl bg-white">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                        <tr className="bg-primary text-white uppercase">
                            <th className="px-4 py-2">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}  className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2">{role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}