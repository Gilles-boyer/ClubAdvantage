import { useEffect, useState } from "react";
import { Textbox } from "react-inputs-validation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCmmtts, listOfCommittees } from "../../store/slices/committeeSlice";
import { fetchRoles, listOfRoles } from "../../store/slices/rolesSlice";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import Button from "../Button";

export default function UsersForm({ onAddUser, onEditUser, onCancel, setToggle }) {
    const dispatch   = useDispatch();
    const cmmtts     = useSelector(listOfCommittees);
    const roles      = useSelector(listOfRoles);

    // ─── États des champs ─────────
    const [last_name,   setLast_Name]   = useState("");
    const [first_name,  setFirst_Name]  = useState("");
    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [status,      setStatus]      = useState("");
    const [selectedCom, setSelectedCom] = useState("");
    const [selectedRole,setSelectedRole]= useState("");

    // ─── États d’erreur ────────────
    const [errorLN, setErrorLN]        = useState("");
    const [errorFN, setErrorFN]        = useState("");
    const [errorEmail, setErrorEmail]  = useState("");
    const [errorPSW, setErrorPSW]      = useState("");
    const [errorStatus, setErrorStatus]=useState("");
    const [errorCSE, setErrorCSE]      = useState("");
    const [errorRole, setErrorRole]    = useState("");

    useEffect(() => {
        dispatch(fetchCmmtts());
        dispatch(fetchRoles());
    }, [dispatch]);

    // Remplissage en mode édition
    useEffect(() => {
        if (onEditUser) {
            setLast_Name(onEditUser.last_name || "");
            setFirst_Name(onEditUser.first_name || "");
            setEmail(onEditUser.email || "");
            setSelectedRole(onEditUser.role_id || "");
            setSelectedCom(onEditUser.committee_id || "");
            setStatus(onEditUser.status || "");
        }
    }, [onEditUser]);

    // ─── Validation avant submit ─────────
    const validateAll = () => {
        let ok = true;

        // ───── Last Name ─────
        if (!last_name.trim()) {
            setErrorLN("Le Nom ne peut pas être vide !");
            ok = false;

        } else if (last_name.length > 255) {
            setErrorLN("Le Nom ne doit pas dépasser 255 caractères !");
            ok = false;
        }

        // ───── First Name ─────
        if (!first_name.trim()) {
            setErrorFN("Le Prénom ne peut pas être vide !");
            ok = false;

        } else if (first_name.length > 255) {
            setErrorFN("Le Prénom ne doit pas dépasser 255 caractères !");
            ok = false;
        }

        // ───── Email ─────
        if (!email.trim()) {
            setErrorEmail("L'email ne peut pas être vide !");
            ok = false;

        } else {
            // simple regex de base pour valider un email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErrorEmail("L'email n'est pas valide !");
                ok = false;
            }
        }

        // ───── Password (création) ─────
        if (!onEditUser) {
            if (!password.trim()) {
                setErrorPSW("Le Mot de Passe ne peut pas être vide !");
                ok = false;

            } else if (password.length < 6) {
                setErrorPSW("Le Mot de Passe doit faire au moins 6 caractères !");
                ok = false;

            } else if (password.length > 255) {
                setErrorPSW("Le Mot de Passe ne doit pas dépasser 255 caractères !");
                ok = false;
            }
        }

        // ───── Selects ─────
        // — on détermine d’abord le rôle courant (création vs édition) —
        const currentRole = onEditUser
            ? onEditUser.role_id       // en édition, on prend l’ID déjà existant
            : Number(selectedRole);    // en création, on convertit la chaîne en nombre

        // Statut toujours requis
        if (!status) {
            setErrorStatus("Choisir un statut !");
            ok = false;
        }

        // Si c’est un CSE (ID 3 ou 4), on réclame aussi la sélection d’un comité
        if ([3, 4].includes(currentRole)) {
            if (!selectedCom) {
            setErrorCSE("Choisir un comité !");
            ok = false;
            }
        }
        // Sinon on efface toute ancienne erreur CSE
        else {
            setErrorCSE("");
        }

        // En création seulement, s’assurer qu’un rôle est choisi
        if (!onEditUser && !selectedRole) {
            setErrorRole("Choisir un rôle !");
            ok = false;
        }

        return ok;
    };
    
    const handleSubmit = async e => {
        e.preventDefault();

        // réinitialise TOUS les messages d’erreur
        setErrorLN(""); setErrorFN(""); setErrorEmail("");
        setErrorPSW(""); setErrorStatus(""); setErrorCSE(""); setErrorRole("");

        if (!validateAll()) {
            return; // on arrête l’envoi
        }

        // composition de l’objet user
        const comObj  = cmmtts.find(com => com.id === +selectedCom);
        const roleObj = roles.find(role => role.id === +selectedRole);
        const CseRole = ['cse_admin','cse_member'].includes(roleObj?.name);

        const newUser = {
            last_name,
            first_name,
            email,
            ...(onEditUser ? {} : { password }),
            status,
            role_id: +selectedRole,
            role_name: roleObj?.name || "",
            // on n’envoie le committee_id QUE pour les rôles CSE
            ...(CseRole
                ? { committee_id: Number(selectedCom), committee_name: comObj?.name || '' }
                : { committee_id: null }
            ),
            ...(onEditUser ? { id: onEditUser.id } : { created_at: new Date().toISOString() }),
        };

        try {
            await onAddUser(newUser);
            reset();
        } catch (err) {

            const errors = err?.errors || err?.response?.data?.errors;
            if (errors) {
                if (errors.last_name)  setErrorLN(errors.last_name[0]);
                if (errors.first_name) setErrorFN(errors.first_name[0]);
                if (errors.email)      setErrorEmail(errors.email[0]);
                if (errors.password)   setErrorPSW(errors.password[0]);
                if (errors.committee_id) setErrorCSE(errors.committee_id[0]);
            } else {

                console.error(err);
            }
        }
    };

    // ─── Effacement des champs & erreurs ──
    const reset = () => {
        setLast_Name("");    setErrorLN("");
        setFirst_Name("");   setErrorFN("");
        setEmail("");        setErrorEmail("");
        setPassword("");     setErrorPSW("");
        setStatus("");       setErrorStatus("");
        setSelectedCom("");  setErrorCSE("");
        setSelectedRole(""); setErrorRole("");
    };

    return (
        <div className="w-80vw border rounded mx-auto mt-2">
            <h3 className="font-poppins text-center py-1 text-lg text-white bg-primary">
                {onEditUser ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
            </h3>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">

                <div className="grid md:grid-cols-4 gap-3">

                    {/* Nom */}
                    <div className="form-control mb-4 col-span-2 ">
                        <label className="label"><span>Nom</span></label>
                        <Textbox
                            attributesInput={{
                                id: "lastName",
                                name: "lastName",
                                className: "input input-bordered w-full",
                                placeholder: "Insérez le nom",
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
                    <div className="form-control mb-4 col-span-2 ">
                        <label className="label"><span>Prénom</span></label>
                        <Textbox
                            attributesInput={{
                                className: "input input-bordered w-full",
                                placeholder: "Insérez le prénom",
                            }}
                            value={first_name}
                            onChange={value => {
                                setFirst_Name(value);
                                if (value.trim()) setErrorFN("");
                            }}
                        />
                        {errorFN && <p className="text-red-500 text-sm mt-1">{errorFN}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control mb-4 col-span-2 ">
                        <label className="label"><span>Email</span></label>
                        <Textbox
                            attributesInput={{
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

                    {/* Password (uniquement création) */}
                    {!onEditUser && (
                        <div className="form-control mb-4 col-span-2 ">
                            <label className="label"><span>Mot de passe</span></label>
                            <Textbox
                                attributesInput={{
                                    className: "input input-bordered w-full",
                                    placeholder: "Insérez le mot de passe",
                                }}
                                value={password}
                                onChange={value => {
                                    setPassword(value);
                                    if (value.trim()) setErrorPSW("");
                                }}
                            />
                            {errorPSW && <p className="text-red-500 text-sm mt-1">{errorPSW}</p>}
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Statut */}
                    <div>
                        <label className="label"><span>Statut</span></label>
                        <select
                            className="select w-full"
                            value={status}
                            onChange={e => {
                                setStatus(e.target.value);
                                if (e.target.value) setErrorStatus("");
                            }}
                        >
                        <option value="">Choisir un statut</option>
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                        <option value="expired">Expiré</option>
                        </select>
                        {errorStatus && <p className="text-red-500 text-sm mt-1">{errorStatus}</p>}
                    </div>

                    {/* Comité */}
                    {(onEditUser? [3,4].includes(onEditUser.role_id): [3,4].includes(Number(selectedRole))) && (
                        <div>
                            <label className="label"><span>Définir le CSE</span></label>
                            <select
                                className="select w-full"
                                value={selectedCom}
                                onChange={e => {
                                    setSelectedCom(e.target.value);
                                    if (e.target.value) setErrorCSE("");
                                }}
                            >
                                <option value="">Choisir un CSE</option>
                                {cmmtts.map(com => (
                                    <option key={com.id} value={com.id}>{com.name}</option>
                                ))}
                            </select>
                            {errorCSE && <p className="text-red-500 text-sm mt-1">{errorCSE}</p>}
                        </div>
                    )}

                    {/* Rôle */}
                    <div>
                        <label className="label"><span>Rôle</span></label>
                        <select
                            className="select w-full"
                            value={selectedRole}
                            onChange={e => {
                                setSelectedRole(e.target.value);
                                if (e.target.value) setErrorRole("");
                            }}
                        >
                            <option value="">Choisir un rôle</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                        {errorRole && <p className="text-red-500 text-sm mt-1">{errorRole}</p>}
                    </div>
                </div>

                    {/* Boutons */}
                    <div className="flex justify-center space-x-2">
                        <Button label="Valider" type="submit" className="btn-neutral" />
                        <Button
                            label="Annuler"
                            onAction={() => {
                                reset();
                                setToggle(false);
                                onCancel();
                            }}
                            className="btn-error"
                        />
                    </div>
            </form>
        </div>
    );
}
