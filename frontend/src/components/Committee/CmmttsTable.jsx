import { useState } from "react";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function CmmttsTable({ committees, onUpdate, onDelete}) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filtered = committees.filter(com =>
        com.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    return (
        <>
            <div className="overflow-x-auto">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input input-bordered my-2 w-full max-w-md"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
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
                            {paginated.map((committee) => (
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
                <div className="flex justify-evenly items-center mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        className="btn btn-secondary"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </>
    )
}