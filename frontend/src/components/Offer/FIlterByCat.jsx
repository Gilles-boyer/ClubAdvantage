
export default function FilterByCategories({ catList, selectedCat, setSelectedCat }) {

    return (
        <>
            <select
                className="select select-bordered w-full max-w-xs"
                value={selectedCat}
                onChange={(e) => {
                    setSelectedCat(parseInt(e.target.value))
                    console.log(e.target.value)
                }
                }
            >
            <option value="">— Filtrer les Offres par Catégories —</option>
            {catList.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select >
        </>
    )
}