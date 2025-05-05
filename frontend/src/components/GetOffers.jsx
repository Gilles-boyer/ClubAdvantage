import { useState, useEffect } from 'react';
import { deleteOffer, displayOffers, updatedStatus } from '../services/offersService';
import DeleteButton from './DeleteButton';

export default function GetOffers() {

    const [offers, setOffers] = useState([])

    useEffect(() => {
        displayOffers()
            .then(response => {
                setOffers(response.data);
            })
            .catch(error => {
                console.error("Erreur de récupération :", error);
            });
    }, []);

    const handleStatus = (id, currentStatus) => {

        const updated = { //! Modifie la valeur du statut ('is_active')
            is_active: !currentStatus,
        };
        console.log(id);

        updatedStatus(id, updated) //! Modifie la valeur du statut en BDD avec la nouvelle valeur (axios.patch)
            .then(() => { //! Permet de modifier l'affichage sans avoir à rafraichir la page à chaque interaction
                setOffers((prev) =>
                    prev.map((offer) =>
                        offer.id === id ? { ...offer, is_active: !currentStatus } : offer
                    )
                );
            })

            .catch(err => console.error("Erreur de mise à jour :", err));

    };
    return (
        <>
            {offers.map((offer) => (
                <tr className="border-b border-dark text-black " key={offer.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-dark whitespace-nowrap bg-primary">
                        {offer.title}
                    </th>
                    <td className="px-6 py-4">
                        {offer.description}
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleStatus(offer.id, offer.is_active)}
                            className={`py-1 px-3 rounded text-white w-20 ${offer.is_active ? "bg-green-600" : "bg-red-600"
                                }`}
                        >
                            {offer.is_active ? "Actif" : "Inactif"}
                        </button>

                    </td>
                    <td className="px-6 py-4 bg-primary">
                        <DeleteButton id={offer.id} onDelete={deleteOffer} />
                    </td>
                </tr>
            ))}
        </>
    )
}