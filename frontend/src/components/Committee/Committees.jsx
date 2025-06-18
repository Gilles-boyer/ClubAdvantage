import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommitteeForm from "./CmmttsForm";
import CmmttsTable from "./CmmttsTable";
import { fetchCmmtts, updateCmmttThunk, deleteCmmttThunk, addCmmttThunk, listOfCommittees } from "../../store/slices/CommitteeSlice";
import ToastAlert from "../ToastAlert";
import Button from "../Button";


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
            setToast({ show: true, message: "Erreur lors de l'enregistrement du CSE !", type: 'error' })
            // setToast({ show: true, message: err.toString(), type: 'error' })
        }
    };
    const canceledEdit = () => {
        setToUpCmmtts(null);
    }

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

        const handleStatus = async (id) => {
            try {
                const committee = committees.find(cat => cat.id === id);
                if (!committee) return;
                const updated = { ...committee, is_active: !committee.is_active };
                await dispatch(updateCmmttThunk({ id, data: updated })).unwrap();
                setToast({ show: true, message: "Statut modifié avec succès", type: "success" });
            } catch (err) {
                console.log("Erreur on UPDATE Category status :", err);
                setToast({ show: true, message: "Erreur lors de la modification du statut", type: "error" });
    
            }
        };

    return (
        <>
            <div className="flex items-center gap-6 mt-5 mb-4">
                <div className="flex-grow border-t border-neutral"></div>
                <h2 className="text-2xl font-semibold text-gray-700">CSE</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>

            <section className="pt-5 max-w-5xl mx-auto" id="comForm">
                <div className='flex w-fit'>
                    <Button label={'Ajouter un CSE'}
                        onAction={() => setToggle(!toggle)}
                        className={'btn-neutral  hover:btn-secondary mb-2 md:mb-0'} />
                </div>
                {toggle && (
                    <CommitteeForm onAddCommittee={handleAddCmmtt}
                        onEditUpCmmtt={toUpCmmtts}
                        setToggle={setToggle}
                        onCancel={canceledEdit} />

                )}
                < CmmttsTable
                    committees={committees}
                    onUpdate={handleUpdate}
                    onUpStatus={handleStatus}
                    onDelete={handleDelete}
                    setToggle={setToggle}
                />
            </section>
            <ToastAlert toast={toast} setToast={setToast} />

        </>
    )
}