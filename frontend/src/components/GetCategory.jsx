import { useState, useEffect } from 'react';
import { deleteCategory, displayCategories } from '../services/categoryService';
import DeleteButton from './DeleteButton';

export const GetCategory = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        displayCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Erreur de récupération :", error);
            });
    }, []);

    return (
        <>
            <h1 className='text-center w-150 mt-6 mx-auto font-poppins'>Catégories existantes</h1>
            <div className='w-200 mx-auto grid grid-cols-3 gap-4 p-2'>
                {categories.map((category) => (
                    <div key={category.id} className='py-3 bg-primary rounded col-span-2 lg:col-span-1 flex items-center'>
                        <p className='font-medium text-center flex-grow'>
                            {category.name}
                        </p>
                        <DeleteButton id={category.id} onDelete={deleteCategory}/>
                    </div>
                ))}
            </div>
        </>
    )
}