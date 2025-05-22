import { useState, useEffect } from "react";
import AddCommittee from "./CmmttsForm";
import { createCommittee, displayCommittees, updateCommittee, deleteCommittee } from "../../services/committeeService";
import CmmttsTable from "./CmmttsTable";


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

    const handleUpdate = (cmmttToEdit) => {
        setToUpCmmtts(cmmttToEdit)
    }

    const handleDelete = async (id) => {
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
                < CmmttsTable 
                committees={committees}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                />
            </section>
        </>

    )
}