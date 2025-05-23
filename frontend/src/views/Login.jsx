import LoginForm from "../components/Login/loginForm";
import logo from "/logo.png";

export default function Login() {
    return (
        <>
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="flex gap-8 items-center">
                    <img src={logo} alt="Logo ClubAdvantage" className="h-auto" />
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
