import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAlert } from '@mdi/light-js';
import { Textarea, Textbox } from "react-inputs-validation";
import { displayCategories } from "../../services/categoryService";


export default function AddOffers({ onAddOffer, onEditOffer }) {
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState('')
  const [description, setDescription] = useState("")
  const [errorDesc, setErrorDesc] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState('')

  useEffect(() => {
    if (onEditOffer) {
      setTitle(onEditOffer.title);
      setDescription(onEditOffer.description);
      setSelectedCat(onEditOffer.category_id); //! Pré-remplir le champ dans le formulaire 
    }
  }, [onEditOffer]);


  useEffect(() => {
    displayCategories()
      .then(res => {
        const listCat = res.data.data
        const ArrayCat = listCat.map((cat) => ({
          id: cat.id,
          name: cat.name
        }))
        console.log('reponse api :', res)
        setCategories(ArrayCat)
      })
      .catch(err => console.error("Erreur GET :", err));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryObject = categories.find((cat) => cat.id === selectedCat)
    
    const newOffer = {
      title,
      description,
      is_active: false,
      category_id: selectedCat,
      category_name: categoryObject.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (onEditOffer?.id !== undefined) {
      newOffer.id = onEditOffer.id;
    } else {
      newOffer.created_at = new Date().toISOString();
    }

    onAddOffer(newOffer);
    reset();
    setErrorTitle('')
    setErrorDesc('')
    setSelectedCat('')
  }

  const reset = () => {
    setTitle("");
    setDescription("");
  };
  console.log('catégories :', categories);
  console.log('catégorie sélectionée', selectedCat);
  

  return (
    <div className="w-150 border rounded mx-auto mt-10">
      <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">Ajouter une Offre</h3>
      <div className="p-5 mx-auto rounded">
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
          <div className="form-control mb-4">
            <label htmlFor="descriptionOffer" className="label">
              <span className="label-text">Sélectionnez une catégorie :</span>
            </label>
            <select className="select w-full" value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}> //! Ajout des états selectedCat et setSelectedCat pour capturer le changement d'état
              <option disabled value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-neutral">
              Valider
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
