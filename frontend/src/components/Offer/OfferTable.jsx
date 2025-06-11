import Button from "../Button"
import { useState } from "react"
import { useLocation } from "react-router-dom"


export default function OfferTable({ offers, onUpdate, onDelete, onUpStatus, setToggle }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [visibleCards, setVisibleCards] = useState(3)
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

    const mobileView = offers.slice(0, visibleCards)
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
                <div className="overflow-x-auto border border-secondary rounded-xl bg-white">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-primary text-white uppercase tracking-wider">
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
                                    className="border-gray-300 border-t hover:bg-gray-100 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">{offer.title}</td>
                                    <td className="px-4 py-2">{offer.category_name}</td>
                                    <td className="px-4 py-2">{offer.description}</td>

                                    {isStaffPage && <><td className="px-4 py-2">
                                        <Button label={`${offer.is_active ? 'Active' : 'Inactive'}`}
                                            onAction={() => onUpStatus(offer.is_active)} className={`btn-sm w-17 ${offer.is_active ? 'btn-info' : 'btn-warning'}`} />
                                    </td>
                                        <td className="bg-accent">
                                            <div className="flex justify-evenly">
                                                <Button action={'update'} onAction={() => {
                                                    setToggle(true),
                                                        onUpdate(offer)
                                                }} />
                                                <Button action={'delete'} onAction={() => { onDelete(offer.id) }} />
                                            </div>
                                        </td></>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-evenly items-center mt-4">
                    <button
                        className="btn btn-neutral"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-sm text-gray-600 font-medium">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        className="btn btn-neutral"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>
            </div >

            {/* Cards pour les téléphones */}
            <article className="block md:hidden space-y-5">
                {mobileView.map((offer) => (
                    <div key={offer.id} className="card bg-accent w-80vw card-xs shadow-xl p-3 border border-secondary">
                        <div className="flex justify-between mb-3">
                            <div className="badge badge-neutral font-medium">{offer.category_name}</div>
                            {isStaffPage && <button
                                onClick={() => onUpStatus(offer.id)}
                                className={`badge badge-md me-2 font-medium ${offer.is_active ? "badge-info" : "badge-warning"
                                    }`}
                            >
                                {offer.is_active ? "Actif" : "Inactif"}
                            </button>}
                        </div>
                        <div className="pb-1">
                            <h3 className="card-title font-medium text-lg rounded ps-0.5">{offer.title}</h3>
                        </div>
                        <div className="card-body bg-white rounded-md">
                            <p className="text-sm">
                                <span className="font-medium underline">Description :</span>
                                <br />{offer.description}</p>

                            {isStaffPage && <> <div className="card-action flex space-x-2 mt-2">
                                <div className="flex mt-0 md:mt-2 space-x-2">
                                    <Button action={'update'} onAction={() => {
                                        setToggle(true),
                                            onUpdate(offer)
                                    }} />
                                    <Button action={'delete'} onAction={() => { onDelete(offer.id) }} />
                                </div>
                            </div>
                            </>}


                        </div>
                    </div>
                ))}
                {visibleCards < offers.length && (
                    <div className="space-x-3">
                        <Button label={'voir plus'} onAction={() => setVisibleCards(vc => vc + 3)} className={'btn-neutral'} />
                        <Button label={'voir moins'} onAction={() => setVisibleCards(3)} className={'btn-primary'} />
                    </div>
                )}
            </article>
        </>
    )
}