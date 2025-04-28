import React from 'react';
import logo from '/logo.png'

function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-secondary shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo ClubAdvantage" className="h-15" />
        <a href="#"></a>
      </div>
        <h1 className='font-poppins text-2xl font-semibold'>ClubAdvantage</h1>
      <div>
        <button className="bg-dark text-white text-xs font-inter px-4 py-2 rounded-lg shadow">
          Déconnexion
        </button>
      </div>
    </header>
  );
}

export default Header;
