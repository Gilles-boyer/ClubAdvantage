import NavLinkButton from "./NavLink";
import Icon from '@mdi/react';
import { mdiHome, mdiAccountEdit, mdiShieldAccount, mdiGift, mdiCropFree, mdiAccountGroup} from '@mdi/js';
import { usePermissions } from "../../hooks/userPermissions";

const MobileNav = () => {
const Permission = usePermissions()

    return (
        <>
            <nav>
                <ul className="menu menu-horizontal bg-neutral w-full flex justify-around align-center items-center">
                    <div className="tooltip p-1 uppercase" data-tip="Accueil">
                        <NavLinkButton to="/" type="mobile" icon={<Icon path={mdiHome} size={1} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="Profil">
                        <NavLinkButton to="/profil" type="mobile" icon={<Icon path={mdiAccountEdit} size={1.1} />} />
                    </div>
                    {(Permission.canEdit || Permission.isCSEAdmin) && (<div className="tooltip p-1 uppercase" data-tip="CSE">
                        <NavLinkButton to="/committees" type="mobile" icon={<Icon path={mdiAccountGroup} size={0.90} />} />
                    </div>)}
                    <div className="tooltip p-1 uppercase" data-tip="Offres">
                        <NavLinkButton to="/offers" type="mobile" icon={<Icon path={mdiGift} size={0.90} />} />
                    </div>
                    {Permission.canEdit && (<div className="tooltip p-1 uppercase" data-tip="Scan">
                        <NavLinkButton to="/scans" type="mobile" icon={<Icon path={mdiCropFree} size={0.90} />} />
                    </div>)}
                    {Permission.isAdmin && (<div className="tooltip p-1 uppercase" data-tip="Roles">
                        <NavLinkButton to="/roles" type="mobile" icon={<Icon path={mdiShieldAccount} size={0.90} />} />
                    </div>)}
                </ul>
            </nav>
        </>
    );
};

export default MobileNav;