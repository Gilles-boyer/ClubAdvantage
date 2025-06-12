import { Textbox } from "react-inputs-validation";
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <>
      <div className="card bg-accent max-w-xs md:w-120 p-10 ring-2 ring-secondary" >
        <Icon path={mdilAccount} size={4}  className="text-accent bg-neutral rounded-full p-3 items-center mx-auto ring-1 ring-secondary"/>
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
          <button type="submit" className="btn btn-primary mt-5 uppercase text-xs">
            Se Connecter
          </button>
        </form>
      </div>
    </>)

}