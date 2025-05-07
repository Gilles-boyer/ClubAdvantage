import { useState, useEffect } from "react";
import { displayOffers } from "../../services/offersService";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function Offers() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        displayOffers()
            .then(res => setOffers(res.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);
    const handleStatus = (index) => {
        setOffers(prev => {
            const copy = [...prev];
            copy[index].is_active = !copy[index].is_active;
            return copy;
        });
    };


    return (
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
                                    <UpdateButton />
                                    <DeleteButton index={index} onDelete={() => { }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
