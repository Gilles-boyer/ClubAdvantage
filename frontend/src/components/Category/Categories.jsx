import { useState, useEffect } from "react";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";
import { createCategory, updateCategory, deleteCategory, displayCategories	 } from "../../services/categoryService";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [toUpCategory, setToUpCategory] = useState(null);

    useEffect(() => {
        displayCategories()
            .then(res => setCategories(res.data.data))
            .catch(err => console.error("Erreur GET :", err));
    }, []);

    const handleAddCategory = async (newCategory) => {
        try {
            if (newCategory.id) {
                const res = await updateCategory(newCategory.id, newCategory);
                setCategories((prev) =>
                    prev.map((cat) => (cat.id === newCategory.id ? res.data.data : cat))
                );
            } else {
                const res = await createCategory(newCategory);
                setCategories((prev) => [...prev, res.data.data]);
            }
            setToUpCategory(null);
        } catch (err) {
            console.error("Erreur CREATE/UPDATE :", err);
        }
    };

    const handleToUpCat = (categoryToEdit) => {
        setToUpCategory(categoryToEdit)
    }

    const handleStatus = async (id) => {
        const category = categories.find(cat => cat.id === id);
        if (!category) return;

        try {
            const updated = { ...category, is_active: !category.is_active };
            const res = await updateCategory(id, updated);
            setCategories((prev) =>
                prev.map((category) => (category.id === id ? res.data.data : category))
            );
        } catch (err) {
            console.error("Erreur toggle statut :", err);
        }
    };


    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (err) {
            console.error("Erreur on DELETE :", err);
        }
    };

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
                            {categories.map((category) => (
                                <tr key={category.id} className="border-b border-dark text-black">
                                    <th className="px-6 py-4 font-medium text-dark whitespace-nowrap bg-primary">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">{category.description}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatus(category.id)}
                                            className={`py-1 px-3 rounded text-white w-20 ${category.is_active ? "bg-green-600" : "bg-red-600"
                                                }`}
                                        >
                                            {category.is_active ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 bg-primary">
                                        <UpdateButton item={category} onUpdate={handleToUpCat}/>

                                        <DeleteButton id={category.id} onDelete={handleDeleteCategory} />
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