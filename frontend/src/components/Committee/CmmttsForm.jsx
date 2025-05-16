import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textbox } from "react-inputs-validation";

export default function AddCommittee({ onAddCommittee, onEditUpCmmtt }) {
    const [name, setName] = useState("");
    const [autoRenew, setAutoRenew] = useState(null);
    const [errorName, setErrorName] = useState(null);
    const [startDate, setStartDate] = useState(""); // édition uniquement
    const [endDate, setEndDate] = useState("");     // édition uniquement
    const [startDateErr, setStartDateErr] = useState("")
    const [endDateErr, setEndDateErr] = useState("")

    useEffect(() => {
        if (onEditUpCmmtt) {
            setName(onEditUpCmmtt.name || "");
            setAutoRenew(onEditUpCmmtt.auto_renew);
            setStartDate(onEditUpCmmtt.agreement_start_date?.slice(0, 10) || "");
            setEndDate(onEditUpCmmtt.agreement_end_date?.slice(0, 10) || "");
        } else {
            reset();
        }
    }, [onEditUpCmmtt]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentStartDate = onEditUpCmmtt //? En mode édition, si une date existe elle est récupérée, sinon elle est créer à la date du jour
            ? startDate
            : new Date().toISOString().slice(0, 10);

        const currentEndDate = onEditUpCmmtt //? En mode édition, si une date existe elle est récupérée, sinon elle est créer à la date du 31/12 de l'année en cours
            ? endDate
            : `${new Date().getFullYear()}-12-31`;

        const newCommittee = {
            name,
            auto_renew: autoRenew,
            agreement_start_date: currentStartDate,
            agreement_end_date: currentEndDate,
            created_by: 1,
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
        setName('');
        setAutoRenew(null);
        setStartDate('');
        setEndDate('');
        setStartDateErr('');
    };
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className='flex w-fit'>
                <button onClick={() => setToggle(!toggle)} className='btn btn-secondary uppercase font-medium text-xs hover:bg-primary hover:text-white'>Ajouter un adhérent</button>
            </div>
            {toggle && (
                <div className="w-150 border rounded mx-auto mt-5">
                    <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">
                        {onEditUpCmmtt ? 'Modifier un CSE' : 'Ajouter un CSE'}
                    </h3>
                    <div className="p-5 mx-auto rounded">
                        <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">

                            {/* Champ nom */}
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
                                        if (!e.target.value.trim()) return setErrorName('Le Nom ne peut pas être vide !');
                                        if (e.target.value.length > 255) return setErrorName('Le Nom ne doit pas dépasser 255 caractères !');
                                        if (typeof e.target.value !== "string") return setErrorName('Le Nom doit être une chaine de caractères !');
                                    }}
                                />
                                {errorName && (
                                    <div className="flex w-75 mx-auto justify-center text-red-700">
                                        <Icon path={mdilAlert} size={1} />
                                        <p className="ps-2 text-sm mt-1">{errorName}</p>
                                    </div>
                                )}
                            </div>

                            {/* Champ auto-renew */}
                            <div className="form-control mb-4">
                                <label htmlFor="AutoRenew" className="label">
                                    <span className="label-text">Renouvellement automatique du CSE</span>
                                </label>
                                <select
                                    className="select w-full"
                                    value={autoRenew === null ? "" : String(autoRenew)}
                                    onChange={(e) => setAutoRenew(parseInt(e.target.value, 10))}
                                >
                                    <option value="">Choisir une valeur</option>
                                    <option value="1">OUI</option>
                                    <option value="0">NON</option>
                                </select>
                            </div>


                            {onEditUpCmmtt && (
                                <>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Date de début de l'accord</span>
                                        </label>
                                        <Textbox
                                            attributesInput={{
                                                id: "startDate",
                                                name: "startDate",
                                                type: "text",
                                                placeholder: "AAAA-MM-JJ",
                                                className: "input input-bordered w-full"
                                            }}
                                            value={startDate}
                                            onChange={(value) => setStartDate(value)}
                                            onBlur={(e) => {
                                                const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                                                if (!regexDate.test(e.target.value)) {
                                                    return setStartDateErr("le format de date est invalide !");
                                                } else {
                                                    return setStartDateErr("")
                                                }
                                            }}
                                        />
                                        {startDateErr && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{startDateErr}</p></div>}
                                    </div>

                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Date de fin de l'accord</span>
                                        </label>
                                        <Textbox
                                            attributesInput={{
                                                id: "endDate",
                                                name: "endDate",
                                                type: "text",
                                                placeholder: "AAAA-MM-JJ",
                                                className: "input input-bordered w-full"
                                            }}
                                            value={endDate}
                                            onChange={(value) => setEndDate(value)}
                                            onBlur={(e) => {
                                                const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                                                if (!regexDate.test(e.target.value)) {
                                                    return setEndDateErr("le format de date est invalide !");
                                                } else {
                                                    return setEndDateErr("")
                                                }
                                            }}
                                        />
                                        {endDateErr && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{endDateErr}</p></div>}
                                    </div>
                                </>
                            )}

                            {/* Bouton */}
                            <button type="submit" className="btn btn-neutral">
                                Valider
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>);
}
