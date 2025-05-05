import { useState } from "react";
import { createOffer } from "../services/offersService";

export default function AddOffers() {
  const [nameOffer, setNameOffer] = useState("");
  const[description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createOffer({
      title: nameOffer,
      description: description,
      is_active: false,
      craated_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
      .then(() => {
        alert("Offre ajoutéé !");
        reset();
      })
      .catch((err) => {
        console.error("Error POST :", err);
        console.log(err.response);

      });
  };

  const onChangeTitle = (e) => {
    setNameOffer(e.target.value)
  }

  const onChangeDesc = (e) => {
    setDescription(e.target.value)
  }

  const reset = () => {
    setNameOffer("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="spacetext-center">
        <input
          type="text"
          name="nameCategory"
          placeholder="Titre de l'offre"
          value={nameOffer}
          onChange={onChangeTitle}
          className="border rounded p-2 bg-gray"
        />
        <input
          type="text"
          name="nameCategory"
          placeholder="Description de l'offre"
          value={description}
          onChange={onChangeDesc}
          className="border rounded p-2 bg-gray"
        />
        <button type="submit" className="bg-dark text-white px-3 py-3 rounded text-xs uppercase">
          Enregistrer
        </button>
      </form>
    </>
  )
}


