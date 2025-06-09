import logo from "/logo_test.png";
import Icon from '@mdi/react';
import { mdilPower } from '@mdi/light-js';

const Header = ({ menu }) => {
  return (
    <div className="flex items-center justify-between w-full px-8">
      <img
        onClick={() => menu.setIsOpen(!menu.isOpen)}
        src={logo}
        alt="Logo ClubAdvantage"
        className="h-17 hover:pointer"
      />
      <div className="text-2xl font-bold">Dashboard</div>
      <button
        className="bg-accent font-poppins font-medium text-xs px-3 py-2 rounded text-black hover:bg-secondary uppercase"
        type="button"
      >
        Déconnexion
      </button>
            <button
        className="bg-neutral text-xs px-1 py-1 
        rounded-full text-white hover:bg-accent hover:text-neutral uppercase block md:hidden"
        type="button"
      >
      <Icon path={mdilPower} size={1} />
      </button>
    </div>
  );
};

export default Header;
