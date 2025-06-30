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

/** Offers view : Parent component that fetches list from Redux, allows create, update & delete offers */

export default function Offers() {
    const dispatch = useDispatch()
    const offers = useSelector(listOfOffers);
    const [toUpOffer, setToUpOffer] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
    const location = useLocation();

     /** Fetch offers's list on first mount form Store on first mount*/
    useEffect(() => {
        dispatch(fetchOffers());
    }, [dispatch]);


    /** Allows to Update an offer if an 'id' is sent
     * if there is no 'id' a new category is created with 'newOffer' object values from <OffersForm />
    */
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

    /** Modify offer status locally selected by 'id'
     * then use patch method to update status value */
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

    const canceledEdit = () => {
        setToUpOffer(null);
    }

    /** Selected offer is set into state so <OffersForm /> can
     * display it in “edit” mode (pre-fills the form).*/
    const handleToUpOffer = async (offerToEdit) => {
        console.log(offerToEdit)
        setToUpOffer(offerToEdit);
    }

    /** Delete an offer by using her 'id'*/
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

            <div className="flex items-center gap-6 mt-5 mb-4">
                <div className="flex-grow border-t border-neutral"></div>
                <h2 className="text-2xl font-semibold text-gray-700">Offres</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>
            <section className="pt- max-w-5xl mx-auto" id="offersForm">
                <div className='flex w-fit'>
                    <Button label={ toggle ? 'Fermer le formulaire':'Ajouter une Offre'} onAction={() => setToggle(!toggle)}
                        className={'btn-neutral hover:btn-secondary mb-2 md:mb-0'} />
                </div>
                {toggle && (<OfferForm 
                onAddOffer={handleAddOffer} 
                onEditOffer={toUpOffer}
                setToggle={setToggle}
                onCancel={canceledEdit} />)}
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
