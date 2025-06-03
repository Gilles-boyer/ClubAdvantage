import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Profil from '../views/Profil';
import Login from '../views/Login';
import Layout from '../components/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Offer from '../views/Offer';
import Scan from '../views/Scan';
import Committee from '../views/Committee';
import Role from '../views/Role';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />, 
    errorElement: <ErrorBoundary />
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '', element: <Home /> },
      { path: 'profil', element: <Profil /> },
      { path: 'offers', element: <Offer /> },
      { path: 'committees', element: <Committee /> },
      { path: 'scans', element: <Scan /> },
      { path: 'roles', element: <Role /> }
    ]
  }
]);
export default router
