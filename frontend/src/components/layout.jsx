import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header  className="bg-secondary flex items-center w-full text-white p-4 w-full">
        <Header menu={{isOpen, setIsOpen}} />
      </header>

      {/* Conteneur principal avec navigation et contenu */}
      <div className="flex flex-grow">
        {/* Navigation Drawer */}
        <aside className={`bg-gray text-white w-64 p-4 transition-transform h-screen ${isOpen ? "block" : "hidden"} flex-shrink-0`}>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 container mx-auto overflow-x-hidden">
          < Outlet/>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-white p-4 w-full">
        <Footer />
      </footer>
    </div>
  );
}