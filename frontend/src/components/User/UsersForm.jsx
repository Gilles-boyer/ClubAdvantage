import { useEffect, useState } from "react";
import { displayCommittees } from "../../services/committeeService";
import { Textbox } from "react-inputs-validation";

export default function UsersForm({ onAddUser, onEditUser }) {
    const [lName, setLName] = useState('');
    const [fName, setFName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [cmmtts, setCmmtts] = useState([]); //? Pour récupérer les propriétés
    const [selectedCom, setSelectedCom] = useState(null) //? Pour afficher les valeurs lors de l'update

    useEffect(() => {
        if (onEditUser) {
            setLName(onEditUser.last_name);
            setFName(onEditUser.first_name);
            setEmail(onEditUser.email);
            setStatus(onEditUser.status);
        }
    }, [onEditUser]);

    useEffect(() => {
        displayCommittees()
            .then(res => {
                const listCom = res.data.data
                const ArrayCom = listCom.map((com) => ({
                    id: com.id,
                    name: com.name
                }))
                console.log('reponse api :', res)
                setCmmtts(ArrayCom)
            })
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const comObject = cmmtts.find((com) => com.id === selectedCom)

        const newUser = {
            last_name,
            first_name,
            email,
            password,
            status: "inactive",
            committee_id: selectedCom,
            committee_name: comObject?.name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        if (onEditUser?.id !== undefined) {
            newUser.id = onEditUser.id;
        } else {
            newUser.created_at = new Date().toISOString();
        }

        onAddUser(newUser);
        reset();
    }

    const reset = () => {

    };


    return (
        <>
            <div className="w-150 border rounded mx-auto mt-10">
                <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">Ajouter une Offre</h3>
                <div className="p-5 mx-auto rounded">
                    <form onSubmit={handleSubmit} className="spacetext-center">
                        <div className="form-control mb-4">
                            <label htmlFor="lastName" className="label">
                                <span className="label-text">Nom</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "lastName",
                                    name: "lastName",
                                    type: "text",
                                    className: "input input-bordered w-full",
                                    placeholder: "Nom"
                                }}
                                value={lName}
                                onChange={(value) => setLName(value)}
                                onBlur={() => {

                                }}
                            />
                            {/* {errorTitle && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorTitle}</p></div>} */}
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="firstName" className="label">
                                <span className="label-text">Prenom</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "firstName",
                                    name: "firstName",
                                    type: "text",
                                    className: "input input-bordered w-full",
                                    placeholder: "Prénom"
                                }}
                                value={fName}
                                onChange={(value) => setFName(value)}
                                onBlur={() => {

                                }}
                            />
                            {/* {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>} */}
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "email",
                                    name: "email",
                                    type: "email",
                                    className: "input input-bordered w-full",
                                    placeholder: "Email"
                                }}
                                value={email}
                                onChange={(value) => setEmail(value)}
                                onBlur={() => {

                                }}
                            />
                            {/* {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>} */}
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Mot de Passe</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "password",
                                    name: "password",
                                    type: "text",
                                    className: "input input-bordered w-full",
                                    placeholder: "Mot de passe"
                                }}
                                value={password}
                                onChange={(value) => setPassword(value)}
                                onBlur={() => {

                                }}
                            />
                            {/* {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>} */}
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="status" className="label">
                                <span className="label-text">Définir le statut</span>
                            </label>
                            <select className="select w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option disabled value="">Choisir un statut</option>
                                <option value='active'>Actif</option>
                                <option value='inactive'>Inactif</option>
                                <option value='expired'>Expiré</option>
                            </select>

                            <label htmlFor="committee" className="label">
                                <span className="label-text">Définir le CSE</span>
                            </label>
                            <select className="select w-full" value={selectedCom} onChange={(e) => setSelectedCom(e.target.value)}>
                                <option disabled value="">Choisir un CSE</option>
                                {cmmtts.map((com) => (
                                    <option key={com.id} value={String(com.id)}>{com.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-neutral">
                                Valider
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}