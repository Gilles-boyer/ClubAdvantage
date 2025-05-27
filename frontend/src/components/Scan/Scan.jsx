import { useEffect, useState } from "react";
import { displayScans, createScan } from "../../services/scanService"; // API pour GET & POST /scans
import ScanCamera from "./ScanCamera"; // Caméra HTML5
import ScanResult from "./ScanResult"; // Affiche les données d’un scan réussi

export default function Scans() {
    // Tous les scans enregistrés (affichés dans un tableau)
    const [scans, setScans] = useState([]);

    // Dernier scan réussi (affiché sous forme détaillée)
    const [scanSuccess, setScanSuccess] = useState(null);

    // Affichage d’un toast (message temporaire de succès ou erreur)
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    // 🔁 Lors du premier rendu de la page, on récupère la liste des scans
    useEffect(() => {
        fetchScans();
    }, []);

    // Fonction pour charger tous les scans depuis l’API
    const fetchScans = async () => {
        try {
            const res = await displayScans();
            setScans(res.data.data);
        } catch (err) {
            console.error("Erreur GET scans :", err);
        }
    };

    // ✅ Fonction appelée à chaque scan réussi
    const handleScanSuccess = async (scannedUserId, scannerId) => {
        const payload = {
            scanned_at: new Date().toISOString(), // Date/heure actuelle
            scanned_by: scannerId,                // ID du staff
            user_id: scannedUserId                // ID du membre scanné
        };

        try {
            // Enregistrement du scan dans la BDD
            const res = await createScan(payload);

            // Mise à jour de la liste (ajout du nouveau scan à la fin)
            setScans((prev) => [...prev, res.data.data]);

            // Affiche les détails du dernier scan
            setScanSuccess(res.data.data);

            // Affiche un message de succès pendant 3 secondes
            setToast({ show: true, message: "✅ Scan enregistré avec succès", type: "success" });
            setTimeout(() => {
                setToast({ show: false, message: "", type: "success" });
            }, 3000);
        } catch (err) {
            console.error("Erreur création scan :", err);

            // Affiche un message d'erreur si la requête échoue
            setToast({ show: true, message: "❌ Erreur lors du scan", type: "error" });
            setTimeout(() => {
                setToast({ show: false, message: "", type: "error" });
            }, 3000);
        }
    };

    return (
        <>
            {/* Titre principal */}
            <h1 className="text-2xl font-semibold text-center my-4">Scans enregistrés</h1>

            {/* Composant de scan (caméra HTML5) */}
            <ScanCamera onSuccess={handleScanSuccess} />

            {/* Zone d'affichage du toast */}
            {toast.show && (
                <div
                    className={`text-center mt-4 px-4 py-2 rounded font-semibold
                    ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {toast.message}
                </div>
            )}

            {/* Détails du dernier scan réussi */}
            {scanSuccess && <ScanResult data={scanSuccess} />}

            {/* Tableau des scans */}
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
                        {scans.map((scan) => (
                            <tr key={scan.id}>
                                <td>{scan.scanned_at}</td>
                                <td>{scan.scanned_by_name}</td>
                                <td>{scan.scanned_user_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
