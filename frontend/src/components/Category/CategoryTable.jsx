import Button from "../Button";
import { useState } from "react";

export default function CategoryTable({ categories, onDelete, onUpdate, onUpStatus, setToggle }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [visibleCards, setVisibleCards] = useState(3)

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

    const mobileView = categories.slice(0, visibleCards)
    return (
        <>
            <div className="overflow-x-auto hidden md:block">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input input-bordered my-2 w-full max-w-md hover:ring-secondary hover:ring-1"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="overflow-x-auto border border-secondary rounded-xl bg-white shadow-sm">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-white uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((category) => (
                                <tr key={category.id} className="border-gray-300 border-t hover:bg-gray-100 transition-colors">
                                    <td className="px-4 py-2 font-medium">{category.name}</td>
                                    <td className="px-4 py-2">{category.description}</td>
                                    <td className="px-4 py-2">
                                        <Button label={`${category.is_active ? 'Active' : 'Inactive'}`} 
                                        onAction={() => onUpStatus(category.id)} 
                                        className={`btn-sm w-17 ${category.is_active ? 'btn-info' : 'btn-warning'}`}/>
                                    </td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <Button action={'update'} onAction={() => {
                                            setToggle(true),
                                                onUpdate(category)
                                        }} />
                                        <Button action={'delete'} onAction={() => { onDelete(category.id) }} />
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
                {mobileView.map((category) => (
                    <div key={category.id} className="card bg-accent w-80vw card-xs p-3 shadow-xl border border-secondary">
                        <div className="flex justify-between py-2">
                            <h3 className="card-title font-medium text-lg rounded ps-0.5">{category.name}</h3>
                            <button
                                onClick={() => onUpStatus(category.id)}
                                className={`badge badge-md me-2 hover:cursor-pointer font-medium ${category.is_active ? "badge-info" : "badge-warning"
                                    }`}
                            >
                                {category.is_active ? "Actif" : "Inactif"}
                            </button>
                        </div>
                        <div className="card-body bg-white rounded-md">
                            <p className="text-sm">
                                <span className="font-medium underline">Description :</span>
                                <br />{category.description}</p>

                            <div className="card-action flex space-x-2 mt-2">
                                <div className="flex mt-0 md:mt-2 space-x-2">
                                    <Button action={'update'} onAction={() => {
                                        setToggle(true),
                                            onUpdate(category)
                                    }} />
                                    <Button action={'delete'} onAction={() => { onDelete(category.id) }} />
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
                {visibleCards < categories.length && (
                    <div className="space-x-3 mb-10">
                        <Button label={'voir plus'} onAction={() => setVisibleCards(vc => vc + 3)} className={'btn-neutral'} />
                        <Button label={'voir moins'} onAction={() => setVisibleCards(3)} className={'btn-primary'} />
                    </div>
                )}
            </article>

        </>
    )
}