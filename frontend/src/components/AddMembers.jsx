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
            <form onSubmit={handleSubmit} className="spacetext-center space-y-2 my-3 bg-gray p-6 rounded">
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={lastName}
                        onChange={onChangeLastName}
                        className="border rounded p-2 bg-white"
                    />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prenom"
                        value={firstName}
                        onChange={onChangeFirstName}
                        className="border rounded p-2 bg-white"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChangeEmail}
                        className="border rounded p-2 bg-white"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Numéro de téléphone"
                        value={phone}
                        onChange={onChangePhone}
                        className="border rounded p-2 bg-white"
                    />
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="space-x-3 bg-white p-2 rounded">
                        <label htmlFor="status">Choisissez le statut :</label>

                        <select id="" name="members" value={status} onChange={onChangeStatus}>
                            <option value="">Choisir le statut</option>
                            <option value="active">actif</option>
                            <option value="inactive">inactif</option>
                            <option value="expired">expiré</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-dark text-white px-3 py-3 rounded text-xs uppercase mx-auto">
                        Enregistrer
                    </button>
                </div>
            </form>
        </>
    )
}


