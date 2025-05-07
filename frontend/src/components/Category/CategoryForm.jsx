import { useState } from "react";

export default function AddCategory({ onAddCategory }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      name: name,
      description: description,
      status: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    onAddCategory(newCategory);
    reset();
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
          <input
            type="text"
            name="nameCategory"
            placeholder="Nom de la catégorie"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 bg-gray"
          />
          <input
            type="text"
            name="descriptionCategory"
            placeholder="Description de la catégorie"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 bg-gray"
          />
          <button type="submit" className="btn btn-neutral">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}