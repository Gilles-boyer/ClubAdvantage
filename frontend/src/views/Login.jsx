import { useState } from "react";
import LoginForm from "../components/Login/loginForm";
import logo from "/logo_test.png";

export default function Login() {
    const [hidden, setHidden] = useState(false)
    return (
        <>
            <div className="flex justify-center items-center bg-neutral min-h-[calc(100vh-0px)]">
                <div className="flex gap-8 items-center">
                    <img src={logo} alt="Logo ClubAdvantage" className="h-150" onClick={() => setHidden(!hidden)}/>
                    {hidden && (<LoginForm setHidden={hidden}/>)}
                </div>
            </div>
        </>
    );
}
