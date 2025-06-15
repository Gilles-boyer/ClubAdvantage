import { useState } from "react";
import Button from "../Button";

export default function ScanTable({ scans, onDelete }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

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
    return (
        <div className="overflow-x-auto">
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
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((scan) => (
                                <tr key={scan.id}
                                    className="border-gray-300 border-t hover:bg-gray-100 transition-colors">
                                    <td className="px-4 py-2">{scan.scanned_at}</td>
                                    <td className="px-4 py-2">{scan.scanned_by_name}</td>
                                    <td className="px-4 py-2">{scan.scanned_user_name}</td>
                                    <td className="px-4 py-2"><Button action={'delete'} onAction={() => onDelete(scan.id)}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 🔁 Contrôles de pagination */}
                <div className="flex justify-evenly items-center mt-4">
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
                </div>
            </section>
        </div>
    );
}