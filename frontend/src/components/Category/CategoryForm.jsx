import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textarea, Textbox } from "react-inputs-validation";

export default function CategoryForm({ onAddCategory, onEditUpCat }) {
  const [name, setName] = useState("")
  const [errorName, setErrorName] = useState("")
  const [description, setDescription] = useState("")
  const [errorDesc, setErrorDesc] = useState("")
  const [status, setStatus] =useState(null)

  useEffect(() => {
    if (onEditUpCat) {
      setName(onEditUpCat.name);
      setDescription(onEditUpCat.description);
      setStatus(onEditUpCat.is_active)
    }
  }, [onEditUpCat]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      name,
      description,
      is_active: status,
      updated_at: new Date().toISOString(),
    };

    if (onEditUpCat?.id !== undefined) {
      newCategory.id = onEditUpCat.id;
    } else {
      newCategory.created_at = new Date().toISOString();
    }
    console.log({ name, description });

    onAddCategory(newCategory);
    reset();

  };

  const reset = () => {
    setName('')
    setDescription('')
    setErrorName('');
    setErrorDesc('');
  };
  return (
    <>

        <div className="w-80vw md:w-150 border rounded mx-auto my-5">
          <h3 className="font-poppins text-center text-white py-1 text-lg font-medium bg-primary">Ajouter une catégorie</h3>
          <div className="p-5 mx-auto rounded">
            <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
              <div className="form-control mb-4">
                <label htmlFor="nameCategory" className="label">
                  <span className="label-text">Nom de la catégorie</span>
                </label>
                <Textbox
                  attributesInput={{
                    id: "nameCategory",
                    name: "nameCategory",
                    type: "text",
                    className: "input input-bordered w-full",
                    placeholder: "Nom de la catégorie"
                  }}
                  value={name}
                  onChange={(value) => setName(value)}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      return setErrorName('Le Nom ne peut pas être vide !')
                    }
                    if (e.target.value.length > 255) {
                      return setErrorName('Le Nom ne doit pas dépasser 255 caractères !')
                    }
                    if (typeof (e.target.value) !== "string") {
                      return setErrorName('Le Nom doit être une chaine de caractères !')
                    }
                  }}
                />
                {errorName && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorName}</p></div>}
              </div>

              <div className="form-control mb-4">
                <label htmlFor="descriptionCategory" className="label">
                  <span className="label-text">Description de la catégorie</span>
                </label>
                <Textarea
                  attributesInput={{
                    id: "descriptionCategory",
                    name: "descriptionCategory",
                    type: "text",
                    className: "input input-bordered w-full",
                    placeholder: "Description de la catégorie"
                  }}
                  value={description}
                  onChange={(value) => setDescription(value)}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      return setErrorDesc('La Description ne peut pas être vide !')
                    }
                    if (e.target.value.length > 1000) {
                      return setErrorDesc('La Description ne doit pas dépasser 1000 caractères !')
                    }
                    if (typeof (e.target.value) !== "string") {
                      return setErrorDesc('La Description doit être une chaine de caractères !')
                    }
                  }}
                />
                {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>}
              </div>
              <button type="submit" className="btn btn-neutral">
                Valider
              </button>
              <button onClick={reset} className='btn btn-error'>Annuler</button>
            </form>
          </div>
        </div>
    </>)
}