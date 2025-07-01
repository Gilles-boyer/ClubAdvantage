import Committees from "../components/Committee/Committees"
import Users from "../components/User/Users"
import { usePermissions } from "../hooks/userPermissions"

export default function Committee() {
    const Permission = usePermissions()
    return <>
        {Permission.canEdit && (
            <Committees />)}
        <Users />
    </>
}