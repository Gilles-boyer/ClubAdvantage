// import { useState } from 'react';
import LoginForm from "./LoginForm";
// import ToastAlert from "../ToastAlert";

export default function Login() {
    // const { user, status} = useSelector();
// ! email => admin@example.com
// ! password => manger12345

    // toast local pour succès + erreur
    // const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    // Si déjà logué, on redirige direct
    // useEffect(() => {
    //     if (user) navigate('/', { replace: true });
    // }, [user, navigate]);

    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     try {
    //         await getToken().then(() => {
    //             loginRequest()
    //         })
    //     } catch (err) {
    //         setToast({ show: true, type: 'error', message: err })
    //     }
    // }
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-neutral p-6">
            <div className="w-full max-w-md">
                <h2 className="text-center text-3xl font-bold mb-6 text-accent">
                    Bienvenue sur ClubAdvantage
                </h2>
                {/* toast succès local */}
                {/* {toast.show && <ToastAlert toast={toast} setToast={setToast} />} */}
                <LoginForm />
            </div>
        </section>
    );
}
