import { useState } from 'react';
import { Textbox } from 'react-inputs-validation';
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, selectAuth } from '../../store/slices/authSlice.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setHidden }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectAuth);
  const navigate = useNavigate();

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e)
    const result = dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      setHidden(true);
      navigate('/profil');
    }
  };

  return (
    <div className="p-5 mx-auto rounded-xl bg-accent w-120 py-10 ring-2 ring-secondary">
      <Icon
        path={mdilAccount}
        size={4}
        className="text-accent bg-neutral rounded-full p-3 mx-auto ring-1 ring-secondary"
      />

      <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-center">
        {status === 'failed' && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text uppercase text-xs">Identifiant</span>
          </label>
          <Textbox
            attributesInput={{
              className: 'input ring-1 ring-secondary w-full',
              placeholder: 'Insérez votre identifiant',
            }}
            value={email}
            onChange={val => setEmail(val)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text uppercase text-xs">Mot de passe</span>
          </label>
          <Textbox
            type="password"
            attributesInput={{
              className: 'input ring-1 ring-secondary w-full',
              placeholder: 'Insérez votre mot de passe',
            }}
            value={password}
            onChange={val => setPassword(val)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary uppercase text-xs"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
