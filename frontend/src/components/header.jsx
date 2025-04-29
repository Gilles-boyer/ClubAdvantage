import React from "react";
import logo from "/logo.png";

const Header = ({ menu }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <img
        onClick={() => menu.setIsOpen(!menu.isOpen)}
        src={logo}
        alt="Logo ClubAdvantage"
        className="h-15"
      />
      <div className="text-2xl font-bold">Dashboard</div>
      <button
        className="bg-dark font-poppins text-xs px-3 py-2 rounded text-white hover:bg-primary"
        type="button"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Header;
