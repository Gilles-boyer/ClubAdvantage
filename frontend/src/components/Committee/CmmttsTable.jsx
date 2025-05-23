import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function CmmttsTable({committees, onUpdate, onDelete}) {
    return (
        <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
            <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-2">Nom</th>
                        <th className="px-4 py-2">Renouvellement Auto</th>
                        <th className="px-4 py-2">Date début inscription</th>
                        <th className="px-4 py-2">Date fin d'inscirption</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {committees.map((committee) => (
                        <tr
                            key={committee.id}
                            className="border-t hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-4 py-2 font-medium bg-accent">{committee.name}</td>
                            <td className="px-4 py-2 font-medium text-center">
                                <button
                                    className={`py-1 px-3 rounded text-white w-20 hover:cursor-pointer ${committee.auto_renew ? "bg-indigo-800" : "bg-orange-400"
                                        }`}
                                >
                                    {committee.auto_renew ? "Actif" : "Inactif"}
                                </button></td>
                            <td className="px-4 py-2 font-medium text-center">{committee.agreement_start_date}</td>
                            <td className="px-4 py-2 font-medium text-center">{committee.agreement_end_date}</td>
                            <td className="px-4 py-2 space-x-2 bg-accent">
                                <UpdateButton onUpdate={() => onUpdate(committee)} />
                                <DeleteButton onDelete={() => onDelete(committee.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}