import Button from "../Button"
import { useState } from "react"
import MobilePagination from "../mobilePagination"
import StatusBadge from "./StatusBadge"

export default function UsersTable({ users, onUpdate, onDelete, setToggle, setEditMode }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [visibleCards, setVisibleCards] = useState(3)
    const itemsPerPage = 6

    const filtered = users.filter(us =>
        (us?.last_name + ' ' + us?.first_name + ' ' + us?.email).toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const mobileView = users.slice(0, visibleCards)
    return (
        <>
            <div className="overflow-x-auto hidden md:block">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input input-bordered my-2 w-full max-w-md hover:border-secondary hover:ring-secondary hover:ring-1"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="overflow-x-auto border border-secondary rounded-xl bg-white">
                    <table className="min-w-full text-left text-sm ">
                        <thead className="bg-primary text-white uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Prénom</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">CSE</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-gray-300 border-t hover:bg-gray-100 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">{user.last_name}</td>
                                    <td className="px-4 py-2">{user.first_name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2"key={user.committee_id}>{user.committee_name}</td>
                                    <td className="px-4 py-2">{user.role_name}</td>
                                    <td className="px-4 py-2"><StatusBadge status={user.status}/></td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <Button action={'update'} onAction={() => {
                                            setToggle(true),
                                                onUpdate(user)
                                        }} />
                                        <Button action={'delete'} onAction={() => { onDelete(user.id) }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length > 1 && (<div className="flex justify-evenly items-center mt-4">
                    <button
                        className="btn btn-neutral"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        className="btn btn-neutral"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>)}
            </div>
            {/* Cards pour les écrans de téléphones */}
            <article className="block md:hidden space-y-5">
                {mobileView.map((user) => (
                    <div key={user.id} className="card bg-accent w-80vw card-xs shadow-xl p-3 border border-secondary">
                        <div className="flex justify-between mb-3">
                            <div className="badge badge-neutral font-medium text-white">{user.role_name}</div>
                                <StatusBadge status={user.status}/>
                        </div>
                        <h3 className="card-title font-medium pb-1 text-lg rounded ps-0.5">{user.last_name} {user.first_name}</h3>
                        <div className="card-body bg-white border border-gray-200 rounded-md">
                            <div className="flex flex-col">
                                <p className="text-sm">
                                    <span className="font-medium">Email : </span>{user.email}</p>
                                <p className="text-sm">
                                    <span className="font-medium">CSE : </span>{user.committee_name}</p>
                            </div>
                            <div className="card-action flex space-x-2 mt-2">
                                <div className="flex mt-0 md:mt-2 space-x-2">
                                    <Button action={'update'} 
                                    href={"#userForm"}
                                    onAction={() => {
                                        setToggle(true);
                                        onUpdate(user);
                                        setEditMode(true);
                                    }} />
                                    <Button action={'delete'} onAction={() => { onDelete(user.id) }} />
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
                < MobilePagination object={users} visibleCards={visibleCards} setVisibleCards={setVisibleCards}/>
            </article>
        </>
    )
}