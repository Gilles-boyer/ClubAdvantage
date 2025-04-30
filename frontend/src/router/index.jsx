import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Profil from '../views/Profil';
import Layout from '../components/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '', element: <Home /> },
      { path: '/profil', element: <Profil /> },
    ]
  }
]);

export default router;