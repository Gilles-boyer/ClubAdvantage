import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textarea, Textbox } from "react-inputs-validation";


export default function AddOffers({ onAddOffer, onEditOffer }) {
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState('')
  const [description, setDescription] = useState("");
  const [errorDesc, setErrorDesc] = useState("")

  useEffect(() => {
    if (onEditOffer) {
      setTitle(onEditOffer.title);
      setDescription(onEditOffer.description);
    }
  }, [onEditOffer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOffer = {
      title,
      description,
      is_active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (onEditOffer?.index !== undefined) {
      newOffer.index = onEditOffer.index;
    } else {
      newOffer.created_at = new Date().toISOString();
    }
    onAddOffer(newOffer);
    reset();
  }
  const reset = () => {
    setTitle("");
    setDescription("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="spacetext-center">
        <div className="form-control mb-4">
          <label htmlFor="titleOffer" className="label">
            <span className="label-text">Titre de l'offre</span>
          </label>
          <Textbox
            attributesInput={{
              id: "titleOffer",
              name: "titleOffer",
              type: "text",
              className: "input input-bordered w-full",
              placeholder: "Titre de l'offre"
            }}
            value={title}
            onChange={(value) => setTitle(value)}
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                return setErrorTitle('Le Titre ne peut pas être vide !')
              }
              if (e.target.value.length > 255) {
                return setErrorTitle('Le Title ne doit pas dépasser 255 caractères !')
              }
              if (typeof (e.target.value) !== "string") {
                return setErrorTitle('Le Title doit être une chaine de caractères !')
              }
            }}
          />
          {errorTitle && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorTitle}</p></div>}
        </div>
        <div className="form-control mb-4">
          <label htmlFor="descriptionOffer" className="label">
            <span className="label-text">Description de l'offre</span>
          </label>
          <Textarea
            attributesInput={{
              id: "descriptionOffer",
              name: "descriptionOffer",
              type: "text",
              className: "input input-bordered w-full",
              placeholder: "Description de l'offre"
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
      </form>
    </>
  )
}
