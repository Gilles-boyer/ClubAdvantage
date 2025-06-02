import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { UserContext } from "../User/UserContext";

export default function ScansCamera({ onSuccess }) {
    const html5QrCodeRef = useRef(null);                 // 🔁 Référence du scanner actif
    const { user } = useContext(UserContext);            // 👤 Utilisateur connecté (staff)
    const [isReady, setIsReady] = useState(false);       // 🎥 Caméra prête ou non
    const [snapshot, setSnapshot] = useState(null);      // 🖼️ Image capturée
    const [hasScanned, setHasScanned] = useState(false); // 🔒 Verrou pour éviter les scans répétés

    // 📦 Fonction de lancement du scanner encapsulée dans useCallback pour ne pas être recréée inutilement
    const startScanner = useCallback(async () => {
        const readerDiv = document.getElementById("reader");
        if (!readerDiv) return console.error("❌ #reader introuvable");

        const scanner = new Html5Qrcode("reader");
        html5QrCodeRef.current = scanner;

        try {
            const cameras = await Html5Qrcode.getCameras();
            if (!cameras.length) {
                console.warn("Aucune caméra détectée.");
                return;
            }

            const cameraId = cameras[0].id;

            await scanner.start(
                cameraId,
                { fps: 5, qrbox: 250 },
                async (decodedText) => {
                    if (hasScanned) return; // 🔒 Ignore si déjà scanné
                    setHasScanned(true);   // 🔐 Verrouille les scans suivants
                    console.log("✅ QR détecté :", decodedText);

                    const scannedUserId = parseInt(decodedText);
                    const staffId = user?.id;

                    // 🖼️ Capture un snapshot du flux vidéo
                    const video = document.querySelector("video");
                    if (video) {
                        const canvas = document.createElement("canvas");
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const image = canvas.toDataURL("image/png");
                        setSnapshot(image);
                    }

                    // ✅ Si tout est OK, déclenche la validation du scan
                    if (scannedUserId && staffId) {
                        await onSuccess(scannedUserId, staffId);

                        const state = scanner.getState?.();
                        if (
                            state === Html5QrcodeScannerState.SCANNING ||
                            state === Html5QrcodeScannerState.PAUSED
                        ) {
                            await scanner.stop();
                            scanner.clear();
                        }
                    }
                }
            );
            setIsReady(true);
        } catch (err) {
            console.error("🚫 Erreur démarrage scanner :", err);
        }
    }, [onSuccess, user, hasScanned]);

    // 🎬 Lance le scanner à l’ouverture du composant
    useEffect(() => {
        startScanner();

        // 🧹 Nettoie correctement à la fermeture du composant
        return () => {
            const scanner = html5QrCodeRef.current;
            if (scanner?.getState?.() === Html5QrcodeScannerState.SCANNING) {
                scanner.stop().then(() => scanner.clear());
            }
        };
    }, [startScanner]);

    return (
        <div className="flex flex-col items-center my-6">
            {snapshot ? (
                <>
                    <img
                        src={snapshot}
                        alt="Capture scan"
                        className="w-100 h-80 object-cover border rounded-lg shadow"
                    />
                    <button
                        className="mt-2 btn btn-outline btn-sm"
                        onClick={() => {
                            // 🔄 Réinitialise tous les états pour relancer le scan
                            setSnapshot(null);
                            setIsReady(false);
                            setHasScanned(false); // 🔓 Déverrouille un nouveau scan
                            setTimeout(() => {
                                startScanner();
                            }, 10); // Petit délai pour éviter les conflits avec le DOM
                        }}
                    >
                        🔁 Reprendre le scan
                    </button>
                </>
            ) : (
                <div
                    id="reader"
                    className="w-100 h-75 border shadow bg-white"
                ></div>
            )}

            <p className="mt-4 text-gray-600 text-sm">
                {isReady
                    ? "Scannez un QR code d'utilisateur"
                    : "Initialisation de la caméra..."}
            </p>
        </div>
    );
}
