import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textbox } from "react-inputs-validation";

export default function AddCommittee({ onAddCommittee, onEditUpCmmtt }) {
    const [name, setName] = useState("")
    const [autoRenew, setAutoRenew] = useState()
    const [errorName, setErrorName] = useState(false)
    // const [errorRenew, setErrorRenew] = useState("")
    const [selectedValue, setSelectedValue] = useState("")

    useEffect(() => {
        if (onEditUpCmmtt) {
            setName(onEditUpCmmtt.name);
            setAutoRenew(onEditUpCmmtt.auto_renew);
        }
    }, [onEditUpCmmtt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('valeur de selectedCmmtt :', selectedCmmtt);

        const newCommittee = {
            name: name,
            auto_renew: autoRenew,
        };

        if (onEditUpCmmtt?.id !== undefined) {
            newCommittee.id = onEditUpCmmtt.id;
        } else {
            newCommittee.created_at = new Date().toISOString();
        }

        onAddCommittee(newCommittee);
        reset();
        setErrorName('');
    };

    const reset = () => {
        setName('')
        setAutoRenew(false)
    };

    return (
        <div className="w-150 border rounded mx-auto mt-5">
            <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">Ajouter un CSE</h3>
            <div className="p-5 mx-auto rounded">
                <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
                    <div className="form-control mb-4">
                        <label htmlFor="nameCommittee" className="label">
                            <span className="label-text">Nom du CSE</span>
                        </label>
                        <Textbox
                            attributesInput={{
                                id: "nameCommittee",
                                name: "nameCommittee",
                                type: "text",
                                className: "input input-bordered w-full",
                                placeholder: "Nom du CSE"
                            }}
                            value={name}
                            onChange={(value) => setName(value)}
                            onBlur={(e) => {
                                if (!e.target.value.trim()) {
                                    return setErrorName('Le Nom ne peut pas être vide !')
                                }
                                if (e.target.value.length > 255) {
                                    return setErrorName('Le Nom ne doit pas dépasser 255 caractères !')
                                }
                                if (typeof (e.target.value) !== "string") {
                                    return setErrorName('Le Nom doit être une chaine de caractères !')
                                }
                            }}
                        />
                        {errorName && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorName}</p></div>}
                    </div>

                    <div className="form-control mb-4">
                        <label htmlFor="AutoRenew" className="label">
                            <span className="label-text">Renouvellement automatique du CSE</span>
                        </label>
                        <select
                            value={selectedValue}
                            onChange={(e) => {
                                const value = e.target.value === "true";
                                setAutoRenew(value);
                                setSelectedValue(e.target.value);
                            }}
                        >
                            <option value="">Choisir une valeur</option>
                            <option value="true">OUI</option>
                            <option value="false">NON</option>
                        </select>
                        {/* {errorRenew && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorRenew}</p></div>} */}
                    </div>
                    <button type="submit" className="btn btn-neutral">
                        Valider
                    </button>
                </form>
            </div>
        </div>
    );
}