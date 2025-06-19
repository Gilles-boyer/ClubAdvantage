
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
            <option value="all">— Filtrer les Catégories —</option>
                <option value="true">Catégories Actives</option>
                <option value="false">Catégories Inactives</option>
        </select >
        </>
    )
}