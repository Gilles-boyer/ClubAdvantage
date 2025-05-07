import { useState, useEffect } from "react";
import { displayCategories } from "../../services/categoryService";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        displayCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []); //!Récupère les données dans la BDD - READ

    const handleAddCategory = (newCategory) => {
        setCategories((prev) => [...prev, newCategory]);
    }; //! Fonction pour ajouter une catégorie, créer un nouveau tableau avec l'ajout de l'objet newCategory - CREATE

    const handleUpdateCategory = (index, updateCatName, updateCatDesc) => {
        setCategories((prev) => {
            const copy = [...prev];
            copy[index].name = updateCatName;
            copy[index].description = updateCatDesc;
            copy[index].updated_at = new Date().toISOString();
            return copy;
        }); //! Fonction pour modifier une catégorie - UPDATE
    };

    const handleStatus = (index) => {
        setCategories(prev => {
          const copy = [...prev];

          copy[index] = {
            ...copy[index],
            status: !copy[index].status,
          };
          return copy;
        });
      };

    const handleDeleteCategory = (index) => {
        setCategories((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    }; //! Fonction pour supprimer une catégorie - DELETE

    return (
        <>
            <h1 className='text-center w-150 mt-6 mx-auto font-poppins'>Catégories existantes</h1>
            <AddCategory onAddCategory={handleAddCategory} />
            <section className="relative overflow-x-auto pt-10 mx-auto">
                <div className='w-fit mx-auto'>
                    <table className="text-sm text-left rtl:text-right">
                        <thead className="text-xs uppercase bg-secondary">
                            <tr>
                                <th className="px-6 py-3">Titre</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Statut</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id} className="border-b border-dark text-black">
                                    <th className="px-6 py-4 font-medium text-dark whitespace-nowrap bg-primary">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">{category.description}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatus(index)}
                                            className={`py-1 px-3 rounded text-white w-20 ${category.status ? "bg-green-600" : "bg-red-600"
                                                }`}
                                        >
                                            {category.status ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 bg-primary">
                                        <UpdateButton index={index} onUpdate={handleUpdateCategory} label1="nom" label2="description"/>
                                        <DeleteButton index={index} onDelete={handleDeleteCategory} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}