import { Textarea, Textbox } from "react-inputs-validation";

export default function LoginForm(){
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return(
    <>
        <div className="p-5 mx-auto rounded-xl bg-accent w-120 py-10">
            <h2 className="text-center font-medium mb-10">Bienvenue sur ClubAdvantage</h2>
            <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
              <div className="form-control mb-4">
                <label htmlFor="nameCategory" className="label">
                  <span className="label-text uppercase text-xs font-medium">Identifiant</span>
                </label>
                <Textbox
                  attributesInput={{
                    className: 'input',
                    placeholder: 'Insérez votre identifiant'
                  }}
                  value={''}
                  onChange={() => ('')}
                  onBlur={() => {}}
                />
                
              </div>

              <div className="form-control mb-4">
                <label htmlFor="descriptionCategory" className="label">
                  <span className="label-text uppercase text-xs font-medium">Mot de Passe</span>
                </label>
                <Textbox
                  attributesInput={{
                    className: 'input',
                    placeholder: 'Insérez votre mot de passe'
                  }}
                  value={''}
                  onChange={() => ('')}
                  onBlur={() => {}}
                />
              </div>
              <button type="submit" className="btn btn-neutral mt-5">
                Se Connecter
              </button>
            </form>
          </div>
    </>)
}