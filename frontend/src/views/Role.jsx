import Button from "../components/Button"
import Roles from "../components/Role/Roles"

export default function Role() {
    return <>
        <h2 className="text-center font-medium bg-accent py-4 w-full">Roles</h2>
        <Roles />
        <div className="bg-white p-6 rounded-xl shadow-md ring-1 ring-gray-200 hover:scale-105 hover:-translate-y-1 transition-transform">
            <h2 className="text-lg font-semibold tracking-wide">Exemple</h2>
            <p className="text-gray-600">Profondeur avec plusieurs effets combinés.</p>
        </div>

    </>
}
