import { useState } from "react";
import { createCategory } from "../../services/categoryService";

export default function AddCategory() {
  const [nameCategory, setNameCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    createCategory({
      name: nameCategory,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
      .then(() => {
        alert("Catégorie ajoutée !");
        reset();
      })
      .catch((err) => {
        console.error("Error POST :", err);
        console.log(err.response);
        
      });
  };
  
const onChange = (e) => {
    setNameCategory(e.target.value)
  }

  const reset = () => {
    setNameCategory("");
  };

  return (
    <div className="w-150 border rounded mx-auto mt-5">
      <h3 className="font-poppins text-center py-1 text-lg font-medium bg-primary">Catégories</h3>
      <div className="p-5 mx-auto rounded">
        <form onSubmit={handleSubmit} className="space-x-2 mt-4 text-center">
          <input
            type="text"
            name="nameCategory"
            placeholder="Nom de la catégorie"
            value={nameCategory}
            onChange={onChange}
            className="border rounded p-2 bg-gray"
          />
          <button type="submit" className="bg-neutral text-white px-3 py-2 rounded">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
