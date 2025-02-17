import Nav from '../components/Nav/Nav';
import SideNav from '../components/SideNav/SideNav';
import { Outlet } from 'react-router';
import './App.css';

/**
 * Rend le composant App.
 * Ce composant sert de mise en page principale pour l'application,
 * incluant la navigation et la navigation latérale.
 *
 * @returns {JSX.Element} Le composant App rendu.
 */
export default function App() {
    return (
        <>
            <Nav />
            <SideNav />
            <Outlet />
        </>
    );
}