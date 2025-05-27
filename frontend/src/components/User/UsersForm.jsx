import { useEffect, useState } from "react";
import { Textbox } from "react-inputs-validation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCmmtts, listOfCommittees } from "../../store/slices/CommitteeSlice";
import { fetchRoles, listOfRoles } from "../../store/slices/rolesSlice";

export default function UsersForm({ onAddUser, onEditUser }) {
    const [last_name, setLast_Name] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const cmmtts = useSelector(listOfCommittees)
    const [selectedCom, setSelectedCom] = useState(null) //? Pour afficher les valeurs lors de l'update
    const roles = useSelector(listOfRoles)
    const [role_name, setRole_Name] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (onEditUser) {
            setLast_Name(onEditUser.last_name);
            setFirst_Name(onEditUser.first_name);
            setEmail(onEditUser.email);
            setStatus(onEditUser.status);
            setSelectedCom(onEditUser.committee_name);
            setRole_Name(String(onEditUser.role_id))
        } else {
            reset()
        }
    }, [onEditUser]);

    useEffect(() => {
        dispatch(fetchCmmtts())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const comObject = cmmtts.find((com) => com.id === selectedCom)
        const roleObject = roles.find((role) => role.name === role_name)

        const newUser = {
            last_name,
            first_name,
            email,
            password,
            role_name: roleObject?.name,
            status,
            committee_id: selectedCom,
            committee_name: comObject?.name,
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
        setFirst_Name('')
        setLast_Name('')
        setEmail('')
        setRole_Name('')
        setStatus('')
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
                                value={last_name}
                                onChange={(value) => setLast_Name(value)}
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
                                value={first_name}
                                onChange={(value) => setFirst_Name(value)}
                                onBlur={() => {

                                }}
                            />
                            {/* {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>} */}
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="firstName" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "email",
                                    name: "email",
                                    type: "text",
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
                            <label htmlFor="firstName" className="label">
                                <span className="label-text">Mot De Passe</span>
                            </label>
                            <Textbox
                                attributesInput={{
                                    id: "password",
                                    name: "password",
                                    type: "text",
                                    className: "input input-bordered w-full",
                                    placeholder: "Mot De Passe"
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
                            <label htmlFor="role" className="label">
                                <span className="label-text">Définir le Role</span>
                            </label>
                            <select className="select w-full" value={role_name} onChange={(e) => setRole_Name(e.target.value)}>
                                <option disabled value="">Choisir un Role</option>
                                {roles.map((r) => (
                                    <option key={r.name} value={String(r.name)}>{r.name}</option>
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