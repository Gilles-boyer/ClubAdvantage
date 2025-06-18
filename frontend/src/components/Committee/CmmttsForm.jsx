import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert,  mdilAlertCircle } from '@mdi/light-js';
import { Textbox } from "react-inputs-validation";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import Button from "../Button";

// Enregistre la locale française pour react-datepicker
registerLocale("fr", fr);

export default function CommitteeForm({ onAddCommittee, onEditUpCmmtt, setToggle, onCancel }) {
    const [name, setName] = useState("");
    const [autoRenew, setAutoRenew] = useState(null);
    const [errorName, setErrorName] = useState(null);
    const [errorSelect, setErrorSelect] = useState("");
    const [startDate, setStartDate] = useState(null); // édition uniquement
    const [endDate, setEndDate] = useState(null);     // édition uniquement
    const [startDateErr, setStartDateErr] = useState("");
    const [endDateErr, setEndDateErr] = useState("");
    // const [newDate, setNewDate ]= useState(new Date().toISOString().slice(0, 10))

    useEffect(() => {
        if (onEditUpCmmtt) {
            setName(onEditUpCmmtt.name || "");
            setAutoRenew(onEditUpCmmtt.auto_renew);
            setStartDate(onEditUpCmmtt.agreement_start_date ? new Date(onEditUpCmmtt.agreement_start_date) : null);
            setEndDate(onEditUpCmmtt.agreement_end_date ? new Date(onEditUpCmmtt.agreement_end_date) : null);

        } else {
            reset();
        }
    }, [onEditUpCmmtt]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentStartDate = startDate
            ? startDate.toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10);

        const currentEndDate = endDate
            ? endDate.toISOString().slice(0, 10)
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
    }

        onAddCommittee(newCommittee);
        reset();
        setErrorName('');
    };

    const reset = () => {
        setName('');
        setAutoRenew(null);
        setStartDate(null);
        setEndDate(null);
        setErrorName('');
        setErrorSelect('');
        setStartDateErr('');
        setEndDateErr('');
    };


    return (
        <>

            <div className="w-80vw md:w-150 border rounded mx-auto my-5">
                <h3 className="font-poppins text-center text-white py-1 text-lg font-medium bg-primary">
                    {onEditUpCmmtt ? 'Modifier un CSE' : 'Ajouter un CSE'}
                </h3>
                <div className="p-5 mx-auto rounded">
                    <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
                    {onEditUpCmmtt && (<p className="flex text-red-400 justify-center mb-6">
                        <Icon path={mdilAlertCircle} size={1} />
                        Appuyez sur annuler si vous souhaitez annuler la saisie</p>)}
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
                                onChange={setName}
                                onBlur={(e) => {
                                        const v = e.target.value.trim();
                                    if (!v) setErrorName('Le Nom ne peut pas être vide !');
                                    else if (v.length > 255) setErrorName('Le Nom ne doit pas dépasser 255 caractères !');
                                    else setErrorName('');
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
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if (value === "null") {
                                        setAutoRenew(null);
                                        setErrorSelect('Choisir une valeur !');
                                    } else {
                                        setAutoRenew(parseInt(value, 10));
                                        setErrorSelect('');
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === "null") {
                                        setErrorSelect('Choisir une valeur !');
                                    }
                                }}
                            >
                                <option value="null">Choisir une valeur</option>
                                <option value="1">OUI</option>
                                <option value="0">NON</option>
                            </select>

                            {errorSelect && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errorSelect}
                                </div>
                            )}
                        </div>

                        {/* Dates (édition uniquement) */}
                        {onEditUpCmmtt && (
                            <>
                                <div className="form-control mb-4 flex flex-col">
                                    <label className="label">
                                        <span className="label-text text-center w-full">Date de début de l'accord</span>
                                    </label>

                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        locale="fr"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="JJ/MM/AAAA"
                                        className="input w-full text-center"
                                        onBlur={() => {
                                            if (startDate && endDate && startDate > endDate) {
                                                setStartDateErr('La date de début ne peut pas être supérieure à la date de fin !');
                                            } else {
                                                setStartDateErr('');
                                            }
                                        }}
                                    />
                                    {startDateErr && (
                                        <div className="flex w-100 mx-auto justify-center text-red-700 mt-3">
                                            <Icon path={mdilAlert} size={1} />
                                            <p className="ps-2 text-sm">{startDateErr}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control mb-4 flex flex-col">
                                    <label className="label">
                                        <span className="label-text text-center w-full">Date de fin de l'accord</span>
                                    </label>

                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        locale="fr"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="JJ/MM/AAAA"
                                        className="input w-full text-center"
                                        onBlur={() => {
                                            if (startDate && endDate && endDate < startDate) {
                                                setEndDateErr('La date de fin ne peut pas être inférieure à la date de début !');
                                            } else {
                                                setEndDateErr('');
                                            }
                                        }}
                                    />
                                    {endDateErr && (
                                        <div className="flex w-100 mx-auto justify-center text-red-700 mt-3">
                                            <Icon path={mdilAlert} size={1} />
                                            <p className="ps-2 text-sm">{endDateErr}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Bouton */}
                        <Button type="submit" label="valider" className="btn-neutral" />
                        <Button label="annuler" onAction={() => {
                            reset();
                            setToggle(false);
                            onCancel();
                        }} className="btn-error" />
                    </form>
                </div>
            </div>
        </>
    );
}
