import { useState } from "react";
import { Textbox } from "react-inputs-validation";
import Button from "./Button";
import { sendInvitation } from "../services/invitationService";

export default function InvitationForm() {
  const [email, setEmail]           = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isLoading, setIsLoading]   = useState(false);

  function validate() {
    setErrorEmail("");
    if (!email.trim()) {
      setErrorEmail("L'email est requis");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmail("Format d'email invalide");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await sendInvitation({ email });
      alert("Invitation envoyée !");
      setEmail("");
    } catch (err) {
      const resp = err.response;
      if (resp?.status === 422 && resp.data.errors?.email) {
        setErrorEmail(resp.data.errors.email[0]);
      } else {
        alert("Erreur lors de l’envoi.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow">
      <label className="label"><span>Email du futur membre</span></label>
      <Textbox
        attributesInput={{ type:"email", className:"input w-full" }}
        value={email}
        onChange={v=>setEmail(v)}
      />
      {errorEmail && <p className="text-red-500">{errorEmail}</p>}

      <div className="mt-4 flex space-x-2">
        <Button type="submit" label="Valider"  disabled={isLoading}>
          {isLoading ? "Envoi…" : "Inviter"}
        </Button>
        <Button type="button"  label="Annuler" onAction={()=>setEmail("")}>Annuler</Button>
      </div>
    </form>
  );
}
