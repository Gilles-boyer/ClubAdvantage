import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Appel CSRF
      await axios.get('http://192.168.1.38:8000/sanctum/csrf-cookie', { withCredentials: true });

      // Connexion
      const response = await axios.post('http://192.168.1.38:8000/api/login', {
        email,
        password
      }, { withCredentials: true });

      console.log('Connexion réussie !', response.data);
      navigate('/dashboard'); // 🔁 Redirection vers le tableau de bord
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="bg-[#D2B48C] rounded-xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Bonjour</h1>
        <p className="text-center mb-6">Bienvenue sur ClubAdvantage</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <div className="text-right text-sm">
            <a href="#" className="text-blue-700 hover:underline">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="w-full bg-[#3B2F2F] text-white p-2 rounded hover:opacity-90">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
