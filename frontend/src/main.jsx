import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import './style/tailwind.css'

import { fetchUser } from './services/authService'


// 1) On récupère le CSRF-cookie et la session Laravel    
async function bootstrap() {
    // try {
    //     await getToken()
    //     console.log('✅ CSRF cookie obtenu')
    // } catch (err) {
    //     console.warn('⚠️ Impossible de récupérer le CSRF-cookie :', err)
    // }
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token
    console.log('voici user :', user.token);
    console.log(typeof(user.token));
    
    // 2. On tente de recharger l’utilisateur
    if(token){
    try {
        await fetchUser(), {
            headers: `Bearer ${token}`
        }
        console.log('✅ Utilisateur courant :')
    } catch {
        console.log('ℹ️ Aucune session active')
    }
} else {
    console.log('Error token is absent or null !');
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