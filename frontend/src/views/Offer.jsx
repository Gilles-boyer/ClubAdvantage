import Offers from "../components/Offer/Offers";
// import CategoriesView from "./Categories";
import Categories from "../components/Category/Categories";

export default function Offer() {
    return <>
        <h2 className="text-center font-medium bg-accent py-4 w-full">Offres & Catégories</h2>
        <Categories />
        <Offers />
    </>
}