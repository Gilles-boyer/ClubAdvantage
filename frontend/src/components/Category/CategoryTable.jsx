import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function CategoryTable({ categories, onDelete, onUpdate, onUpStatus }) {
    return (
        <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
            <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-2">Nom</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Statut</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-t hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2 font-medium bg-accent">{category.name}</td>
                            <td className="px-4 py-2">{category.description}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => onUpStatus(category.id)}
                                    className={`py-1 px-3 rounded text-white w-20 hover:cursor-pointer ${category.is_active ? "bg-indigo-800" : "bg-orange-400"
                                        }`}
                                >
                                    {category.is_active ? "Actif" : "Inactif"}
                                </button>
                            </td>
                            <td className="px-4 py-2 space-x-2 bg-accent">
                                <UpdateButton item={category} onUpdate={() => onUpdate(category)} />
                                <DeleteButton id={category.id} onDelete={() => onDelete(category.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}