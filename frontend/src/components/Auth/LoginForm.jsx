import { useState } from "react";
import { Textbox } from "react-inputs-validation";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import ToastAlert from "../ToastAlert";
import { getToken, loginRequest } from "../../services/authService";
import { fetchAuthUser } from "../../store/slices/authSlice";
import client from "../../api/axiosInstance";
import { useDispatch } from "react-redux";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                .then((res) => {
                    console.log('RESPONSE LOGIN FORM =>', res.payload); // → { email: "admin@example.com", role_id: 1, ... }
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
        <div className="card bg-accent p-8 ring-2 ring-secondary">
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
                            className: "input w-full ring-1 ring-secondary",
                            placeholder: "Votre email",
                            type: "email",
                        }}
                        value={email}
                        onChange={(value) => setEmail(value)}
                        onBlur={() => { }}
                    />
                </div>

                <div>
                    <label className="label mb-1">
                        <span className="label-text uppercase text-xs">Mot de passe</span>
                    </label>
                    <Textbox
                        attributesInput={{
                            className: "input w-full ring-1 ring-secondary",
                            placeholder: "Votre mot de passe",
                            type: "password",
                        }}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        onBlur={() => { }}
                    />
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
