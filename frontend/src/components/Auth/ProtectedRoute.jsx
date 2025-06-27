import { Navigate, Outlet } from 'react-router-dom';
import { verifyToken } from '../../services/authService';
import { useState, useEffect } from 'react';

export default function ProtectedRoute() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verifyToken();
                console.log('Token valide:', response);
                setStatus(true);
            } catch (error) {
                console.log('Token invalide:', error);
                setStatus(false);
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
            }
        };

        checkAuth();
    }, []);

    console.log('Valeur du status:', status);

    if (status === null) {
        console.log('Vérification du token...');
    }
    if (status === false) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}