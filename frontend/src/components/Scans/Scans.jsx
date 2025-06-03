import { useEffect, useState } from "react";
import { fetchScans, listOfScans, addScanThunk } from "../../store/slices/scanSlice";
import ScansCamera from "./ScansCamera"; // Caméra HTML5
import ScansTable from "./ScansTable"; // Affiche les données d’un scan réussi
import { useDispatch, useSelector } from "react-redux";

export default function Scans() {
    // 🧠 État pour stocker tous les scans depuis l’API
    const scans = useSelector(listOfScans);
    const dispatch = useDispatch();
    // 🧠 État pour stocker le dernier scan effectué
    const [scanSuccess, setScanSuccess] = useState(null);


    // 🔁 Charger les scans au chargement initial du composant
    useEffect(() => {
        dispatch(fetchScans())
    }, [dispatch]);

    // 🔧 Fonction qui appelle l’API pour récupérer tous les scans


    // ✅ Fonction exécutée à chaque scan réussi (via le composant ScanCamera)
    const handleAddScan = async (newScan) => {
        try {
            await dispatch(addScanThunk(newScan)).unwrap();
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Offer:", err);
        }
    }


    return (
        <>
            {/* 🏷️ Titre principal */}
            <h1 className="text-2xl font-semibold text-center my-4">Scans enregistrés</h1>

            {/* 📸 Caméra QR Code */}
            <ScansCamera onSuccess={handleAddScan} />

            {/* 👁️ Affichage du dernier scan détaillé */}
            {scanSuccess && (
                <>
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
            <ScansTable scan={scans} />

        </>
    );
}
