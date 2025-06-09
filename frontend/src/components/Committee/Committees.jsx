import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommitteeForm from "./CmmttsForm";
import CmmttsTable from "./CmmttsTable";
import { fetchCmmtts, updateCmmttThunk, deleteCmmttThunk, addCmmttThunk, listOfCommittees } from "../../store/slices/CommitteeSlice";
import ToastAlert from "../ToastAlert";


export default function Committees() {
    const dispatch = useDispatch()
    const committees = useSelector(listOfCommittees)
    const [toUpCmmtts, setToUpCmmtts] = useState(null);
    const [toast, setToast] = useState('')
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        dispatch(fetchCmmtts())

    }, [dispatch]);

    const handleAddCmmtt = async (newCommittee) => {
        try {
            if (newCommittee.id) {
                await dispatch(updateCmmttThunk({ id: newCommittee.id, data: newCommittee })).unwrap()
            } else {
                await dispatch(addCmmttThunk(newCommittee)).unwrap()
            }
            setToUpCmmtts(null);
            setToast({ show: true, message: "CSE enregistré avec succès !", type: 'success' })
            setToggle(false)
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Category:", err);
            setToast({ show: true, message: "Erreur lors de l'eregistrement du CSE !", type: 'error' })
        }
    };

    const handleUpdate = (cmmttToEdit) => {
        setToUpCmmtts(cmmttToEdit);
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteCmmttThunk(id)).unwrap()
            setToast({ show: true, message: "CSE supprimé avec succès !", type: 'success' })
        } catch (err) {
            console.error("Erreur on DELETE :", err);
            setToast({ show: true, message: "Erreur lors de la suppression du CSE !", type: 'error' })
        }
    };

    return (
        <>
            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins bg-accent py-3 w-full mx-auto">
                CSE
            </h1>

            <section className="pt-10 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <button onClick={() => setToggle(!toggle)} className='btn btn-neutral uppercase font-medium text-xs 
                    hover:bg-accent hover:text-neutral hover:scale-105 hover:-translate-y-1 transition-transform'>Ajouter un CSE</button>
                </div>
                {toggle && (
                    <CommitteeForm onAddCommittee={handleAddCmmtt} onEditUpCmmtt={toUpCmmtts} />

                )}
                < CmmttsTable
                    committees={committees}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    setToggle={setToggle}
                />
            </section>
            <ToastAlert toast={toast} setToast={setToast} />

        </>
    )
}