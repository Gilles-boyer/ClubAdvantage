import { useState } from "react";
import { Textbox } from "react-inputs-validation";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";


export default function InvitationForm() {
    const [email, setEmail] = useState("")
    const { errorEmail, setErrorEmail } = useState("")

    const validateFields = () => {
        let validFields = true;

        // ───── Last Name ─────
        if (!email.trim()) {
            setErrorEmail("L'email ne peut pas être vide !");
            validFields = false;

        } else if (email.length) {
            setErrorEmail("L'adresse email n'est pas valide !");
            validFields = false;
        }

        return validFields

    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!validateFields){
            return
        }
        
        const invitationUser = {
            email: email,
            committee_id: 4,
            committee_name: 'Greenholt, Feest and Durgan',
            role_id: 4,
            role_name: 'cse_member'
        }

        console.log("Email envoyé à => ", invitationUser);

        // reset()
    }

    const reset = () => {
        setEmail("")
        setErrorEmail("")
    }
    return (
        <>
            <div className="w-200 mx-auto border rounded-lg bg-white mt-7">
                <h3 className="font-poppins text-center py-1 text-lg text-white bg-primary">
                    Saisissez l'email du Membre
                </h3>
                <p className="flex text-xs md:text-base text-red-500 justify-center items-center mt-2">
                    <Icon path={mdiAlertCircle} size={1} />
                    Appuyez sur 'Annuler' si vous souhaitez annuler la saisie</p>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    {/* Nom */}
                    <div className="form-control mb-4 col-span-2 ">
                        <label className="label"><span>Email</span></label>
                        <Textbox
                            attributesInput={{
                                'type': 'email',
                                className: "input input-bordered w-full",
                                placeholder: "Insérez l'adresse email",
                            }}
                            value={email}
                            onChange={value => {
                                setEmail(value);
                                if (value.trim()) setErrorEmail("");
                            }}
                        />
                        {errorEmail && <p className="text-red-500 text-sm mt-1">{errorEmail}</p>}
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
        </>
    )
}