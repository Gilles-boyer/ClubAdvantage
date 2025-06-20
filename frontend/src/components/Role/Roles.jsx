import { useEffect } from "react";
import { } from "../../services/rolesService";
import RoleTable from "./RoleTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, listOfRoles } from "../../store/slices/rolesSlice";

export default function Roles() {
    const roles = useSelector(listOfRoles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])




    return (
        <>

            <section className="overflow-x-auto w-80vw md:w-150 mx-auto">
                <RoleTable roles={roles}  />
            </section>
        </>
    );
}
