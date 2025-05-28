import { useContext, useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { UserContext } from "../User/UserContext";

export default function ScanCamera({ onSuccess }) {
    const html5QrCodeRef = useRef(null);       // Instance Html5Qrcode
    const timeoutRef = useRef(null);           // Pour gérer relance du scan
    const lastScanRef = useRef("");            // 🔁 Empêche double scan immédiat
    const { user } = useContext(UserContext);

    const [isReady, setIsReady] = useState(false); // Affichage de la caméra

    useEffect(() => {
        const startScanner = async () => {
            const readerDiv = document.getElementById("reader");
            if (!readerDiv) return;

            // Ne relance pas si déjà actif
            if (html5QrCodeRef.current?.getState?.() === Html5QrcodeScannerState.SCANNING) {
                console.log("⚠️ Scanner déjà actif.");
                return;
            }

            const scanner = new Html5Qrcode("reader");
            html5QrCodeRef.current = scanner;

            const cameras = await Html5Qrcode.getCameras();
            if (!cameras.length) return console.warn("Aucune caméra détectée.");

            const cameraId = cameras[0].id;

            scanner.start(
                cameraId,
                { fps: 10, qrbox: 250 },
                async (decodedText) => {
                    // ✅ Ignore les scans répétitifs du même QR code
                    if (decodedText === lastScanRef.current) return;
                    lastScanRef.current = decodedText;

                    const scannedUserId = parseInt(decodedText);
                    const staffId = user?.id;

                    if (scannedUserId && staffId) {
                        await onSuccess(scannedUserId, staffId);

                        // 💤 Stoppe le scanner et redémarre après délai
                        scanner.stop().then(() => {
                            scanner.clear();
                            timeoutRef.current = setTimeout(() => {
                                lastScanRef.current = ""; // 🔄 Réinitialise protection anti-scan
                                startScanner();
                            }, 3000); // <- délai de relance après scan
                        });
                    }
                },
                // (errorMsg) => {
                //     // Silencieux
                // }
            ).then(() => {
                setIsReady(true);
            }).catch(err => {
                console.error("Erreur lancement caméra :", err);
            });
        };

        startScanner();

        return () => {
            clearTimeout(timeoutRef.current);
            const scanner = html5QrCodeRef.current;
            if (scanner?.getState?.() === Html5QrcodeScannerState.SCANNING) {
                scanner.stop().then(() => scanner.clear());
            }
        };
    }, [onSuccess, user]);

    return (
        <div className="flex flex-col items-center my-6">
            <div id="reader" className="w-72 h-72 border rounded-lg shadow bg-white"></div>
            <p className="mt-4 text-gray-600 text-sm">
                {isReady ? "Scannez un QR code d'utilisateur" : "Initialisation de la caméra..."}
            </p>
        </div>
    );
}
