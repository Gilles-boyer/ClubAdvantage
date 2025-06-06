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
      <header className="bg-neutral flex items-center text-white w-full">
        <Header menu={{ isOpen, setIsOpen }} />
      </header>

      {/* Conteneur principal avec navigation et contenu */}
      <div className="flex flex-grow w-full">
        {/* Navigation Drawer */}
        <aside className={`bg-accent text-white p-4 transition-transform h-screen ${isOpen ? "block" : "hidden"} flex-shrink-0`}>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 min-w-0 overflow-x-auto">
          <div className="max-w-screen-xl mx-auto w-full">
            < Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-neutral text-white p-4 w-full">
        <Footer />
      </footer>
    </div>
  );
}