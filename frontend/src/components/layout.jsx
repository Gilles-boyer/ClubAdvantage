import Sidebar from "./Sidebar";
import Header from "./header";
import MainContent from "./MainContent";
import Footer from "./Footer"; // Si vous souhaitez un footer

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-4 flex-1 overflow-auto">
          <MainContent />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;