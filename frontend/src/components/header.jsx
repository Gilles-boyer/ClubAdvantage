import logo from "/logo_test.png";
import Icon from '@mdi/react';
import { mdilPower } from '@mdi/light-js';
import Button from "./Button";

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
      <Button action={'Déconnexion'}
                          className={'btn-accent text-neutral hover:btn-secondary hover:text-white'} />
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
