import { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';
import logo from '/logo_test.png';

export default function Login() {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="flex justify-center items-center bg-neutral min-h-screen">
      <div>
        <h2 className="text-center font-medium text-4xl uppercase text-accent">
          Bienvenue sur ClubAdvantage
        </h2>
        <div className="flex gap-8 items-center mt-8">
          <img
            src={logo}
            alt="Logo ClubAdvantage"
            className="h-150 cursor-pointer"
            onClick={() => setHidden(!hidden)}
          />
          {hidden && <LoginForm setHidden={setHidden} />}
        </div>
      </div>
    </div>
  );
}
