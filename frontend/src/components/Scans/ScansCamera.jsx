import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, listOfUsers } from "../../store/slices/userSlice";
import { fetchUserById } from "../../services/usersService";
import { fetchCmmtts, listOfCommittees } from "../../store/slices/committeeSlice";

export default function ScansCamera({ onScanning }) {
    const html5QrCodeRef = useRef(null);                 // 🔁 Référence du scanner actif
    const [isReady, setIsReady] = useState(false);       // 🎥 Caméra prête ou non
    const [snapshot, setSnapshot] = useState(null);      // 🖼️ Image capturée
    const [hasScanned, setHasScanned] = useState(false); // 🔒 Verrou pour éviter les scans répétés
    const [dataOfUser, setDataOfUser] = useState(null) //datas de l'utilisateur scanné si existant en BDD
    const dataBaseUsers = useSelector(listOfUsers) //liste des scans dans la BDD
    const commttsList = useSelector(listOfCommittees)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers()),
            dispatch(fetchCmmtts())
    }, [dispatch])

    useEffect(() => {
        if (dataOfUser?.user && !hasScanned) {
            const newScan = {
                user_id: dataOfUser.id,
                scanned_by: 2,
                scanned_user_name: `${dataOfUser.user.first_name} ${dataOfUser.user.last_name}`,
                scanned_at: new Date().toISOString(),
            };
            onScanning(newScan);
            setHasScanned(true);
        }
    }, [dataOfUser, onScanning, hasScanned]);
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
                    if (hasScanned) return;
                    setHasScanned(true);

                    const scannedUserId = parseInt(decodedText);
                    try {
                        const userInDB = dataBaseUsers.find(us => us.id === scannedUserId);

                        if (userInDB) {
                            const response = await fetchUserById(scannedUserId); // ⚠️ Attend la réponse
                            const userData = response.data; // Extraction des données

                            setDataOfUser(userData); // Mise à jour de l'état

                        } else {
                            console.log('Utilisateur non trouvé');
                        }
                    } catch (err) {
                        console.error('Erreur:', err);
                    }

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
                    if (scannedUserId) {
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
    }, [hasScanned, dataBaseUsers]);

    // 🎬 Lance le scanner à l’ouverture du composant
    useEffect(() => {
        startScanner();

        // 🧹 Nettoie correctement à la fermeture du composant
        return async () => {
            const scanner = html5QrCodeRef.current;
            if (scanner?.getState?.() === Html5QrcodeScannerState.SCANNING) {
                await scanner.stop()
                await scanner.clear();
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
                                setDataOfUser(null);
                            }, 100)

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
            {commttsList && dataOfUser && (
                <section className="card bg-accent px-6 pb-1 rounded font-medium">
                    <h3 className="card-title w-full bg-primary py-1 justify-center rounded my-4">Informations Membre</h3>
                    <div className="card-body">
                        <div className="space-y-2">
                            <p className="bg-primary p-2 rounded">Nom : {dataOfUser.user.last_name}</p>
                            <p className="bg-primary p-2 rounded">Prénom : {dataOfUser.user.first_name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="bg-primary p-2 rounded">CSE : {commttsList.find((com) => com.id === dataOfUser.user.committee_id)?.name}</p>
                            <p className="bg-primary p-2 rounded">Status : {dataOfUser.user.status}</p>
                        </div>
                    </div>
                </section>
            )}
        </div >
    );
}
