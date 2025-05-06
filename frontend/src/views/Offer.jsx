import Categories from "../components/Category/Categories";
import DisplayOffers from "../components/DisplayOffers";
// import CategoryList from "./Categories/CategoryList";

export default function Offer() {
    return <>
        <h2 className="text-center font-medium bg-accent py-4 w-full">Offres</h2>
        <Categories />
        <DisplayOffers />
    </>
}