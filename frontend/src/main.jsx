import { StrictMode }   from 'react';
import { createRoot }   from 'react-dom/client';
import { Provider }     from 'react-redux';
import { store }        from './store/store.js';
import App              from './App.jsx';
import axios            from 'axios';
import './style/tailwind.css';
// import { client }    from './api/axiosInstance';

async function bootstrap() {
    try {
        // 1) On bâtit dynamiquement l'URL racine sans /api
        const rootURL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
        // 2) On récupère le CSRF-cookie et la session Laravel
        await axios.get(`${rootURL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        });
        console.log('✅ CSRF cookie obtenu');
    } catch (err) {
        console.error('❌ Échec du CSRF-cookie', err);
    }

    // 3) Puis on monte notre appli
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    );
}

bootstrap();
