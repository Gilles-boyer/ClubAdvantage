import Offers from '../components/Offer/Offers'

export default function Home() {
    return <>
        <div className="flex items-center gap-6 mt-5 mb-4">
                <div className="flex-grow border-t border-neutral"></div>
                <h2 className="text-2xl font-semibold text-gray-700">Bienvenue</h2>
                <div className="flex-grow border-t border-neutral"></div>
            </div>
        < Offers />
    </>
}