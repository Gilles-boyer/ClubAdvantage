import { useState } from "react";
import MobilePagination from "../mobilePagination";

export default function ScanTable({ scans }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const [visibleCards, setVisibleCards] = useState(3)

    const filtered = scans.filter(scn =>
        scn?.scanned_user_name.toLowerCase().includes(search.toLowerCase())
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
    const dateSlice = (date) =>{
       return date.slice(0, 10)
    }

    const mobileView = scans.slice(0, visibleCards)
    return (
        <>
            <div className="overflow-x-auto hidden md:block">
                <section className="pt-10 max-w-4xl mx-auto">
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
                    <div className="overflow-x-auto border border-secondary rounded-xl bg-white">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-primary text-white uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Scanné par</th>
                                    <th className="px-4 py-2">Utilisateur scanné</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((scan) => (
                                    <tr key={scan.id}
                                        className="border-gray-300 border-t hover:bg-gray-100 transition-colors">
                                        <td className="px-4 py-2">{dateSlice(scan.scanned_at)}</td>
                                        <td className="px-4 py-2">{scan.scanned_by_name}</td>
                                        <td className="px-4 py-2">{scan.scanned_user_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔁 Contrôles de pagination */}
                    {scans.length > 1 && (<div className="flex justify-evenly items-center mt-4">
                        <button
                            className="btn btn-neutral"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} sur {totalPages}
                        </span>
                        <button
                            className="btn btn-neutral"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                        </button>
                    </div>)}
                </section>
            </div>
            {/* CARDS for devices < 768px */}
            <article className="block md:hidden space-y-5 mt-15">
                {mobileView.map((scan) => (
                    <div key={scan.id} className="card bg-accent w-80vw card-xs shadow-xl p-3 border border-secondary">
                        <h3 className="card-title font-medium pb-1 text-lg rounded ps-0.5">{scan.scanned_user_name}</h3>
                        <div className="card-body bg-white border border-gray-200 rounded-md">
                            <div className="flex flex-col">
                                <p className="text-sm">
                                    <span className="font-medium">Scanné par : </span>{scan.scanned_by_name}</p>
                                <p className="text-sm">
                                    <span className="font-medium">Date du scan : </span>{scan.scanned_at}</p>
                            </div>
                        </div>
                    </div>
                ))}
                < MobilePagination object={scans} visibleCards={visibleCards} setVisibleCards={setVisibleCards} />
            </article>
        </>
    );
}