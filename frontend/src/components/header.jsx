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
      <button
        className="bg-neutral font-poppins font-medium text-xs px-3 py-2 rounded text-white hover:bg-primary uppercase"
        type="button"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Header;
