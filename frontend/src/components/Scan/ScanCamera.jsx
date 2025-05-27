import { useContext, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { UserContext } from "../User/UserContext"; // Contexte pour récupérer l’utilisateur connecté (staff)

export default function ScanCamera({ onSuccess }) {
    const html5QrCodeRef = useRef(null); // Référence pour garder l'objet scanner
    const timeoutRef = useRef(null);     // Pour gérer le redémarrage après un scan
    const { user } = useContext(UserContext); // Utilisateur connecté = le staff qui scanne

    useEffect(() => {
        // Fonction principale qui lance le scanner
        const startScanner = async () => {
            const html5QrCode = new Html5Qrcode("reader");
            html5QrCodeRef.current = html5QrCode;

            // Récupère les caméras disponibles (webcam ou mobile)
            const devices = await Html5Qrcode.getCameras();
            if (devices.length === 0) {
                console.warn("Aucune caméra détectée.");
                return;
            }

            const cameraId = devices[0].id; // Utilise la première caméra détectée

            html5QrCode.start(
                cameraId,
                { fps: 10, qrbox: 250 },
                async (decodedText) => {
                    console.log("📷 QR détecté :", decodedText);

                    const scannedUserId = parseInt(decodedText); // Le QR contient l'ID de l'utilisateur
                    const staffId = user?.id; // Celui qui scanne

                    if (scannedUserId && staffId) {
                        await onSuccess(scannedUserId, staffId);

                        // Stop le scanner après succès
                        await html5QrCode.stop();
                        html5QrCode.clear();

                        // Redémarre le scanner après 5 secondes pour une nouvelle personne
                        timeoutRef.current = setTimeout(() => {
                            startScanner();
                        }, 5000);
                    }
                },
                // (err) => {
                //     // Silencieux volontairement : évite le spam console
                // }
            ).catch((err) => console.error("Erreur démarrage caméra :", err));
        };

        startScanner();

        // Nettoyage si on quitte la page
        return () => {
            clearTimeout(timeoutRef.current);
            html5QrCodeRef.current?.stop().then(() => {
                html5QrCodeRef.current.clear();
            });
        };
    }, [onSuccess, user]);

    return (
        <div className="flex flex-col items-center my-6">
            <div id="reader" className="w-72 h-72 border rounded-lg shadow bg-white"></div>
            <p className="mt-4 text-gray-600 text-sm">Scannez un QR code d'utilisateur. Reprise automatique après chaque scan.</p>
        </div>
    );
}
