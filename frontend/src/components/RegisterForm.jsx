import { useState } from "react";
import { Checkbox, Textbox } from "react-inputs-validation";
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import Button from "./Button";

export default function RegisterForm() {

    // ─── États des champs ─────────
    const [last_name, setLast_Name] = useState("");
    const [first_name, setFirst_Name] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPswd, setConfirmPswd] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(null)

    // ─── États d’erreur ────────────
    const [errorLN, setErrorLN] = useState("");
    const [errorFN, setErrorFN] = useState("");
    const [errorPSW, setErrorPSW] = useState("");
    const [errorCPSW, setErrorCPSW] = useState("")


    // ─── Validation avant submit ─────────
    const validateFields = () => {
        let validFields = true;

        // ───── Last Name ─────
        if (!last_name.trim()) {
            setErrorLN("Le Nom ne peut pas être vide !");
            validFields = false;

        } else if (last_name.length > 255) {
            setErrorLN("Le Nom ne doit pas dépasser 255 caractères !");
            validFields = false;
        }

        // ───── First Name ─────
        if (!first_name.trim()) {
            setErrorFN("Le Prénom ne peut pas être vide !");
            validFields = false;

        } else if (first_name.length > 255) {
            setErrorFN("Le Prénom ne doit pas dépasser 255 caractères !");
            validFields = false;
        }

        if(!password.trim()){
            setErrorPSW("Le Mot de Passe ne doit pas être vide !")
            validFields = false;
        } else if (password.length < 8) {
            setErrorPSW("Le Mot de Passe doit contenir au moins 8 caractères !");
            validFields = false;
        }

        if (confirmPswd !== password) {
            setErrorPSW("Les mots de passe doivent être identiques !");
            setErrorCPSW("Les mots de passe doivent être identiques !");
            validFields = false;
        }
        return validFields

    };

    const handleSubmit = async e => {
        e.preventDefault();

        /** Nettoyage des message d'erreurs */
        setErrorLN("");
        setErrorFN("");
        setErrorPSW("");
        setErrorCPSW("");

        if (!validateFields()) {
            return;
        }


        const newUser = {
            last_name: last_name,
            first_name: first_name,
            password: password,
            terms_accepted: termsAccepted,
        };
        confirm("Nouvel utilisateur enregistré :", newUser)
        console.log("Nouvel Utilisateur enregistré :", newUser);
        reset()


        // try {
        //     await onAddUser(newUser);
        //     reset();
        // } catch (err) {

        //     const errors = err?.errors || err?.response?.data?.errors;
        //     if (errors) {
        //         if (errors.last_name) setErrorLN(errors.last_name[0]);
        //         if (errors.first_name) setErrorFN(errors.first_name[0]);
        //         if (errors.password) setErrorPSW(errors.password[0]);
        //     } else {

        //         console.error(err);
        //     }
        // }
    };

    /** Nettoyage des champs après le submit */
    const reset = () => {
        setLast_Name(""); 
        setErrorLN("");
        setFirst_Name(""); 
        setErrorFN("");
        setPassword(""); 
        setErrorPSW("");
        setConfirmPswd(""); 
        setErrorCPSW("")
        setTermsAccepted(null)
    };

    return (
        <div className="w-200 mx-auto border rounded-lg bg-white">
            <h3 className="font-poppins text-center py-1 text-lg text-white bg-primary">
                Saisissez vos données
            </h3>
            <p className="flex text-xs md:text-base text-red-500 justify-center items-center mt-2">
                <Icon path={mdiAlertCircle} size={1} />
                Appuyez sur 'Annuler' si vous souhaitez annuler la saisie</p>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">

                <div className="grid md:grid-cols-4 gap-3">

                    {/* Nom */}
                    <div className="form-control mb-4 col-span-4 ">
                        <label className="label"><span>Nom</span></label>
                        <Textbox
                            attributesInput={{
                                id: "lastName",
                                name: "lastName",
                                className: "input input-bordered w-full",
                                placeholder: "Insérez votre Nom",
                            }}
                            value={last_name}
                            onChange={value => {
                                setLast_Name(value);
                                if (value.trim()) setErrorLN("");
                            }}
                        />
                        {errorLN && <p className="text-red-500 text-sm mt-1">{errorLN}</p>}
                    </div>

                    {/* Prénom */}
                    <div className="form-control mb-4 col-span-4 ">
                        <label className="label"><span>Prénom</span></label>
                        <Textbox
                            attributesInput={{
                                className: "input input-bordered w-full",
                                placeholder: "Insérez votre Prénom",
                            }}
                            value={first_name}
                            onChange={value => {
                                setFirst_Name(value);
                                if (value.trim()) setErrorFN("");
                            }}
                        />
                        {errorFN && <p className="text-red-500 text-sm mt-1">{errorFN}</p>}
                    </div>

                    {/* Email récupéré grâce au mail*/}

                    {/* Password (uniquement création) */}
                    <div className="form-control mb-4 col-span-4 ">
                        <label className="label"><span>Mot de passe</span></label>
                        <Textbox
                            attributesInput={{
                                'type': 'password',
                                className: "input input-bordered w-full",
                                placeholder: "Insérez votre mot de passe",
                            }}
                            value={password}
                            onChange={value => {
                                setPassword(value);
                                if (value.trim()) setErrorPSW("");
                            }}
                        />
                        {errorPSW && <p className="text-red-500 text-sm mt-1">{errorPSW}</p>}
                    </div>

                    <div className="form-control mb-4 col-span-4 ">
                        <label className="label"><span>Confirmez le Mot de Passe</span></label>
                        <Textbox
                            attributesInput={{
                                'type': 'password',
                                className: "input input-bordered w-full",
                                placeholder: "Confirmez votre mot de passe",
                            }}
                            value={confirmPswd}
                            onChange={value => {
                                setConfirmPswd(value);
                                if (value.trim()) setErrorCPSW("");
                            }}
                        />
                        {errorCPSW && <p className="text-red-500 text-sm mt-1">{errorCPSW}</p>}
                    </div>
                </div>
                <div className="form-control mb-4 col-span-4">
                    <label className="">
                        <Checkbox
                            checked={termsAccepted}
                            onChange={(value) => setTermsAccepted(value)}
                            required
                        />
                        <p>
                            J'accepte les <a href="#" className="underline text-blue-600">conditions générales d'utilisation</a>
                        </p>
                    </label>
                </div>

                {/* Boutons */}
                <div className="flex justify-center space-x-2">
                    <Button label="Valider" type="submit" className="btn-neutral" />
                    <Button
                        label="Annuler"
                        onAction={() => {
                            reset();
                        }}
                        className="btn-error"
                    />
                </div>
            </form>
        </div>
    );
}
