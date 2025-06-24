import { Navigate, Outlet } from 'react-router-dom';
import { useSelector }      from 'react-redux';
import { selectAuth }       from '../../store/slices/authSlice';

export default function ProtectedRoute() {
    const { user, status } = useSelector(selectAuth);

    // pendant qu’on charge le currentUser, on peut afficher un loader
    if (status === 'loading') {
        return <p className="text-center mt-8">Chargement…</p>;
    }

    // si pas d’utilisateur, redirige vers /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // sinon, on rendemare les routes enfants
    return <Outlet />;
}
