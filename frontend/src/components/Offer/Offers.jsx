import { useState, useEffect } from "react";
import { displayOffers, createOffer, updateOffer, deleteOffer, } from "../../services/offersService";
import DeleteButton from "../DeleteButton";
import AddOffers from "./OffersForm";
import UpdateButton from "../UpdateButton";

export default function Offers() {
    const [offers, setOffers] = useState([]);
    const [toUpOffer, setToUpOffer] = useState(null);

    useEffect(() => {
        displayOffers()
            .then(res => setOffers(res.data.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    const handleAddOffer = async (newOffer) => {
        try {
            if (newOffer.id) {
                const res = await updateOffer(newOffer.id, newOffer);
                setOffers((prev) =>
                    prev.map((cat) => (cat.id === newOffer.id ? res.data.data : cat))
                );
            } else {
                const res = await createOffer(newOffer);
                setOffers((prev) => [...prev, res.data.data]);
            }
            setToUpOffer(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Category:", err);
        }
    };

    const handleStatus = async (id) => {
        const offer = offers.find(of => of.id === id);
        if (!offer) return;

        try {
            const updated = { ...offer, is_active: !offer.is_active };
            const res = await updateOffer(id, updated);
            setOffers((prev) =>
                prev.map((offer) => (offer.id === id ? res.data.data : offer))
            );
        } catch (err) {
            console.error("Erreur toggle statut :", err);
        }
    };


    const handleToUpOffer = (offerToEdit) => {
        setToUpOffer(offerToEdit)
    }

    const handleDelete = async (id) => {
        try {
            await deleteOffer(id);
            setOffers((prev) => prev.filter((offer) => offer.id !== id));
        } catch (err) {
            console.error("Erreur on DELETE :", err);
        }
    };
    return (
        <>
            <AddOffers onAddOffer={handleAddOffer} onEditOffer={toUpOffer} />

            <h1 className="text-center text-2xl font-semibold mt-8 font-poppins">
                Offres Existantes
            </h1>
            <section className="pt-10 max-w-5xl mx-auto">
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
                                            className={`text-white rounded px-3 py-1 text-sm ${offer.is_active ? "bg-green-500" : "bg-red-500"
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
            </section>
        </>

    );
}
