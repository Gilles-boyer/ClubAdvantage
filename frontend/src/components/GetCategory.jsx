import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdilDelete } from '@mdi/light-js';
import { deleteCategory, displayCategories } from '../services/categoryService';

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


    const handleDelete = (id) => {
        deleteCategory(id)
        .then(() => {
            console.log(`Deleted post with ID ${id}`);
          })
            .catch((err) => console.error("Erreur DELETE :", err));
    };

    return (
        <>
            <h1 className='text-center w-150 mt-6 mx-auto font-poppins'>Catégories existantes</h1>
            <div className='w-200 mx-auto grid grid-cols-2 gap-4 p-2'>
                {categories.map((category) => (
                    <div key={category.id} className='py-3 bg-primary rounded col-span-2 lg:col-span-1 flex items-center'>
                        <p className='font-medium text-center flex-grow'>
                            {category.name}
                        </p>
                        <Icon path={mdilDelete} size={1.2} onClick={() => handleDelete(category.id)} className='p-1 text-red-700 rounded hover:text-gray hover:bg-red-700 me-2' />
                    </div>
                ))}
            </div>
        </>
    )
}