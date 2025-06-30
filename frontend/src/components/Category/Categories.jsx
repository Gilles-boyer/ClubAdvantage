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

/**Categories view : Parent component that fetches list from Redux, allows create, update & delete categories */

export default function Categories({ ref }) {
    const dispatch = useDispatch();
    const categories = useSelector(listOfCategories);
    const [toUpCategory, setToUpCategory] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
    const [toggle, setToggle] = useState(false)

    useEffect(() => {  /** Fetch categories's list on first mount */
        dispatch(fetchCategories());
    }, [dispatch]);

    /** Create or Update depending on presence of an'id'
     * if there is no 'id' a new category is created with 'newCategory' object values from <CategoryForm />
    */
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
    const canceledEdit = () => {
        setToUpCategory(null);
    }

    /** Selected category is set into state so <CategoryForm /> can
     * display it in “edit” mode (pre-fills the form).*/
    const handleToUpCat = (categoryToEdit) => {
        setToUpCategory(categoryToEdit);
    };

    /**Delete a category by using her 'id'*/
    const handleDeleteCategory = async (id) => {
        try {
            await dispatch(deleteCategoryThunk(id)).unwrap();
            setToast({ show: true, message: "Catégorie supprimée avec succès", type: "success" });
        } catch (err) {
            console.error("Erreur on ADD/UPDATE :", err);
            setToast({ show: true, message: "Erreur lors de la suppression", type: "error" });
        }
    };

    /** Modify category status locally by using her 'id', then use patch method to update status */
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
            <div className="flex items-center gap-6 mt-5 mb-4" ref={ref}>
                <div className="flex-grow border-t border-neutral"></div>
                <h2 id="categories-title"
                    className="text-2xl font-semibold text-gray-700">Catégories</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>
            <section className="pt-6 max-w-5xl mx-auto"
            >
                <div className='flex w-fit' id='catForm'>
                    <Button label={toggle ? 'Fermer le formulaire' : 'Ajouter une Catégorie'}
                        aria-expanded={toggle}
                        aria-controls="category-form"
                        onAction={() => setToggle(!toggle)}
                        className={'btn-neutral  hover:btn-secondary mb-2 md:mb-0'} />
                </div>

                {toggle && (
                    <CategoryForm
                        aria-labelledby="category-form"
                        onAddCategory={handleAddCategory}
                        onEditUpCat={toUpCategory}
                        setToggle={setToggle}
                        onCancelEdit={canceledEdit} />)}
                <CategoryTable
                    aria-labelledby="category-table"
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
