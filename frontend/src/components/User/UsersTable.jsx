import UpdateButton from "../UpdateButton"
import DeleteButton from "../DeleteButton"
import { useState } from "react"

export default function UsersTable({ users, onUpdate, onDelete, setToggle }) {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filtered = users.filter(us =>
        us?.last_name.toLowerCase().includes(search.toLowerCase())
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
    return (
        <>
            <div className="overflow-x-auto">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input input-bordered my-2 w-full max-w-md"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="overflow-x-auto border rounded-xl bg-white">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-primary text-gray-700 uppercase tracking-wider">
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
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium bg-accent">{user.last_name}</td>
                                    <td className="px-4 py-2">{user.first_name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.committee_id}</td>
                                    <td className="px-4 py-2">{user.role_name}</td>
                                    <td className="px-4 py-2">{user.status}</td>
                                    <td className="px-4 py-2 space-x-2 bg-accent">
                                        <UpdateButton
                                            item={user}
                                            onUpdate={() => {
                                                setToggle(true)
                                                onUpdate(user)
                                            }}
                                        />
                                        <DeleteButton id={user.id} onDelete={() => onDelete(user.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-evenly items-center mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        className="btn btn-secondary"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </>
    )
}