import DisplayOffers from "../components/DisplayOffers";
import CategoryForm from "./Categories/CategoryForm";
import CategoryList from "./Categories/CategoryList";

export default function Offer() {
    return <>
        <h2 className="text-center font-medium bg-accent py-4 w-full">Offres</h2>
        <CategoryForm />
        <CategoryList />
        <DisplayOffers />
    </>
}