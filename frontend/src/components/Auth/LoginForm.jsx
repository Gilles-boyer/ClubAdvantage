import { useState } from "react";
import { Textbox } from "react-inputs-validation";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
// import Button from "../Button";

export default function LoginForm({ onSubmit, loading }) {
  const [email, setEmail]       = useState("admin@example.com");
  const [password, setPassword] = useState("manger12345");

  const handle = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
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
                        onChange={(v) => setEmail(v)}
                        onBlur={() => {}}
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
                        onChange={(v) => setPassword(v)}
                        onBlur={() => {}}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full uppercase text-xs"
                >
                    {loading ? 'Connexion…' : 'Se connecter'}
                </button>
                <button
                    type="button"
                    onClick={() => window.location.replace('/')}
                    className="btn-neutral w-full text-white uppercase text-xs mt-2"
                >
                    Retour à l'accueil
                </button>
            </form>
        </div>
    );
}
