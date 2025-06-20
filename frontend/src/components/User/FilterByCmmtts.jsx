export default function FilterByCmmtts({ committees, selectedCom, setSelectedCom }) {

    return (
        <>
            <select
                className="select select-bordered w-full max-w-xs"
                value={selectedCom}
                onChange={(e) => setSelectedCom(parseInt(e.target.value))}
            >
            <option value="">— Filtrer les Utilisateurs par CSE —</option>
            {committees.map(com => (
                <option key={com.id} value={com.id}>
                    {com.name}
                </option>
            ))}
        </select >
        </>
    )
}