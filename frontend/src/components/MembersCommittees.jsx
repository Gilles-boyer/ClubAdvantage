// import { useState } from "react";
import AddMembers from "./AddMembers";
import { GetMembers } from "./GetMembers";





export default function DisplayMembers() {

    
    return (
        <section className="pt-10 px-4 overflow-x-auto max-w-6xl mx-auto">
            <div className='w-fit max-w-4xl mx-auto'>
                <div className='flex w-fit'>
                    <button onClick={() =>('')} className='bg-primary uppercase font-medium px-3 py-2 me-2 text-xs hover:bg-secondary hover:text-white'>Ajouter un adhérent</button>
                </div>
                <AddMembers />
                <table className=" text-sm text-left table-auto w-full rtl:text-right">
                    <thead className="text-xs uppercase bg-secondary">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Prénom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Téléphone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Statut
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        < GetMembers />
                    </tbody>
                </table>
            </div>
        </section>
    )
}