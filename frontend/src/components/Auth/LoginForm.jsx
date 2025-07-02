import { useState } from "react";
import { Textbox } from "react-inputs-validation";
import Icon from "@mdi/react";
import { mdiAccount, mdiAlert } from "@mdi/js";
import ToastAlert from "../ToastAlert";
import { getToken, loginRequest } from "../../services/authService";
import { fetchAuthUser } from "../../store/slices/authSlice";
import client from "../../api/axiosInstance";
import { useDispatch } from "react-redux";

export default function LoginForm() {
    const [email, setEmail] = useState("admin@example.com");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("manger12345");
    const [pswdError, setPswdError] = useState("");
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
    const dispatch = useDispatch()


    const handle = async (e) => {
        e.preventDefault();
        try {
            await getToken();
            const loginResponse = await loginRequest({ email, password });

            const token = loginResponse.data.token
            client.defaults.headers.common.Authorization = `Bearer ${token}`;
            const user = JSON.stringify(loginResponse.data)


            if (token && loginResponse) {
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", user);

            }
            await dispatch(fetchAuthUser())
                .then(() => {
                    // console.log('RESPONSE LOGIN FORM =>', res.payload); // → { email: "admin@example.com", role_id: 1, ... }
                    // const actualUser = res.payload; // ← Accédez au payload
                    // console.log(`${actualUser.role_name === "super_admin" ? 'Super Admin' : 'Utilisateur standard'}`);
                    window.location.href = "/#/";
                });
        } catch (err) {
            console.error(err.toString());
            // setToast({show: true, message:"Erreur lors de l'authentification", type:'error'})
            setToast({ show: true, message: `${err.toString()}`, type: 'error' })
        }
    };

    return (
        <div className="card bg-accent p-8 ring-2 ring-secondary w-80vw md:w-95">
            <Icon
                path={mdiAccount}
                size={3}
                className="mx-auto mb-4 text-accent bg-neutral rounded-full p-3 ring-1 ring-secondary"
            />
            <form onSubmit={handle} className="space-y-4">
                <div>
                    <label className="label mb-1">
                        <span className="label-text uppercase text-xs">Identifiant</span>
                    </label>
                    <Textbox
                        attributesInput={{
                            className: "input w-full ring-1 ring-secondary rounded-lg",
                            placeholder: "Votre email",
                            type: "email",
                        }}
                        value={email}
                        onChange={(value) => setEmail(value)}
                        onBlur={(e) => {
                            if (!e.target.value.trim()) {
                                setEmailError("L'adresse email ne doit pas être vide !")
                            }
                        }}
                    />
                    {emailError && (
                        <div className="flex w-75 mx-auto justify-center items-center text-red-700">
                            <Icon path={mdiAlert} size={0.75} />
                            <p className="ps-2 text-sm mt-1">{emailError}</p>
                        </div>
                    )}
                </div>

                <div>
                    <label className="label mb-1">
                        <span className="label-text uppercase text-xs">Mot de passe</span>
                    </label>
                    <Textbox
                        attributesInput={{
                            className: "input w-full ring-1 ring-secondary rounded-lg",
                            placeholder: "Votre mot de passe",
                            type: "password",
                            style: { borderRadius: '0.5em' }
                        }}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        onBlur={(e) => {
                            if (!e.target.value.trim()) {
                                setPswdError("Le mot de passe ne doit pas être vide !")
                            }
                        }}
                    />
                    {pswdError && (
                        <div className="flex w-75 mx-auto justify-center items-center text-red-700">
                            <Icon path={mdiAlert} size={0.75} />
                            <p className="ps-2 text-sm mt-1">{pswdError}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full uppercase text-xs mt-7"
                >
                    Se connecter
                </button>
                <ToastAlert toast={toast} setToast={setToast} />
            </form>
        </div>
    );
}
