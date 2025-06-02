import { useEffect, useState } from "react";
import { displayScans, validateScan } from "../../services/scansService"; // API pour GET & POST /scans
import ScansCamera from "./ScansCamera"; // Caméra HTML5
import ScansResult from "./ScansResult"; // Affiche les données d’un scan réussi

export default function Scans() {
    // 🧠 État pour stocker tous les scans depuis l’API
    const [scans, setScans] = useState([]);

    // 🧠 État pour stocker le dernier scan effectué
    const [scanSuccess, setScanSuccess] = useState(null);

    // 🔁 Pagination client pour limiter l’affichage
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(scans.length / itemsPerPage);

    // 🔁 Charger les scans au chargement initial du composant
    useEffect(() => {
        fetchScans();
    }, []);

    // 🔧 Fonction qui appelle l’API pour récupérer tous les scans
    const fetchScans = async () => {
        try {
            const res = await displayScans();
            setScans(res.data.data);
        } catch (err) {
            console.error("Erreur GET scans :", err);
        }
    };

    // ✅ Fonction exécutée à chaque scan réussi (via le composant ScanCamera)
    const handleScanSuccess = async (scannedUserId, scannerId) => {
        try {
            const res = await validateScan("/api/scans/validate", {
                user_id: scannedUserId,
                scanned_by: scannerId,
            });

            // Ajout dans la liste + affichage en haut
            setScans((prev) => [...prev, res.data.data]);
            setScanSuccess(res.data.data);
        } catch (err) {
            if (err.response?.data?.message) {
                alert(`⛔ ${err.response.data.message}`);
            } else {
                alert("❌ Erreur lors de la validation du scan.");
            }
        }
    };


    // 🔁 Pagination des scans
    const paginatedScans = scans.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* 🏷️ Titre principal */}
            <h1 className="text-2xl font-semibold text-center my-4">Scans enregistrés</h1>

            {/* 📸 Caméra QR Code */}
            <ScansCamera onSuccess={handleScanSuccess} /> 

            {/* 👁️ Affichage du dernier scan détaillé */}
            {scanSuccess && (
            <>
                <ScansResult data={scanSuccess} />
                <div className="text-center mt-4">
                <button
                    onClick={() => setScanSuccess(null)}
                    className="btn btn-outline btn-sm"
                >
                    🔁 Nouveau scan
                </button>
                </div>
            </>
            )}


            {/* 🧾 Tableau de tous les scans paginés */}
            <section className="pt-10 max-w-4xl mx-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Date</th>
                            <th>Scanné par</th>
                            <th>Utilisateur scanné</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedScans.map((scan) => (
                            <tr key={scan.id}>
                                <td>{scan.scanned_at}</td>
                                <td>{scan.scanned_by_name}</td>
                                <td>{scan.scanned_user_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 🔁 Contrôles de pagination */}
                <div className="flex justify-center items-center mt-4 space-x-4">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ◀ Précédent
                    </button>
                    <span className="text-sm">Page {currentPage} / {totalPages}</span>
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant ▶
                    </button>
                </div>
            </section>
        </>
    );
}
