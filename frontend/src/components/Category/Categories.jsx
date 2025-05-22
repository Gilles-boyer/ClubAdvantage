import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "./CategoryForm";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";
import {
    fetchCategories, updateCategoryThunk, deleteCategoryThunk, listOfCategories,
    addCategoryThunk,
} from "../../store/slices/categorySlice.jsx";
import ToastAlert from "../ToastAlert.jsx";

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(listOfCategories);
    const [toUpCategory, setToUpCategory] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = async (newCategory) => {
        try {
            if (newCategory.id) {
                await dispatch(updateCategoryThunk({ id: newCategory.id, data: newCategory })).unwrap();
            } else {
                await dispatch(addCategoryThunk(newCategory)).unwrap();
            }
            setToUpCategory(null);
            setToast({ show: true, message: "Catégorie enregistrée avec succès", type: "success" });
        } catch (err) {
            console.error("Erreur on ADD/UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de l'ajout", type: "error" });
        }
    };


    const handleToUpCat = async (categoryToEdit) => {
        try {
            await dispatch(updateCategoryThunk({ id: categoryToEdit.id, data: categoryToEdit })).unwrap();
            setToast({ show: true, message: "Catégorie modifiée avec succès", type: "success" });
        } catch (err) {
            console.error("Erreur on UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de la modification", type: "error" });
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await dispatch(deleteCategoryThunk(id)).unwrap();
            setToast({ show: true, message: "Catégorie supprimée avec succès", type: "success" });
        } catch (err) {
            console.error("Erreur on ADD/UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de la suppression", type: "error" });
        }
    };

    const handleStatus = (id) => {
        const category = categories.find(cat => cat.id === id);
        if (!category) return;
        const updated = { ...category, is_active: !category.is_active };
        dispatch(updateCategoryThunk({ id, data: updated }));
    };

    return (
        <>
            <h1 className="text-center text-2xl font-semibold mt-8 mb-4 font-poppins">
                Catégories existantes
            </h1>
            <section className="pt-6 max-w-5xl mx-auto">
                <AddCategory onAddCategory={handleAddCategory} onEditUpCat={toUpCategory} />
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
                                <tr key={category.id} className="border-t hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 font-medium bg-accent">{category.name}</td>
                                    <td className="px-4 py-2">{category.description}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleStatus(category.id)}
                                            className={`py-1 px-3 rounded text-white w-20 hover:cursor-pointer ${category.is_active ? "bg-indigo-800" : "bg-orange-400"
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
                <ToastAlert toast={toast} setToast={setToast} />
            </section>
        </>
    );
}
