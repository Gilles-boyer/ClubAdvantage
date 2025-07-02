import Offers from "../components/Offer/Offers";
import Categories from "../components/Category/Categories";
import { usePermissions } from "../hooks/userPermissions";

export default function Offer() {
    const Permission = usePermissions()

    return <>
        {Permission.canEdit && (<Categories  />)}
        <Offers />
    </>
}