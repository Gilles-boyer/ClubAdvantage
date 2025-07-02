import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser, selectAuth } from "../store/slices/authSlice";
import { useEffect } from "react";

export const usePermissions = () => {
    const user = useSelector(selectAuth);
    const dispatch = useDispatch()

    console.log('Valeurs de USER =>', user);
    useEffect(() => {
        if (!user) {
            dispatch(fetchAuthUser())
        }

    }, [dispatch, user])

    return {
        canEdit: ["super_admin", "staff"].includes(user?.role_name),
        isCSE: ["cse_admin", "cse_member"].includes(user?.role_name),
        isAdmin: user?.role_name === "super_admin",
        isStaff: user?.role_name === "staff",
        isCSEAdmin: user?.role_name === "cse_admin",
        isCSEMember: user?.role_name === "cse_member"
    };
};
