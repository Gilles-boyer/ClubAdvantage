import NavLinkButton from "./NavLink";
import Icon from '@mdi/react';
import { mdilHome, mdilAccount, mdilDiamondStone, mdilGift, mdilCropFree, mdilFactory } from '@mdi/light-js';


const Sidebar = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8 mt-4 bg-neutral text-white border border-secondary border-t p-2 rounded-tr-xl rounded-bl-xl">ClubAdvantage</h1>
      <nav>
        <ul className="space-y-6">
            <NavLinkButton to="/" label="Accueil" icon={<Icon path={mdilHome} size={0.90} className="ms-5"/>}/>
            <NavLinkButton to="/profil" label="Profil" icon={<Icon path={mdilAccount} size={0.90} className="ms-5"/>}/>
            <NavLinkButton to="/committees" label="CSE" icon={<Icon path={mdilFactory} size={0.85} className="ms-5"/>}/>
            <NavLinkButton to="/offers" label="Offres" icon={<Icon path={mdilGift} size={0.80} className="ms-5"/>}/>
            <NavLinkButton to="/scans" label="Scans" icon={<Icon path={mdilCropFree} size={0.85} className="ms-5"/>}/>
            <NavLinkButton to="/roles" label="Roles" icon={<Icon path={mdilDiamondStone} size={0.85} className="ms-5"/>}/>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
