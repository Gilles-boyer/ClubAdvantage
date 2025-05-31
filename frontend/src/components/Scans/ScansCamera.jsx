import { useContext, useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { UserContext } from "../User/UserContext";

export default function ScansCamera({ onSuccess}) {
    const html5QrCodeRef = useRef(null);       // Instance Html5Qrcode
    const { user } = useContext(UserContext);
    const [isReady, setIsReady] = useState(false); // Affichage de la caméra

    useEffect(() => {
        const startScanner = async () => {
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
                    { fps: 4, qrbox: 250 },
                    async (decodedText) => {
                        console.log("✅ QR détecté :", decodedText);
                        const scannedUserId = parseInt(decodedText);
                        const staffId = user?.id;

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
                    },
                );
                setIsReady(true);
            } catch (err) {
                console.error("🚫 Erreur démarrage scanner :", err);
            }
        };

        startScanner();

        return () => {
            // clearTimeout(timeoutRef.current);
            const scanner = html5QrCodeRef.current;
            if (scanner?.getState?.() === Html5QrcodeScannerState.SCANNING) {
                scanner.stop().then(() => scanner.clear());
            }
        };
    }, [onSuccess, user]);

    return (
        <div className="flex flex-col items-center my-6">
            <div id="reader" className="w-100 h-80 border rounded-lg shadow bg-white"></div>
            <p className="mt-4 text-gray-600 text-sm">
                {isReady ? "Scannez un QR code d'utilisateur" : "Initialisation de la caméra..."}
            </p>
        </div>
    );
}
