import { useContext, useEffect, useRef, useState, useCallback, useSelector } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { UserContext } from "../User/UserContext";

export default function ScansCamera({onSuccess}) {
    const html5QrCodeRef = useRef(null);       // Instance Html5Qrcode
    const { user } = useContext(UserContext);
    const [isReady, setIsReady] = useState(false); // Affichage de la caméra
    const [snapshot, setSnapshot] = useState(null);



    // useEffect(() => {
        const startScanner = useCallback( async () => {
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
                        console.log("✅ QR détecté :", decodedText);
                        const scannedUserId = JSON.parse(decodedText);
                        const staffId = user?.id;
                        console.log("Valeur de l'identifiant utilisateur :", staffId);

                        
                        // 🖼️ Capture de l’image de la caméra
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
        }, [onSuccess, user]);

    useEffect(() => {
        startScanner();

        return () => {
            // clearTimeout(timeoutRef.current);
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
                            setSnapshot(null);
                            setIsReady(false);
                            setTimeout(() => {
                                startScanner();
                            }, 2);
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
                    : "Initialisation de la caméra..."
                }
            </p>
        </div>
    );
}
