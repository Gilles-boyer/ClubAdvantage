import Button from "./Button";
import logo from "/logo.png";

const Header = ({ menu }) => {
  return (
    <div className="flex items-center justify-between w-full px-8">
      <img
        onClick={() => menu.setIsOpen(!menu.isOpen)}
        src={logo}
        alt="Logo ClubAdvantage"
        className="h-15 hover:pointer"
      />
      <div className="text-2xl font-bold">Dashboard</div>
      <Button path={'/login'} action={'Déconnexion'}className={'btn-secondary uppercase text-xs'}/>
    </div>
  );
};

export default Header;
