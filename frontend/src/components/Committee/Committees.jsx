import { useState, useEffect } from "react";
import AddCommittee from "./CmmttsForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";
import { createCommittee, displayCommittees, updateCommittee, deleteCommittee } from "../../services/committeeService";


export default function Committees() {
    const [committees, setCommittees] = useState([]);
    const [toUpCmmtts, setToUpCmmtts] = useState(null);

    useEffect(() => {
        displayCommittees()
            .then(res => setCommittees(res.data.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    const handleAddCmmtt = async (newCommittee) => {
        try {
            if (newCommittee.id) {
                const res = await updateCommittee(newCommittee.id, newCommittee);
                setCommittees((prev) =>
                    prev.map((com) => (com.id === newCommittee.id ? res.data.data : com))
                );
            } else {
                const res = await createCommittee(newCommittee);
                setCommittees((prev) => [...prev, res.data.data]);
            }
            setToUpCmmtts(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE Category:", err);
        }
    };

    const handleUpCmmtt = (cmmttToEdit) => {
        setToUpCmmtts(cmmttToEdit)
    }

    const handleDeleteCmmtt = async (id) => {
        try {
            await deleteCommittee(id);
            setCommittees((prev) => prev.filter((com) => com.id !== id));
        } catch (err) {
            console.error("Erreur on DELETE :", err);
        }
    };

    return (
        <>

            <h1 className="text-center text-2xl font-semibold mt-8 mb-4 font-poppins">
                CSE existants
            </h1>

            <section className=" max-w-5xl mx-auto">
                <AddCommittee onAddCommittee={handleAddCmmtt} onEditUpCmmtt={toUpCmmtts} />
                <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Renouvellement Auto</th>
                                <th className="px-4 py-2">Date début inscription</th>
                                <th className="px-4 py-2">Date fin d'inscirption</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {committees.map((committee) => (
                                <tr
                                    key={committee.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium bg-accent">{committee.name}</td>
                                    <td className="px-4 py-2 font-medium text-center">
                                        <span className={`text-white rounded px-3 py-1 text-sm ${committee.auto_renew ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        >
                                            {committee.auto_renew ? "Actif" : "Inactif"}{committee.auto_renew}</span></td>
                                    <td className="px-4 py-2 font-medium text-center">{committee.agreement_start_date}</td>
                                    <td className="px-4 py-2 font-medium text-center">{committee.agreement_end_date}</td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton item={committee} onUpdate={handleUpCmmtt} />
                                        <DeleteButton id={committee.id} onDelete={handleDeleteCmmtt} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>

    )
}