import { StrictMode }   from 'react'
import { createRoot }   from 'react-dom/client'
import { Provider }     from 'react-redux'
import { store }        from './store/store.js'
import App              from './App.jsx'
import './style/tailwind.css'

import { csrf }                 from './services/authService'
import { fetchCurrentUser }     from './store/slices/authSlice'

// 1) On récupère le CSRF-cookie et la session Laravel    
async function bootstrap() {
    try {
        await csrf()
        console.log('✅ CSRF cookie obtenu')
    } catch (err) {
        console.warn('⚠️ Impossible de récupérer le CSRF-cookie :', err)
    }

    // 2. On tente de recharger l’utilisateur
    try {
        await store.dispatch(fetchCurrentUser()).unwrap()
        console.log('✅ Utilisateur courant :', store.getState().auth.user)
    } catch {
        console.log('ℹ️ Aucune session active')
    }

    // 3) Puis on monte notre appli
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    )
}

bootstrap()