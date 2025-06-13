import { useEffect, useState } from "react";
import { Textbox } from "react-inputs-validation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCmmtts, listOfCommittees } from "../../store/slices/CommitteeSlice";
import { fetchRoles, listOfRoles } from "../../store/slices/rolesSlice";
import Button from "../Button";

export default function UsersForm({ onAddUser, onEditUser, onCancel, setToggle }) {
    const dispatch = useDispatch()
    const cmmtts = useSelector(listOfCommittees)
    const roles = useSelector(listOfRoles)

    // FIELDS VALUES & STATES
    const [last_name, setLast_Name] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [selectedCom, setSelectedCom] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)

    // ERROR MESSAGES
    const [errorFN, setErrorFN] = useState('')
    const [errorLN, setErrorLN] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPSW, setErrorPSW] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [errorCSE, setErrorCSE] = useState('')
    const [errorRole, setErrorRole] = useState('')

    useEffect(() => {
        if (onEditUser) {
            setLast_Name(onEditUser.last_name);
            setFirst_Name(onEditUser.first_name);
            setStatus(onEditUser.status);
        }
    }, [onEditUser]);

    useEffect(() => {
        dispatch(fetchCmmtts())
        dispatch(fetchRoles())
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const comObject = cmmtts.find((com) => com.id === selectedCom)
        const roleObject = roles.find((role) => role.id === selectedRole)

        const newUser = {
            last_name,
            first_name,
            email,
            password,
            role_id: selectedRole,
            role_name: roleObject?.name || '',
            status,
            committee_id: selectedCom,
            committee_name: comObject?.name || '',
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
        setLast_Name('')
        setFirst_Name('')
        setEmail('')
        setPassword('')
        setSelectedCom('')
        setSelectedRole('')
        setStatus('')
    };


    return (
        <>
            <div className="w-80vw border rounded mx-auto mt-2">
                <h3 className="font-poppins text-center py-1 text-lg text-white font-medium bg-primary">Ajouter un utilisateur</h3>
                <div className="p-5 mx-auto rounded">
                    <form onSubmit={handleSubmit} className="space">
                        <div className="grid md:grid-cols-4 gap-3">

                            {/* LAST NAME SECTION */}
                            <div className="form-control mb-4 col-span-2 ">
                                <label htmlFor="lastName" className="label">
                                    <span className="label-text">Nom</span>
                                </label>
                                <Textbox
                                    attributesInput={{
                                        id: "lastName",
                                        name: "lastName",
                                        type: "text",
                                        className: "input input-bordered w-full",
                                        placeholder: "Insérez le nom"
                                    }}
                                    value={last_name}
                                    onChange={(value) => setLast_Name(value)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            return setErrorLN('Le Nom ne peut pas être vide !')
                                        }
                                        if (e.target.value.length > 255) {
                                            return setErrorLN('Le Nom ne doit pas dépasser 255 caractères !')
                                        }
                                        if (typeof (e.target.value) !== "string") {
                                            return setErrorLN('Le Nom doit être une chaine de caractères !')
                                        }
                                        if (e.target.value.trim()) return setErrorLN('')
                                    }}
                                />
                                {errorLN && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errorLN}
                                    </div>
                                )}
                            </div>

                            {/* FISRT NAME SECTION */}
                            <div className="form-control mb-4 col-span-2">
                                <label htmlFor="firstName" className="label">
                                    <span className="label-text">Prenom</span>
                                </label>
                                <Textbox
                                    attributesInput={{
                                        id: "firstName",
                                        name: "firstName",
                                        type: "text",
                                        className: "input input-bordered w-full",
                                        placeholder: "Insérez le prénom"
                                    }}
                                    value={first_name}
                                    onChange={(value) => setFirst_Name(value)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            return setErrorFN('Le Prénom ne peut pas être vide !')
                                        }
                                        if (e.target.value.length > 255) {
                                            return setErrorFN('Le Prénom ne doit pas dépasser 255 caractères !')
                                        }
                                        if (typeof (e.target.value) !== "string") {
                                            return setErrorFN('Le Prénom doit être une chaine de caractères !')
                                        }
                                        if (e.target.value.trim()) return setErrorFN('')
                                    }}
                                />
                                {errorFN && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errorFN}
                                    </div>
                                )}
                            </div>

                            {/* EMAIL SECTION */}
                            <div className="form-control mb-4 col-span-4">
                                <label htmlFor="firstName" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <Textbox
                                    attributesInput={{
                                        id: "email",
                                        name: "email",
                                        type: "text",
                                        className: "input input-bordered w-full",
                                        placeholder: "Insérez l'adresse email"
                                    }}
                                    value={email}
                                    onChange={(value) => setEmail(value)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            return setErrorEmail("L'email ne peut pas être vide !")
                                        }
                                        if (e.target.value.length > 255) {
                                            return setErrorEmail("L'email ne doit pas dépasser 255 caractères !")
                                        }
                                        if (typeof (e.target.value) !== "string") {
                                            return setErrorEmail("L'email doit être une chaine de caractères !")
                                        }
                                        if (e.target.value.trim()) return setErrorEmail('')
                                    }}
                                />
                                {errorEmail && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errorEmail}
                                    </div>
                                )}
                            </div>

                            {/* PASSWORD SECTION */}
                            <div className="form-control mb-4 col-span-4">
                                <label htmlFor="firstName" className="label">
                                    <span className="label-text">Mot De Passe</span>
                                </label>
                                <Textbox
                                    attributesInput={{
                                        id: "password",
                                        name: "password",
                                        type: "text",
                                        className: "input input-bordered w-full",
                                        placeholder: "Insérez le mot de passe"
                                    }}
                                    value={password}
                                    onChange={(value) => setPassword(value)}
                                    onBlur={(e) => {
                                        if (!e.target.value.trim()) {
                                            return setErrorPSW('Le Mot de Passe ne peut pas être vide !')
                                        }
                                        if (e.target.value.length > 255) {
                                            return setErrorPSW('Le Mot de Passe ne doit pas dépasser 255 caractères !')
                                        }
                                        if (e.target.value.trim()) return setErrorPSW('')
                                    }}
                                />
                                {errorPSW && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errorPSW}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* STATUS SECTION */}
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="form-control mb-4 span-col">
                                <label htmlFor="status" className="label">
                                    <span className="label-text">Définir le statut</span>
                                </label>
                                <select className="select w-full"
                                    value={status}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "null") {
                                            setStatus(null);
                                            setErrorStatus('Choisir une valeur pour le statut !');
                                        } else {
                                            setStatus(value);
                                            setErrorStatus('');
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value === "null") {
                                            setErrorStatus('Choisir une valeur pour le statut!');
                                        }
                                    }}>
                                    <option value="null">Choisir un statut</option>
                                    <option value='active'>Actif</option>
                                    <option value='inactive'>Inactif</option>
                                    <option value='expired'>Expiré</option>
                                </select>
                                {errorStatus && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errorStatus}
                                    </div>
                                )}
                            </div>
                            <div className="form-control mb-4 span-col">
                                <label htmlFor="committee" className="label">
                                    <span className="label-text">Définir le CSE</span>
                                </label>
                                <select className="select w-full" value={selectedCom === null ? "" : selectedCom}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "null") {
                                            setSelectedCom(null);
                                            setErrorCSE('Choisir une valeur pour le CSE !');
                                        } else {
                                            setSelectedCom(String(value));
                                            setErrorCSE('');
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value === "null") {
                                            setErrorCSE('Choisir une valeur pour le CSE!');
                                        }
                                    }}>
                                    <option value="null">Choisir un CSE</option>
                                    {cmmtts.map((com) => (
                                        <option key={com.id} value={com.id}>{com.name}</option>
                                    ))}
                                    {errorCSE && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errorCSE}
                                        </div>
                                    )}
                                </select>
                            </div>

                            {/* ROLE SECTION */}
                            <div className="form-control mb-4 span-col">
                                <label htmlFor="role" className="label">
                                    <span className="label-text">Définir le Role</span>
                                </label>
                                <select className="select w-full" value={selectedRole === null ? "" : selectedRole} 
                                onChange={(e) => setSelectedRole(e.target.value)}>
                                    <option value="null">Choisir un Role</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* BUTTONS SECTION*/}
                        <div className="flex justify-center space-x-2 mt-5">
                            <Button label={'valider'} type="submit" className={'btn-neutral'} />
                            <Button label={'annuler'} onAction={() => {
                                reset();
                                setToggle(false)
                                onCancel()
                            }} className={'btn-error'} />
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}