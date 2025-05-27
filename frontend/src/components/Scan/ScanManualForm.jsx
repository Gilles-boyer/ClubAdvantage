import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ScanManualForm({ onManualScan }) {
    const [manualId, setManualId] = useState("");
    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!manualId.trim()) return;

        const scannedUserId = parseInt(manualId);
        const staffId = user?.id;

        if (scannedUserId && staffId) {
            onManualScan(scannedUserId, staffId); // On appelle la même logique que le scan caméra
            setManualId("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mt-4">
            <input
                type="number"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                className="input input-bordered w-64"
                placeholder="ID utilisateur à scanner manuellement"
            />
            <button type="submit" className="btn btn-secondary">Valider le scan</button>
        </form>
    );
}
