import React from "react";

function Navigation() {
  return (
    <nav className="left-0 w-45 h-screen bg-gray shadow-lg p-6">
      <div className="py-3">
        <ul className="flex flex-col space-y-4">
          <li className="bg-dark py-2 rounded-xl text-white text-center text-xs font-poppins hover:bg-secondary transition cursor-pointer">
            Accueil
          </li>
          <li className="bg-dark py-2 rounded-xl text-white text-center text-xs font-poppins hover:bg-secondary transition cursor-pointer">
            Profil
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
