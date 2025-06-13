export default function StatusBadge({ status }) {
    return (<>
        {status === "active" && (
            <div className="text-white badge badge-info w-17 md:uppercase font-medium md:badge-lg md:text-xs md:py-2">Actif</div>
        )}
        {status === "inactive" && (
            <div className="text-white badge badge-warning w-17 md:uppercase font-medium md:badge-lg md:text-xs md:py-2">Inactif</div>
        )}
        {status === "expired" && (
            <div className="text-white badge badge-error w-17 md:uppercase font-medium md:badge-lg md:text-xs md:py-2">Expiré</div>
        )}
    </>)
}