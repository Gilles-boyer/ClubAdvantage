import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetCategory = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5173/db.json')
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error("Erreur de récupération :", error);
            });
    }, []);

    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/categories/${id}`)
            // .then(() => {
            //     setCategories(prev => prev.filter(cat => cat.id !== id));
            // })
            .catch((err) => console.error("Erreur DELETE :", err));
    };

    return (
        <>
            <h1 className='text-center pb-5'>Catégories existantes 👇</h1>
            <div className='border rounded bg-gray text-center w-200 mx-auto grid grid-cols-2 gap-4 p-2'>
                {categories.map((category) => (
                    <div key={category.id} className='py-3 bg-primary rounded col-span-2 lg:col-span-1 flex justify-around'>
                        <p>
                            <span>{category.name}</span>
                        </p>
                        <p><span onClick={() => handleDelete(category.id)} className='p-1'>X</span></p>
                    </div>
                ))}
            </div>
        </>
    )
}