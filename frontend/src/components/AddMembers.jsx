import { useState } from "react";
import { createMember } from "../services/memberService";

export default function AddMembers() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        createMember({
            lastName: lastName,
            firstName: firstName,
            email: email,
            telephone: phone,
            status: status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
            .then(() => {
                alert("Membre Enregistré !");
                reset();
            })
            .catch((err) => {
                console.error("Error POST :", err);
                console.log(err.response);

            });
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const reset = () => {
        setLastName("");
        setFirstName("");
        setEmail("");
        setPhone("");
        setStatus("");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="spacetext-center space-y-2 my-3 bg-accent p-6 rouned w-fit mx-auto">
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={lastName}
                        onChange={onChangeLastName}
                        className="input block mx-auto"
                    />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prenom"
                        value={firstName}
                        onChange={onChangeFirstName}
                        className="input block mx-auto"
                    />
                </div>
                <div className="flex flex-col space-y-2" block mx-auto>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChangeEmail}
                        className="input block mx-auto"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Numéro de téléphone"
                        value={phone}
                        onChange={onChangePhone}
                        className="input block mx-auto"
                    />
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="input block mx-auto">
                        <label htmlFor="status">Choisissez le statut :</label>

                        <select id="" name="members" value={status} onChange={onChangeStatus}>
                            <option value="">Choisir le statut</option>
                            <option value="active">actif</option>
                            <option value="inactive">inactif</option>
                            <option value="expired">expiré</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-outline btn-neutral text-xs uppercase mx-auto">
                        Enregistrer
                    </button>
                </div>
            </form>
        </>
    )
}


