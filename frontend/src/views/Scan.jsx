import Scans from '../components/Scans/Scans'

export default function Scan() {
    return <>
        <div className="flex items-center gap-6 mt-5 mb-4">
            <div className="flex-grow border-t border-neutral"></div>
            <h2 className="text-2xl font-semibold text-gray-700">Scans</h2>
            <div className="flex-grow border-t border-neutral"></div>
        </div>
        <Scans />
    </>
}