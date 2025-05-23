import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable.jsx";
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
            setToast({ show: true, message: "Catégorie enregistrée avec succès", type: "success" });
            setToUpCategory(null);
        } catch (err) {
            console.error("Erreur on ADD/UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de l'ajout", type: "error" });
        }
    };


    const handleToUpCat = (categoryToEdit) => {
            setToUpCategory(categoryToEdit);
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

    const handleStatus = async (id) => {
        try {
            const category = categories.find(cat => cat.id === id);
            if (!category) return;
            const updated = { ...category, is_active: !category.is_active };
            await dispatch(updateCategoryThunk({ id, data: updated })).unwrap();
            setToast({ show: true, message: "Statut modifié avec succès", type: "success" });
        } catch (err) {
            console.log("Erreur on UPDATE Category status :", err);
            setToast({ show: true, message: "Erreur lors de la modification du statut", type: "error" });

        }
    };

    return (
        <>
            <h1 className="text-center text-2xl font-semibold mt-8 mb-4 font-poppins">
                Catégories existantes
            </h1>
            <section className="pt-6 max-w-5xl mx-auto">
                <CategoryForm onAddCategory={handleAddCategory} onEditUpCat={toUpCategory} />
                <CategoryTable
                    categories={categories}
                    onDelete={handleDeleteCategory}
                    onUpdate={handleToUpCat}
                    onUpStatus={handleStatus} />
                <ToastAlert toast={toast} setToast={setToast} />
            </section>
        </>
    );
}
