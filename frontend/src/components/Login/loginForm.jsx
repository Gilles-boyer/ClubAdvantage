import { Textbox } from "react-inputs-validation";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
      const navigate = useNavigate()
    const handleHome = () => {
        navigate('/')
    }
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <>
      <div className="card bg-accent max-w-xs md:w-120 p-10 ring-2 ring-secondary" >
        <Icon path={mdiAccount} size={4}  className="text-accent bg-neutral rounded-full p-3 items-center mx-auto ring-1 ring-secondary"/>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-center">
          <div className="form-control mx-auto px-4 md:px-2 mb-4">
            <label htmlFor="nameCategory" className="label mb-2">
              <span className="label-text uppercase text-xs font-medium">Identifiant</span>
            </label>
            <Textbox
              attributesInput={{
                className: 'input ring-1 ring-secondary',
                placeholder: 'Insérez votre identifiant'
              }}
              value={''}
              onChange={() => ('')}
              onBlur={() => { }}
            />

          </div>

          <div className="form-control mx-auto px-4 md:px-2 mb-4">
            <label htmlFor="descriptionCategory" className="label mb-2">
              <span className="label-text uppercase text-xs font-medium">Mot de Passe</span>
            </label>
            <Textbox
              attributesInput={{
                className: 'input ring-1 ring-secondary',
                placeholder: 'Insérez votre mot de passe'
              }}
              value={''}
              onChange={() => ('')}
              onBlur={() => { }}
            />
          </div>
          <Button type="submit" label={"se connecter"} className={"btn btn-primary mt-5 uppercase text-xs"}/>
          <Button path={"/"} className="btn-neutral text-white mt-5 py-2 px-3 rounded" label="Retour à l'accueil" onAction={handleHome} />
        </form>
      </div>
    </>)

}