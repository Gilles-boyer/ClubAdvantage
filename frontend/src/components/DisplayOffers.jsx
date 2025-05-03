import AddOffers from './AddOffers'
import GetOffers from './GetOffers'

export default function DisplayOffers() {
    return (
        <section className="relative overflow-x-auto">
            <div className='w-300 mx-auto'>
                <div className='flex'>
                    <button onClick={() => {}} className='bg-primary uppercase font-medium px-3 py-2 me-2 text-xs hover:bg-secondary hover:text-white'>Ajouter une offre</button>
                <AddOffers />
                </div>
                <table className=" text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase bg-secondary">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Titre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Statut
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        < GetOffers />
                    </tbody>
                </table>
            </div>
        </section>
    )
}