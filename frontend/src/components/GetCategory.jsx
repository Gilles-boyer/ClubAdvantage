import { useState, useEffect } from 'react';

export const GetCategory = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("/db.json") //! requête http
          .then((res) => res.json()) //! Promesse
          .then((data) => {
            setCategories(data.categories); //!Accès à l'objet catégories dans le fichier (ici dans 'data')
          })
          .catch((err) => {
            console.error("Erreur de chargement :", err);
          });
      }, []);

    return (
        <>
            <h1 className='text-center pb-5'>Catégories existantes 👇</h1>
            <div className='border rounded bg-gray text-center'>
                {categories.map((category) => (
                    <div key={category.id}>
                        <p>
                            Title: <span>{category.name}</span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}