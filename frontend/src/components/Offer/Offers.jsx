import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferTable from "./OfferTable.jsx";
import OfferForm from "./OffersForm";
import ToastAlert from "../ToastAlert.jsx";
import {
    fetchOffers, updateOfferThunk, deleteOfferThunk, listOfOffers,
    addOfferThunk,
} from "../../store/slices/offerSlice.jsx";
import { useLocation } from "react-router-dom";
import Button from "../Button.jsx";


export default function Offers() {
    const dispatch = useDispatch()
    const offers = useSelector(listOfOffers);
    const [toUpOffer, setToUpOffer] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchOffers());
    }, [dispatch]);

    
    const handleAddOffer = async (newOffer) => {
        try {
            if (newOffer.id) {
                await dispatch(updateOfferThunk({ id: newOffer.id, data: newOffer })).unwrap();
            } else {
                await dispatch(addOfferThunk(newOffer)).unwrap();
            }
            setToUpOffer(null);
            setToggle(false)
            setToast({ show: true, message: 'Offre enregistrée avec succès', type: 'success' })
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Offer:", err);
            setToast({ show: true, message: "Erreur lors de l'opération !", type: "error" })
        }
    };

    const handleStatus = async (id) => {
        try {
            const offer = offers.find(off => off.id === id);
            if (!offer) return;
            const updated = { ...offer, is_active: !offer.is_active };
            await dispatch(updateOfferThunk({ id, data: updated })).unwrap();
            setToast({ show: true, message: "Statut de l'offre modifié avec succès", type: 'success' });
        } catch (err) {
            console.log('Error on update STATUS :', err);
            setToast({ show: true, message: "Erreur lors de la modification du statut de l'offre", type: 'error' });
        }

    };

    // const handleToggle = (toggle) => {
    //     setToggle(!toggle)
    // }
    const handleToUpOffer = async (offerToEdit) => {
        setToUpOffer(offerToEdit);
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteOfferThunk(id)).unwrap()
            setToast({ show: true, message: "Offre supprimée avec succès", type: 'success' })
        } catch (err) {
            console.log('Error on delete :', err);
            setToast({ show: true, message: "Erreur lors de la suppression de l'offre", type: 'error' })
        }
    };
    if (location.pathname === '/') return (
        <>
            <section className="pt-10 max-w-5xl mx-auto">
                < OfferTable
                    offers={offers}
                    onUpdate={handleToUpOffer}
                    onDelete={handleDelete}
                    onUpStatus={handleStatus}
                    setToggle={setToggle}
                />
            </section>
        </>

    );
    if (location.pathname === '/offers') return (
        <>

            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins">
                Offres Existantes
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <Button action={'Ajouter une Offre'} onAction={() => setToggle(!toggle)} 
                    className={'btn-neutral hover:btn-accent hover:text-neutral'} />
                </div>
                {toggle && (<OfferForm onAddOffer={handleAddOffer} onEditOffer={toUpOffer} />)}
                < OfferTable
                    offers={offers}
                    onUpdate={handleToUpOffer}
                    onDelete={handleDelete}
                    onUpStatus={handleStatus}
                    setToggle={setToggle}
                />
                <ToastAlert toast={toast} setToast={setToast} />
            </section>
        </>

    );
}
