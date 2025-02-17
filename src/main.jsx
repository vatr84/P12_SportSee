import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Router as Routes } from './routes/router';

/**
 * Point d'entrée principal de l'application.
 * Charge les styles et rend le composant principal de l'application dans l'élément 'root'.
 *
 * @param {string} elementId - The element ID.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes />
  </StrictMode>
)
