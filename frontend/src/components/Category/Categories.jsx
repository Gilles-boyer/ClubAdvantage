import { useState, useEffect } from "react";
import { displayCategories } from "../../services/categoryService";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [toUpCategory, setToUpCategory] = useState(null);

    useEffect(() => {
        displayCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []); //!Récupère les données dans la BDD - READ

    const handleAddCategory = (newCategory) => {
        if (newCategory.index !== undefined) {
            setCategories((prev) => {
                const copy = [...prev];
                copy[newCategory.index] = {
                    ...copy[newCategory.index],
                    name: newCategory.name,
                    description: newCategory.description,
                    is_active: false,
                    updated_at: new Date().toISOString(),
                };
                return copy;
            });
            setToUpCategory(null);
        } else {
            setCategories((prev) => [...prev, newCategory]);
        }
    };
    //! Fonction pour ajouter une catégorie, créer un nouveau tableau avec l'ajout de l'objet newCategory - CREATE
    const handleToUpCat = (categoryToEdit) => {
        setToUpCategory(categoryToEdit)
    }

    const handleStatus = (index) => { //! Fonction pour modifier le statut de chaque catégorie (toggle)
        setCategories(prev => {
            const copy = [...prev];

            copy[index] = {
                ...copy[index],
                is_active: !copy[index].is_active,
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
            <AddCategory onAddCategory={handleAddCategory} onEditUpCat={toUpCategory} />
            <h1 className='text-center w-150 mt-6 mx-auto font-poppins'>Catégories existantes</h1>
            <section className="relative overflow-x-auto pt-10 mx-auto">
                <div className='w-fit mx-auto'>
                    <table className="text-sm text-left rtl:text-right">
                        <thead className="text-xs uppercase bg-secondary">
                            <tr>
                                <th className="px-6 py-3">Nom</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Statut</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index} className="border-b border-dark text-black">
                                    <th className="px-6 py-4 font-medium text-dark whitespace-nowrap bg-primary">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">{category.description}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatus(index)}
                                            className={`py-1 px-3 rounded text-white w-20 ${category.is_active ? "bg-green-600" : "bg-red-600"
                                                }`}
                                        >
                                            {category.is_active ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 bg-primary">
                                        <UpdateButton index={index} onUpdate={handleToUpCat}
                                            currentName={category.name}
                                            currentDesc={category.description} />

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