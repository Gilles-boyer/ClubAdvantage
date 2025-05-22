import UpdateButton from "../UpdateButton"
import DeleteButton from "../DeleteButton"

export default function OfferTable({ offers, onUpdate, onDelete, onUpStatus }) {
    return (
        <div className="overflow-x-auto border rounded-xl bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-2">Titre</th>
                        <th className="px-4 py-2">Catégorie</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Statut</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer) => (
                        <tr
                            key={offer.id}
                            className="border-t hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-4 py-2 font-medium bg-accent">{offer.title}</td>
                            <td className="px-4 py-2">{offer.category_name}</td>
                            <td className="px-4 py-2">{offer.description}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => onUpStatus(offer.id)}
                                    className={`py-1 px-3 rounded text-white w-20 hover:cursor-pointer ${offer.is_active ? "bg-indigo-800" : "bg-orange-400"
                                        }`}
                                >
                                    {offer.is_active ? "Actif" : "Inactif"}
                                </button>
                            </td>
                            <td className="px-4 py-2 space-x-2 bg-accent">
                                <UpdateButton
                                    item={offer}
                                    onUpdate={() => onUpdate(offer)}
                                />
                                <DeleteButton id={offer.id} onDelete={() => onDelete(offer.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}