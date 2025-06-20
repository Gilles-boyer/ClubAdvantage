
export default function FilterByStatus({label, selectedStatus, setSelectedStatus }) {
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
            <option value="all">— Filtrer les {label} —</option>
                <option value="true">{label} {label === "Catégories" ? "Actives" : "Actifs"}</option>
                <option value="false">{label} {label === "Catégories" ? "Inactives" : "Inactifs"}</option>
        </select >
        </>
    )
}