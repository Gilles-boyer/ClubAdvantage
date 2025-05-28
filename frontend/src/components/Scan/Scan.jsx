import { useEffect, useState } from "react";
import { displayScans, createScan } from "../../services/scanService"; // API pour GET & POST /scans
import ScanCamera from "./ScanCamera"; // Caméra HTML5
import ScanResult from "./ScanResult"; // Affiche les données d’un scan réussi

export default function Scans() {
    // 🧠 État pour stocker tous les scans depuis l’API
    const [scans, setScans] = useState([]);

    // 🧠 État pour stocker le dernier scan effectué
    const [scanSuccess, setScanSuccess] = useState(null);

    // 🧠 État pour afficher un message temporaire (succès ou erreur)
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    // 🔁 Pagination client pour limiter l’affichage
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(scans.length / itemsPerPage);

    const [scanEnabled, setScanEnabled] = useState(true); // ✅ Contrôle de la caméra

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
        const payload = {
            scanned_at: new Date().toISOString(), // Date/heure du scan
            scanned_by: scannerId,                // ID du staff qui scanne
            user_id: scannedUserId                // ID du membre scanné
        };

        try {
            const res = await createScan(payload);
            setScans((prev) => [...prev, res.data.data]); // On ajoute le nouveau scan
            setScanSuccess(res.data.data);               // On met à jour le scan affiché

            // 🟢 Toast de succès
            setToast({ show: true, message: "✅ Scan enregistré avec succès", type: "success" });
            setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
        } catch (err) {
            console.error("Erreur création scan :", err);

            // 🔴 Toast d’erreur
            setToast({ show: true, message: "❌ Erreur lors du scan", type: "error" });
            setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
        }
        setScanEnabled(false); // ⛔ Stoppe la caméra après un scan
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
            <ScanCamera onSuccess={handleScanSuccess} active={scanEnabled} />

            {/* 🔘 Bouton pour relancer un scan */}
            {!scanEnabled && (
            <div className="text-center mt-4">
                <button
                className="btn btn-primary"
                onClick={() => setScanEnabled(true)}
                >
                Scanner un autre QR code
                </button>
            </div>
            )}

            {/* 📢 Toast feedback utilisateur */}
            {toast.show && (
                <div
                    className={`text-center mt-4 px-4 py-2 rounded font-semibold
                    ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                    {toast.message}
                </div>
            )}

            {/* 👁️ Affichage du dernier scan détaillé */}
            {scanSuccess && <ScanResult data={scanSuccess} />}

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
