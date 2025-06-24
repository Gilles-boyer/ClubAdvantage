import { createHashRouter }          from 'react-router-dom';
import ProtectedRoute                from '../components/Auth/ProtectedRoute';
import Login                         from '../views/Login';
import Layout                        from '../components/Layout/layout';
import Home                          from '../views/Home';
import Profil                        from '../views/Profil';
import Offer                         from '../views/Offer';
import Scan                          from '../views/Scan';
import Committee                     from '../views/Committee';
import Role                          from '../views/Role';
import { ErrorBoundary }             from '../components/ErrorBoundary';

const router = createHashRouter([
    {path: '/login', element: <Login />, errorElement: <ErrorBoundary />},
    // tout ce qui suit est protégé par PrivateRoute
    {
        element: <ProtectedRoute  />,
        children: [{
            path: '/',
            element: <Layout />,
            children: [
                { index: true,        element: <Home/> },
                { path: 'profil',     element: <Profil /> },
                { path: 'offers',     element: <Offer /> },
                { path: 'committees', element: <Committee /> },
                { path: 'scans',      element: <Scan /> },
                { path: 'roles',      element: <Role /> },
            ]
        }]
    }
]);

export default router;

