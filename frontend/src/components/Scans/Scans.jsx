import { useEffect, useState } from "react";
import { fetchScans, listOfScans, addScanThunk, deleteScanThunk } from "../../store/slices/scanSlice";
import { fetchUsers, listOfUsers } from "../../store/slices/userSlice";
import { fetchUserById } from "../../services/usersService";
// import ScansCamera from "./ScansCamera"; // Caméra HTML5
import ScansTable from "./ScansTable"; // Affiche les données d’un scan réussi
import { useDispatch, useSelector } from "react-redux";
import Html5QrcodePlugin from "./QrScannerPlugin";
import { fetchCmmtts, listOfCommittees } from "../../store/slices/CommitteeSlice";
import ToastAlert from "../ToastAlert";


export default function Scans() {
    const dispatch = useDispatch();
    const scans = useSelector(listOfScans);
    const dataBaseUsers = useSelector(listOfUsers)
    const commttsList = useSelector(listOfCommittees)
    const [dataOfUser, setDataOfUser] = useState(null)
    const [scanSuccess, setScanSuccess] = useState(null);
    const [toast, setToast] = useState('')

    useEffect(() => {
        dispatch(fetchScans())
        dispatch(fetchUsers())
        dispatch(fetchCmmtts())

    }, [dispatch]);

    const onNewScanResult = async (decodedText) => {
        const scannedUserId = parseInt(decodedText);
        if (scannedUserId) {
            setTimeout(() => {
                setToast({ show: true, message: "Scan effectué avec succès !", type: 'success' })
                setScanSuccess(true)
            }, 1000)

        }

        try {
            const userInDB = dataBaseUsers.find(us => us.id === scannedUserId); //!Vérification de l'existance du user en BDD
            console.log('Utilsateur trouvé en BDD :', userInDB);


            if (userInDB) { //! condition si user existe
                const response = await fetchUserById(scannedUserId); //!récupèration des informations par l'ID
                const userData = response.data.user;

                setDataOfUser(userData); //!MAJ de l'état
            } else {
                setToast({ show: true, message: "Utilisateur non trouvé", type: 'error' })
            }
        } catch (err) {
            console.error('Erreur:', err);
        }
    }



    // ✅ Fonction exécutée à chaque scan réussi (via le composant ScanCamera)
    const handleAddScan = async (newScan) => {
        try {
            await dispatch(addScanThunk(newScan)).unwrap();
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Offer:", err);
        }
    }
    const handleDelete = async (id) => {
        try {
            await dispatch(deleteScanThunk(id)).unwrap
            setToast({ show: true, message: "Scan supprimé avec succès !" })
        } catch (err) {
            console.log("Error on delete :", err);
            setToast({ show: true, message: "Erreur lors de la suppression du scan" })
        }
    }
    
    return (
        <>
            <h1 className="text-2xl font-semibold text-center my-4">Scans enregistrés</h1>
            <div>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </div>
            {scanSuccess && commttsList && dataOfUser && (
                <section id="result-scan" className="card bg-accent w-80vw md:w-100 mx-auto card-xs shadow-xl p-3 border border-secondary">
                    <h3 className="card-title w-full justify-center rounded my-2">Informations Membre</h3>
                    <div className="card-body bg-white rounded text-sm">
                        <div className="space-y-2">
                            <p>Nom : {dataOfUser.last_name}</p>
                            <p>Prénom : {dataOfUser.first_name}</p>
                        </div>
                        <div className="space-y-2">
                            <p>CSE : {commttsList.find((com) => com.id === dataOfUser.committee_id)?.name}</p>
                            <p className="text-sm">Statut : <span className="badge badge-white">{dataOfUser.status}</span></p>
                        </div>
                    </div>
                </section>
            )}

            {scanSuccess && (
                <>
                    <div className="text-center mt-4">
                        <button
                            onClick={() => {
                                setScanSuccess(null)
                                handleAddScan({
                                    user_id: dataOfUser.id,
                                    scanned_by: 2,
                                    scanned_user_name: `${dataOfUser.first_name} ${dataOfUser.last_name}`,
                                    scanned_at: new Date().toISOString(),
                                })
                            }}
                            className="btn btn-outline btn-sm"
                        >
                            🔁 Nouveau scan
                        </button>
                    </div>
                </>
            )}

            <ScansTable scans={scans} onDelete={handleDelete} />

            <ToastAlert toast={toast} setToast={setToast} />
        </>
    );
}
