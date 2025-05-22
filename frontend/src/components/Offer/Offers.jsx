import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../DeleteButton";
import AddOffers from "./OffersForm";
import UpdateButton from "../UpdateButton";
import ToastAlert from "../ToastAlert.jsx";
import {
    fetchOffers, updateOfferThunk, deleteOfferThunk, listOfOffers,
    addOfferThunk,
} from "../../store/slices/offerSlice.jsx";

export default function Offers() {
    const dispatch = useDispatch()
    const offers = useSelector(listOfOffers);
    const [toUpOffer, setToUpOffer] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

    useEffect(() => {
        dispatch(fetchOffers());
    }, [dispatch]);

    const handleAddOffer = async (newOffer) => {
        try {
            if (newOffer.id) {
                await dispatch(updateOfferThunk({ id: newOffer.id, data: newOffer })).unwrap();
                setToast({ show: true, message: 'Offre modifiée avec succès', type: 'success' })
            } else {
                await dispatch(addOfferThunk(newOffer)).unwrap();
                setToast({ show: true, message: 'Offre ajoutée avec succès', type: 'success' })
            }
            setToUpOffer(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Offer:", err);
            setToast({ show: true, message: "Erreur lors de la suppression de l'offre", type: "error" })
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


    const handleToUpOffer = async (offerToEdit) => {
        try {
            await setToUpOffer(offerToEdit).unwrap()
            setToast({ show: true, message: "Offre modifiée avec succès", type: 'success' })
        } catch (err) {
            console.log('Error on update :', err);
            setToast({ show: true, message: "Erreur lors de la modification de l'offre", type: 'error' })
        }
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
    return (
        <>

            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins">
                Offres Existantes
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
                <AddOffers onAddOffer={handleAddOffer} onEditOffer={toUpOffer} />
                <div className="overflow-x-auto border rounded-xl bg-white">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Titre</th>
                                <th className="px-4 py-2">Catégorie</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offer) => (
                                <tr
                                    key={offer.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium bg-accent">{offer.title}</td>
                                    <td className="px-4 py-2">{offer.category_name}</td>
                                    <td className="px-4 py-2">{offer.description}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleStatus(offer.id)}
                                            className={`py-1 px-3 rounded text-white w-20 hover:cursor-pointer ${offer.is_active ? "bg-indigo-800" : "bg-orange-400"
                                                }`}
                                        >
                                            {offer.is_active ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton
                                            item={offer}
                                            onUpdate={handleToUpOffer}
                                        />
                                        <DeleteButton id={offer.id} onDelete={handleDelete} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastAlert toast={toast} setToast={setToast} />
            </section>
        </>

    );
}
