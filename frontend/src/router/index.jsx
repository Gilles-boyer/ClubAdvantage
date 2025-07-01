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
import Register from '../views/Register';
import { ErrorBoundary }             from '../components/ErrorBoundary';


const router = createHashRouter([
    {path: '/login', element: <Login />, errorElement: <ErrorBoundary />},
    {path: '/register', element: <Register />, errorElement : <ErrorBoundary />},
    // tout ce qui suit est protégé par PrivateRoute
    {
        element: <ProtectedRoute  />,
        children: [{
            path: '/',
            element: <Layout />,
            errorElement: <ErrorBoundary />,
            children: [
                { index: true,        element: <Home/>, errorElement: <ErrorBoundary /> },
                { path: 'profil',     element: <Profil />, errorElement: <ErrorBoundary /> },
                { path: 'offers',     element: <Offer />, errorElement: <ErrorBoundary /> },
                { path: 'committees', element: <Committee />, errorElement: <ErrorBoundary /> },
                { path: 'scans',      element: <Scan />, errorElement: <ErrorBoundary /> },
                { path: 'roles',      element: <Role />, errorElement: <ErrorBoundary /> },
            ]
        }]
    }
]);

export default router;

