import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker immediately for offline readiness
registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      console.log('Oratoria PWA Service Worker actif (scope:', r.scope, ')');
    }
  },
  onRegisterError(error) {
    console.warn('PWA Service Worker registration error:', error);
  },
});

createRoot(document.getElementById('root')!).render(<App />);

