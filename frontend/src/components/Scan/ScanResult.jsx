export default function ScanResult({ data }) {
    return (
        <div className="mt-6 p-4 border bg-white rounded-lg shadow-md text-center max-w-md mx-auto">
            <p className="text-green-600 font-bold text-lg mb-2">✅ Scan enregistré !</p>

            <div className="text-sm">
                <p><span className="font-semibold">Date :</span> {data.scanned_at}</p>
                <p><span className="font-semibold">Scanné par :</span> {data.scanned_by_name || "Inconnu"}</p>
                <p><span className="font-semibold">Utilisateur scanné :</span> {data.scanned_user_name || "Inconnu"}</p>
            </div>
        </div>
    );
}
