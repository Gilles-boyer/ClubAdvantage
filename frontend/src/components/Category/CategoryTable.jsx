import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";
import { useState } from "react";

export default function CategoryTable({ categories, onDelete, onUpdate, onUpStatus, setToggle }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase())
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
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((category) => (
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
                                        <UpdateButton onUpdate={() => {
                                            setToggle(true)
                                            onUpdate(category)
                                        }} />
                                        <DeleteButton onDelete={() => onDelete(category.id)} />
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
            </div >
            <article className="block md:hidden space-y-5">
                {categories.map((category) => (
                    <div key={category.id} className="card bg-accent w-80vw card-xs shadow-xl">
                        <div className="flex bg-secondary items-center justify-between py-1 rounded-md">
                        <h3 className="card-title font-medium py-1 text-base rounded ps-2">{category.name}</h3>
                            <button
                                onClick={() => onUpStatus(category.id)}
                                className={`badge badge-md me-2 hover:cursor-pointer ${category.is_active ? "badge-info" : "badge-warning"
                                    }`}
                            >
                                {category.is_active ? "Actif" : "Inactif"}
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="text-sm">
                                <span className="font-medium underline">Description :</span>
                                <br/>{category.description}</p>

                            <div className="card-action flex space-x-2 mt-2">
                                <div className="flex mt-0 md:mt-2 space-x-2">
                                    <UpdateButton
                                        onUpdate={() => {
                                            setToggle(true);
                                            onUpdate(category);
                                        }}
                                    />
                                    <DeleteButton onDelete={() => onDelete(category.id)} />
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </article>

        </>
    )
}