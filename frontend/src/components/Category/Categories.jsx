import { useState, useEffect } from "react";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";
import { createCategory, updateCategory, deleteCategory, displayCategories } from "../../services/categoryService";

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
            console.error("Erreur CREATE/UPDATE Category:", err);
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

            <h1 className="text-center text-2xl font-semibold mt-8 mb-4 font-poppins">
                Catégories existantes
            </h1>

            <section className="pt-6 max-w-5xl mx-auto">
                <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium bg-accent">{category.name}</td>
                                    <td className="px-4 py-2">{category.description}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleStatus(category.id)}
                                            className={`text-white rounded px-3 py-1 text-sm ${category.is_active ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {category.is_active ? "Actif" : "Inactif"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton item={category} onUpdate={handleToUpCat} />
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