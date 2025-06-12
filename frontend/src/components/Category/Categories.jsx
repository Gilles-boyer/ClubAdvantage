import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable.jsx";
import {
    fetchCategories, updateCategoryThunk, deleteCategoryThunk, listOfCategories,
    addCategoryThunk,
} from "../../store/slices/categorySlice.jsx";
import ToastAlert from "../ToastAlert.jsx";
import Button from "../Button.jsx";

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(listOfCategories);
    const [toUpCategory, setToUpCategory] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
    const [toggle, setToggle] = useState(false)

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
            setToggle(false)
        } catch (err) {
            console.error("Erreur on ADD/UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de l'ajout", type: "error" });
        }
    };


    const handleToUpCat = (categoryToEdit) => {
        console.table(categoryToEdit)
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
            <div className="flex items-center gap-6 mt-5 mb-4">
                <div className="flex-grow border-t border-neutral"></div>
                <h2 className="text-2xl font-semibold text-gray-700">Catégories</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>
            <section className="pt-6 max-w-5xl mx-auto">
                <div className='flex w-fit'>
                    <Button label={'Ajouter une Catégorie'}
                        onAction={() => setToggle(!toggle)}
                        className={'btn-neutral  hover:btn-secondary mb-2 md:mb-0'} />
                </div>

                {toggle && (
                    <CategoryForm onAddCategory={handleAddCategory} onEditUpCat={toUpCategory} />)}
                <CategoryTable
                    categories={categories}
                    onDelete={handleDeleteCategory}
                    onUpdate={handleToUpCat}
                    onUpStatus={handleStatus}
                    setToggle={setToggle} />
                <ToastAlert toast={toast} setToast={setToast} />
            </section>
        </>
    );
}
