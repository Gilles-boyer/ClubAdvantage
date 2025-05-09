import { useState } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textbox } from "react-inputs-validation";

export default function AddCategory({ onAddCategory }) {
  const [name, setName] = useState("")
  const [errorName, setErrorName] = useState("")
  const [description, setDescription] = useState("")
  const [errorDesc, setErrorDesc] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      name: name,
      description: description,
      is_active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    onAddCategory(newCategory);
    reset();
    setErrorName('')
    setErrorDesc('')
  };

  const reset = () => {
    setName('')
    setDescription('')
  };

  return (
    <div className="w-150 border rounded mx-auto mt-5">
      <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">Ajouter une catégorie</h3>
      <div className="p-5 mx-auto rounded">
        <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
          <div className="form-control mb-4">
            <label htmlFor="nameCategory" className="label">
              <span className="label-text">Nom de la catégorie</span>
            </label>
            <Textbox
              id="nameCategory"
              name="nameCategory"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

              className="input input-bordered w-full"
              placeholder="Nom de la catégorie"
            />
            {errorName && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorName}</p></div>}
          </div>

          <div className="form-control mb-4">
            <label htmlFor="nameCategory" className="label">
              <span className="label-text">Description de la catégorie</span>
            </label>
            <Textbox
              id="descriptionCategory"
              name="descriptionCategory"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

              className="input input-bordered w-full"
              placeholder="Nom de la catégorie"
            />
            {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>}
          </div>
          <button type="submit" className="btn btn-neutral">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}