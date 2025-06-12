import { useState } from 'react';
import { Textbox } from 'react-inputs-validation';
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, selectAuth } from '../../store/slices/authSlice.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    const result = dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      setHidden(true);
      navigate('/profil');
    }
  };

  return (
    <>
      <div className="card bg-accent max-w-xs md:w-120 p-10 ring-2 ring-secondary" >
        <Icon path={mdilAccount} size={4}  className="text-accent bg-neutral rounded-full p-3 items-center mx-auto ring-1 ring-secondary"/>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-center">
          <div className="form-control mx-auto px-4 md:px-2 mb-4">
            <label htmlFor="nameCategory" className="label mb-2">
              <span className="label-text uppercase text-xs font-medium">Identifiant</span>
            </label>
            <Textbox
              attributesInput={{
                className: 'input ring-1 ring-secondary',
                placeholder: 'Insérez votre identifiant'
              }}
              value={''}
              onChange={() => ('')}
              onBlur={() => { }}
            />

      <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-center">
        {status === 'failed' && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

          <div className="form-control mx-auto px-4 md:px-2 mb-4">
            <label htmlFor="descriptionCategory" className="label mb-2">
              <span className="label-text uppercase text-xs font-medium">Mot de Passe</span>
            </label>
            <Textbox
              attributesInput={{
                className: 'input ring-1 ring-secondary',
                placeholder: 'Insérez votre mot de passe'
              }}
              value={''}
              onChange={() => ('')}
              onBlur={() => { }}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-5 uppercase text-xs">
            Se Connecter
          </button>
        </form>
      </div>
    </>)

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
