
export default function FilterByStatus({ selectedStatus, setSelectedStatus }) {

    return (
        <>
            <select
                className="select select-bordered w-full max-w-xs"
                value={selectedStatus}
                onChange={(e) => {
                    setSelectedStatus(e.target.value)
                    console.log(e.target.value)
                }
                }
            >
            <option value="all">—Filtrer les CSE—</option>
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
        </select >
        </>
    )
}