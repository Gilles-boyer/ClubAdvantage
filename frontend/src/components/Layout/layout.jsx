import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";



export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-neutral flex items-center text-white h-18 w-full sticky top-0 z-2">
        <Header menu={{ isOpen, setIsOpen }} />
      </header>

        <div className="fixed bottom-0 left-0 w-screen z-10 bg-neutral md:hidden border-t border-gray-700">
          <MobileNav />
        </div>

      <div className="flex flex-grow w-full relative">
        <div className="hidden md:block">
          <aside className={`bg-accent border-e-1 border-secondary text-white p-4 transition-transform h-screen ${isOpen ? "block" : "hidden"} flex-shrink-0 sticky top-17`}>
            <Sidebar />
          </aside>
        </div>



        <main className="flex-grow p-4 min-w-0 overflow-x-auto">
          <div className="max-w-screen-xl mx-auto w-full">
            < Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-neutral text-white p-4 w-full pb-16 md:pb-4">
        <Footer />
      </footer>
    </div>
  );
}