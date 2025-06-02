import UpdateButton from "../UpdateButton"
import DeleteButton from "../DeleteButton"
import { useState } from "react"
import { useLocation } from "react-router-dom"


export default function OfferTable({ offers, onUpdate, onDelete, onUpStatus, setToggle }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const location = useLocation()

    const filtered = offers.filter(off =>
        (off.title + " " + off.description + " " + off.category_name).toLowerCase().includes(search.toLowerCase())
    );
    const isStaffPage = location.pathname === '/offers'
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
            <div className="overflow-x-auto border rounded-xl bg-white">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-2">Titre</th>
                            <th className="px-4 py-2">Catégorie</th>
                            <th className="px-4 py-2">Description</th>
                            {isStaffPage && <>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((offer) => (
                            <tr
                                key={offer.id}
                                className="border-t hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-2 font-medium bg-accent">{offer.title}</td>
                                <td className="px-4 py-2">{offer.category_name}</td>
                                <td className="px-4 py-2">{offer.description}</td>

                                {isStaffPage && <><td className="px-4 py-2">
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
                                            onUpdate={() => {
                                                setToggle(true);
                                                onUpdate(offer);
                                            }}
                                        />
                                        <DeleteButton id={offer.id} onDelete={() => onDelete(offer.id)} />
                                    </td></>}
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
                <span className="text-sm text-gray-600 font-medium">
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
        </div >
    )
}