import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Profil from '../views/Profil';
import Login from '../views/Login';
import Layout from '../components/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Offer from '../views/Offer';
import Scan from '../views/Scan';
import Committees from '../views/Committee';
import Roles from '../views/Roles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '', element: <Home /> },
      { path: '/profil', element: <Profil /> },
      { path: '/login', element: <Login /> },
      { path: '/offers', element: <Offer /> },
      { path: '/committees', element: <Committee /> },
      { path: '/scan', element: <Scan /> },
      { path: '/roles', element: <Roles />},
    ]
  }
]);

export default router;
