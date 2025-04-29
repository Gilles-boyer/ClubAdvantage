import React from "react";
import Sidebar from "./Sidebar";
import Header from "./header";
import MainContent from "./MainContent";
import Footer from "./Footer"; // Si vous souhaitez un footer

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Zone centrale du dashboard */}
        <main className="p-4 flex-1 overflow-auto">
          <MainContent />
        </main>

        {/* Footer optionnel */}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;