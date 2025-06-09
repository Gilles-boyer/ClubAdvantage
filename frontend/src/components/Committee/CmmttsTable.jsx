import { useState } from "react";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function CmmttsTable({ committees, onUpdate, onDelete, setToggle }) {
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
            <div className="overflow-x-auto hidden md:block">
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
                        <thead className="bg-secondary text-white uppercase tracking-wider">
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
                                            className={`badge badge-lg w-20 text-white ${committee.auto_renew ? "badge-info" : "badge-warning"
                                                }`}
                                        >
                                            {committee.auto_renew ? "Actif" : "Inactif"}
                                        </button></td>
                                    <td className="px-4 py-2 font-medium text-center">{committee.agreement_start_date}</td>
                                    <td className="px-4 py-2 font-medium text-center">{committee.agreement_end_date}</td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton onUpdate={() => {
                                            setToggle(true);
                                            onUpdate(committee);
                                        }} />
                                        <DeleteButton onDelete={() => onDelete(committee.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </div>
            <article className="block md:hidden space-y-5">
                {committees.map((committee) => (
                    <div key={committee.id} className="card bg-accent w-80vw card-xs shadow-xl">
                        <div className="flex bg-secondary items-center justify-between py-1 rounded-md">
                            <h3 className="card-title font-medium py-1 text-base rounded ps-2">{committee.name}</h3>
                            <div className="space-x-2">
                                <button
                                    className={`badge badge-md me-2 ${committee.auto_renew ? "badge-info" : "badge-warning"
                                        }`}
                                >
                                    {committee.auto_renew ? "Actif" : "Inactif"}
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="flex">
                                <p className="text-sm">
                                    <span className="font-medium">Date de début : </span>
                                    {committee.agreement_start_date}</p><p className="text-sm">
                                    <span className="font-medium">Date de fin: </span>
                                    {committee.agreement_end_date}</p>
                            </div>


                            <div className="card-action flex space-x-2 mt-2">
                                <div className="flex mt-0 md:mt-2 space-x-2">
                                    <UpdateButton
                                        onUpdate={() => {
                                            setToggle(true);
                                            onUpdate(committee);
                                        }}
                                    />
                                    <DeleteButton onDelete={() => onDelete(committee.id)} />
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </article>
        </>
    )
}