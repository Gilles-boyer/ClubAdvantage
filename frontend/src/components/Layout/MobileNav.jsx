import NavLinkButton from "./NavLink";
import Icon from '@mdi/react';
import { mdilHome, mdilAccount, mdilDiamondStone, mdilGift, mdilCropFree, mdilFactory } from '@mdi/light-js';


const MobileNav = () => {
    return (
        <>
            <nav>
                <ul className="menu menu-horizontal bg-neutral w-full flex justify-around align-center items-center">
                    <div className="tooltip p-1 uppercase" data-tip="Accueil">
                        <NavLinkButton to="/" type="mobile" icon={<Icon path={mdilHome} size={1} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="Profil">
                        <NavLinkButton to="/profil" type="mobile" icon={<Icon path={mdilAccount} size={1.1} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="CSE">
                        <NavLinkButton to="/committees" type="mobile" icon={<Icon path={mdilFactory} size={0.90} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="Offres">
                        <NavLinkButton to="/offers" type="mobile" icon={<Icon path={mdilGift} size={0.90} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="Scan">
                        <NavLinkButton to="/scans" type="mobile" icon={<Icon path={mdilCropFree} size={0.90} />} />
                    </div>
                    <div className="tooltip p-1 uppercase" data-tip="Roles">
                        <NavLinkButton to="/roles" type="mobile" icon={<Icon path={mdilDiamondStone} size={0.90} />} />
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default MobileNav;
