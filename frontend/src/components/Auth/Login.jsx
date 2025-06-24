import { getToken } from '../../services/authService';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ToastAlert from "../ToastAlert";

export default function Login() {
    const navigate = useNavigate();
    // const { user, status} = useSelector();
    try {
        const response = getToken()
        console.log('voici la réponse envoyée :', response);
    } catch (err){
        console.log(err);
        
    }

    // toast local pour succès + erreur
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    // Si déjà logué, on redirige direct
    // useEffect(() => {
    //     if (user) navigate('/', { replace: true });
    // }, [user, navigate]);

    const handleLogin = async () => {
        try {
            // 1) login (renvoie user + cookies)

            // 2) on redirige tout de suite
            navigate('/', { replace: true })
        } catch (err) {
            setToast({ show: true, type: 'error', message: err })
        }
    }
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-neutral p-6">
            <div className="w-full max-w-md">
                <h2 className="text-center text-3xl font-bold mb-6 text-accent">
                    Bienvenue sur ClubAdvantage
                </h2>
                {/* toast succès local */}
                {toast.show && <ToastAlert toast={toast} setToast={setToast} />}
                <LoginForm onSubmit={handleLogin} />
            </div>
        </section>
    );
}
