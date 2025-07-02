import { Navigate, Outlet } from 'react-router-dom';
import { verifyToken } from '../../services/authService';
import { useState, useEffect } from 'react';

export default function ProtectedRoute() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await verifyToken();
                // console.log('Token valide:', response);
                setStatus(true);
            } catch  {
                // console.log('Token invalide:', error);
                setStatus(false);
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
            }
        };

        checkAuth();
    }, []);

    // console.log('Valeur du status:', status);

    if (status === null) {
        return (<div className='text-center p-5 bg-neutral text-secondary rounded h-screen'>
            <p className='font-medium'>Vérification des informations...</p>
            </div>)
    }
    if (status === false) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}