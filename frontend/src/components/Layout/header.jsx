import logo from "/Logo_doré.png";
import Icon from '@mdi/react';
import { mdiPower } from '@mdi/js';
import Button from "../Button";

const Header = ({ menu: { isOpen, setIsOpen }, onLogout }) => {
    return (
        <div className="flex items-center justify-between w-full py-2 md:py-0 px-2 md:px-8">
            <img
                onClick={() => setIsOpen(!isOpen)}
                src={logo}
                alt="Logo dde ClubAdvantage"
                className="h-12 md:h-17 hover:pointer"
            />
            <div className="text-2xl text-center font-bold me-3 md:me-0">Dashboard</div>

            {/* Desktop button */}
            <Button
                label="Déconnexion"
                className="btn-secondary btn-sm text-primary font-semibold hover:btn-accent hidden md:block"
                onAction={onLogout}
            />

            {/* Mobile icon button */}
            <button
                className="bg-secondary px-1 py-1 rounded-full text-neutral hover:bg-accent hover:text-neutral uppercase block md:hidden"
                type="button"
                onClick={onLogout}
            >
                <Icon path={mdiPower} size={1} />
            </button>
        </div>
    );
};

export default Header;
