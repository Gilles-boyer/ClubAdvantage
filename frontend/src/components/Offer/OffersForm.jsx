import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textarea, Textbox } from "react-inputs-validation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories, listOfCategories,
} from "../../store/slices/categorySlice.jsx";
import Button from "../Button.jsx";



export default function OfferForm({ onAddOffer, onEditOffer, setToggle, onCancel }) {
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState('')
  const [description, setDescription] = useState("")
  const [errorDesc, setErrorDesc] = useState("")
  const categories = useSelector(listOfCategories)
  const [selectedCat, setSelectedCat] = useState('')
  const [status, setStatus] = useState(null)
  const [errorStatus, setErrorStatus] = useState('')
  const [errorCat, setErrorCat] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (onEditOffer) {
      setTitle(onEditOffer.title);
      setDescription(onEditOffer.description);
      setSelectedCat(onEditOffer.category_id); //! Pré-remplir le champ dans le formulaire
      setStatus(onEditOffer.is_active)
    }
  }, [onEditOffer]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryObject = categories.find((cat) => cat.id === selectedCat)

    const newOffer = {
      title,
      description,
      is_active: status,
      category_id: selectedCat,
      category_name: categoryObject?.name || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    console.log(onEditOffer)
    if (onEditOffer?.id !== undefined) {
      newOffer.id = onEditOffer.id;
    } else {
      newOffer.created_at = new Date().toISOString();
    }

    onAddOffer(newOffer);
    reset();
  }

  const reset = () => {
    setErrorDesc('')
    setErrorTitle('')
    setSelectedCat('')
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="w-80vw border rounded mx-auto my-10">
        <h3 className="font-poppins text-center py-1 text-lg font-medium text-white bg-primary">Ajouter une Offre</h3>
        <div className="p-5 mx-auto rounded">
          <form onSubmit={handleSubmit} className="space">

            {/* TITLE SECTION */}
            <div className="grid md:grid-cols-4 gap-3">
              <div className="form-control mb-4 col-span-4">
                <label htmlFor="titleOffer" className="label">
                  <span className="label-text">Titre de l'offre</span>
                </label>
                <Textbox
                  attributesInput={{
                    id: "titleOffer",
                    name: "titleOffer",
                    type: "text",
                    className: "input input-bordered w-full",
                    placeholder: "Ajoutez le titre de l'offre"
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
                    if (e.target.value.trim()) return setErrorTitle('')
                  }}
                />
                {errorTitle && <div className="flex w-75 mx-auto justify-center text-red-700"> <Icon path={mdilAlert} size={1} /><p className="ps-2 text-sm mt-1">{errorTitle}</p></div>}
              </div>

              {/* DESCRIPTION SECTION */}
              <div className="form-control mb-4 col-span-4">
                <label htmlFor="descriptionOffer" className="label">
                  <span className="label-text">Description de l'offre</span>
                </label>
                <Textarea
                  attributesInput={{
                    id: "descriptionOffer",
                    name: "descriptionOffer",
                    type: "text",
                    className: "input input-bordered w-full whitespace-pre-wrap break-words resize-y",
                    placeholder: "Ajoutez la description de l'offre",
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

              {/* CATEGORY SECTION */}
              <div className="form-control mb-4 col-span-4 md:col-span-2">
                <label htmlFor="descriptionOffer" className="label">
                  <span className="label-text">Choisir une catégorie</span>
                </label>
                <select className="select w-full" value={selectedCat === null ? "" : selectedCat} 
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "null") {
                    setSelectedCat(null);
                    setErrorCat('Choisir une valeur pour la catégorie !');
                  } else {
                    setSelectedCat(value);
                    setErrorCat('');
                  }
                }}
                onBlur={(e) => {
                    if (e.target.value === "null") {
                      setErrorCat('Choisir une valeur pour la catégorie!');
                    }}}
                >
                  <option value="null">Sélectionner une catégorie ↓</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                  ))}
                  {errorCat && (
                  <div className="text-red-500 text-sm mt-1">
                    {errorCat}
                  </div>
                )}
                </select>
              </div>

              {/* STATUS SECTION */}
              <div className="form-control mb-4 col-span-4 md:col-span-2">
                <label htmlFor="descriptionOffer" className="label">
                  <span className="label-text">Choisir un statut </span>
                </label>
                <select className="select w-full" value={status === null ? "" : String(status)}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "null") {
                      setStatus(null);
                      setErrorStatus('Choisir une valeur pour le statut !');
                    } else {
                      setStatus(parseInt(value, 10));
                      setErrorStatus('');
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "null") {
                      setErrorStatus('Choisir une valeur pour le statut!');
                    }
                  }}>
                  <option value="null">Sélectionner un statut ↓</option>
                  <option value={"1"}>Actif</option>
                  <option value={"0"}>Inactif</option>
                </select>
                {errorStatus && (
                  <div className="text-red-500 text-sm mt-1">
                    {errorStatus}
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS SECTION */}
            <div className="flex justify-center space-x-2 mt-5">
              <Button label={'valider'} type="submit" className={'btn-neutral'} />
              <Button label={'annuler'} onAction={() => {
                reset();
                setToggle(false);
                onCancel()
              }} className={'btn-error'} />
            </div>
          </form>
        </div >
      </div >
    </>)
}
