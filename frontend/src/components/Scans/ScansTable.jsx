import { useState } from "react";

export default function ScanTable({ scans }) {
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
                    className="input input-bordered my-2 w-full max-w-md"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <table className="table w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Date</th>
                            <th>Scanné par</th>
                            <th>Utilisateur scanné</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((scan) => (
                            <tr key={scan.id}>
                                <td>{scan.scanned_at}</td>
                                <td>{scan.scanned_by_name}</td>
                                <td>{scan.scanned_user_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 🔁 Contrôles de pagination */}
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
            </section>
        </div>
    );
}