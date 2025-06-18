import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textarea, Textbox } from "react-inputs-validation";
import Button from "../Button";

export default function CategoryForm({ onAddCategory, onEditUpCat, onCancelEdit, setToggle }) {
  const [name, setName] = useState("")
  const [errorName, setErrorName] = useState("")
  const [description, setDescription] = useState("")
  const [errorDesc, setErrorDesc] = useState("")
  const [status, setStatus] = useState('')
  const [errorSelect, setErrorSelect] = useState('')


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
    console.table(onEditUpCat)
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

            {/* NAME SECTION */}
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
                  placeholder: "Ajoutez le nom de la catégorie"
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
                  if (e.target.value.trim()) return setErrorName('')
                }}
              />
              {errorName && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorName}</p></div>}
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="form-control mb-4">
              <label htmlFor="descriptionCategory" className="label">
                <span className="label-text">Description de la catégorie</span>
              </label>
              <Textarea
                attributesInput={{
                  id: "descriptionCategory",
                  name: "descriptionCategory",
                  type: "text",
                  className: "input input-bordered w-full whitespace-pre-wrap break-words resize-y",
                  placeholder: "Entrez le description de la catégorie",
                  cols: '100'
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
                  if (e.target.value.trim()) return setErrorDesc('')
                }}
              />
              {errorDesc && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorDesc}</p></div>}
            </div>

            {/* STATUS SECTION */}
            <div className="form-control mb-4">
              <label htmlFor="descriptionOffer" className="label">
                <span className="label-text">Activer la Catégorie</span>
              </label>
              <select
                className="select w-full"
                value={status === null ? "" : String(status)}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "null") {
                    setStatus(null);
                    setErrorSelect('Choisir une valeur !');
                  } else {
                    setStatus(parseInt(value, 10));
                    setErrorSelect('');
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "null") {
                    setErrorSelect('Choisir une valeur !');
                  }
                }}
              >
                <option value="null">Choisir une valeur</option>
                <option value="1">OUI</option>
                <option value="0">NON</option>
              </select>

              {errorSelect && (
                <div className="text-red-500 text-sm mt-1">
                  {errorSelect}
                </div>
              )}
            </div>

            {/* BUTTONS SECTION */}
            <div className="space-x-2 mt-5">
              <Button label={'valider'} type="submit" className={"btn-neutral"} />
              <Button label={'annuler'} type="reset" onAction={() => {
                reset();
                setToggle(false);
                onCancelEdit();
              }} className={'btn-error'} />
            </div>
          </form>
        </div>
      </div>
    </>)
}