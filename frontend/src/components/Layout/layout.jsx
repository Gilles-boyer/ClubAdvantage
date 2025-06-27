import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { logoutThunk } from "../../store/slices/authSlice";
import client from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./header";
import Footer from "./footer";
import MobileNav from "./MobileNav";
import ScrollComponent from "../scrollToTop";
import ToastAlert from "../ToastAlert";
import { logout } from "../../services/authService";

export default function App() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [showScroll, setShowScroll] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setShowScroll(window.scrollY > 200);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleScroll = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log("Error on logout", err);
        }
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        delete client.defaults.headers.common.Authorization;
        navigate("/login")
    };

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <header className="bg-neutral flex items-center text-white h-18 w-full sticky top-0 z-20">
                    <Header
                        menu={{ isOpen, setIsOpen }}
                        onLogout={handleLogout}
                    />
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
                        <div className="max-w-screen-xl mx-auto w-full" ref={scrollRef}>
                            < Outlet />
                        </div>
                    </main>
                </div>
                <footer className="bg-neutral text-white p-4 w-full pb-16 md:pb-4">
                    <Footer />
                </footer>

                {showScroll && <ScrollComponent handleScroll={handleScroll} />}
            </div>

            <ToastAlert toast={toast} setToast={setToast} />
        </>
    );
}
