import NavLinkButton from "./NavLink";
import Icon from '@mdi/react';
import { mdiHome, mdiAccountCircle, mdiShieldAccount, mdiGift, mdiQrcodeScan, mdiAccountGroup } from '@mdi/js';
import { usePermissions } from "../../hooks/userPermissions";

const Sidebar = () => {
  const Permission = usePermissions()
  return (
    <>
      <h1 className="text-2xl font-bold mb-8 mt-4 bg-neutral text-white border border-secondary border-t p-2 rounded-tr-xl rounded-bl-xl">ClubAdvantage</h1>
      <nav>
        <ul className="space-y-6">
            <NavLinkButton to="/" type="desktop" label="Accueil" icon={<Icon path={mdiHome} size={0.90} className="ms-5"/>}/>
            <NavLinkButton to="/profil" type="desktop" label="Profil" icon={<Icon path={mdiAccountCircle} size={0.90} className="ms-5"/>}/>
            <NavLinkButton to="/committees" type="desktop" label="CSE" icon={<Icon path={mdiAccountGroup} size={0.85} className="ms-5"/>}/>
            <NavLinkButton to="/offers" type="desktop" label="Offres" icon={<Icon path={mdiGift} size={0.80} className="ms-5"/>}/>
            {Permission.canEdit && (<NavLinkButton to="/scans" type="desktop" label="Scans" icon={<Icon path={mdiQrcodeScan} size={0.85} className="ms-5"/>}/>)}
            {Permission.isAdmin && (<NavLinkButton to="/roles" type="desktop" label="Roles" icon={<Icon path={mdiShieldAccount} size={0.85} className="ms-5"/>}/>)}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
