import { useState, useEffect } from "react";
import { displayCategories } from "../../services/categoryService";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        displayCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []); //!Récupère les données dans la BDD

    const handleAddCategory = (newCategory) => {
        setCategories((prev) => [...prev, newCategory]);
    }; //! Fonction pour ajouter une catégorie, créer un nouveau tableau avec l'ajout de l'objet newCategory

    const handleDeleteCategory = (id) => {
        setCategories(prev => prev.filter(cat => cat.id !== id));
    }; //! Fonction pour supprimer une catégorie, créer un nouveau tableau sans l'objet dont l'id correspond à celui en paramètre
    return (
        <>
            <AddCategory onAddCategory={handleAddCategory} />
            <h1 className='text-center w-150 mt-6 mx-auto font-poppins'>Catégories existantes</h1>
            <div className='w-200 mx-auto grid grid-cols-3 gap-4 p-2'>
                {categories.map((category) => (
                    <div key={category.id} className='py-3 bg-primary rounded col-span-2 lg:col-span-1 flex items-center'>
                        <p className='font-medium text-center flex-grow'>
                            {category.name}
                        </p>
                        <DeleteButton id={category.id} onDelete={handleDeleteCategory} />
                    </div>
                ))}
            </div>
        </>
    )
}