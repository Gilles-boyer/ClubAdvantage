import LoginForm from "../components/Login/loginForm";
import logo from "/logo_test.png";

export default function Login() {
    return (
        <>
            <section className="min-h-screen flex flex-col items-center justify-center bg-neutral py-5">
                <div>
                    <h2 className="text-center font-medium text-xl md:text-4xl uppercase text-accent">Bienvenue sur ClubAdvantage</h2>
                    <div className="flex flex-col md:flex-row md:gap-8 items-center pb-5">
                        <img src={logo} alt="Logo ClubAdvantage" className="w-35 md:w-130 object-contain" />
                        <LoginForm  />
                    </div>
                </div>
            </section>
        </>
    );
}
