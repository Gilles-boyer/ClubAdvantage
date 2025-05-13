import { useState, useEffect } from "react";
import { displayOffers } from "../../services/offersService";
import DeleteButton from "../DeleteButton";
import AddOffers from "./OffersForm";
import UpdateOfferBtn from "./UpdateButtonOffer";

export default function Offers() {
    const [offers, setOffers] = useState([]);
    const [toUpOffer, setToUpOffer] = useState(null);

    useEffect(() => {
        displayOffers()
            .then(res => setOffers(res.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    const handleAddOffer = (newOffer) => {
               if (newOffer.index !== undefined) {
            setOffers((prev) => {
                const copy = [...prev];
                
                copy[newOffer.index] = {
                    ...copy[newOffer.index],
                    name: newOffer.name,
                    description: newOffer.description,
                    is_active: false,
                    updated_at: new Date().toISOString(),
                };
                return copy;
            });
            setToUpOffer(null);
        } else {
            setOffers((prev) => [...prev, newOffer]);
        }
    }

    const handleStatus = (index) => {
        setOffers(prev => {
            const copy = [...prev];
            copy[index] = {
                ...copy[index],
                is_active: !copy[index].is_active,

            }
            return copy;
        });
    };
    const handleToUpOffer = (offerToEdit) => {
        setToUpOffer(offerToEdit)
    }

    const handleDelete = (index) => {
        setOffers((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    };
    return (
        <>
            <AddOffers onAddOffer={handleAddOffer} onEditOffer={toUpOffer}/>
            <section className="relative overflow-x-auto pt-10 mx-auto">
                <div className='w-fit mx-auto'>
                    <table className="text-sm text-left rtl:text-right">
                        <thead className="text-xs uppercase bg-secondary">
                            <tr>
                                <th className="px-6 py-3">Titre</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Statut</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offer, index) => (
                                <tr key={index} className="border-b border-dark text-black">
                                    <th className="px-6 py-4 font-medium text-dark whitespace-nowrap bg-primary">
                                        {offer.title}
                                    </th>
                                    <td className="px-6 py-4">{offer.description}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatus(index)}
                                            className={`py-1 px-3 rounded text-white w-20 ${offer.is_active ? "bg-green-600" : "bg-red-600"
                                                }`}
                                        >
                                            {offer.is_active ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 bg-primary">
                                        <UpdateOfferBtn index={index} onUpdate={handleToUpOffer}
                                            currentTitle={offer.title}
                                            currentDesc={offer.description} />
                                        <DeleteButton index={index} onDelete={handleDelete} />
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
