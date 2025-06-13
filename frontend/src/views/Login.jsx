import LoginForm from "../components/Login/LoginForm";
import logo from "/Logo_doré.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const handleHome = () => {
        navigate('/')
    }
    return (
        <>
            <section className="min-h-screen flex flex-col items-center justify-center bg-neutral py-5">
                <div>
                    <h2 className="text-center font-medium text-xl md:text-4xl uppercase text-accent">Bienvenue sur ClubAdvantage</h2>
                    <div className="flex flex-col md:flex-row md:gap-8 items-center pb-5">
                        <img src={logo} alt="Logo ClubAdvantage" className="w-35 md:w-130 object-contain" />
                        < LoginForm />
                    </div>
                    <div className="fixed left-200">
                        <Button path={"/"} className="bg-secondary text-white mt-5 py-2 px-3 rounded" label="Retour à l'accueil" onAction={handleHome} />
                    </div>
                </div>
            </section>
        </>
    );
}
