import { Link, NavLink } from 'react-router'
import './Nav.css'
import logo from '/logo.svg'

/**
 * Rend le composant de navigation.
 *
 * @returns {JSX.Element} Le composant de navigation rendu.
 *
 * @example
 * return <Nav />
 */
export default function Nav() {
    return (
        <nav className="nav" aria-label="Menu principal">
            <Link className="home-link" to="/">
                <img className="logo" src={logo} alt="Logo SportSee" />
            </Link>
            <ul className="menu">
                <li className="menu-item">
                    <NavLink className="menu-link" to="/" aria-label="Accueil">
                        Accueil
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="menu-link" to="/" aria-label="Profil">
                        Profil
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="menu-link" to="/" aria-label="Réglages">
                        Réglages
                    </NavLink>
                </li>
                <li className="menu-item">
                    <Link className="menu-link" href="/" aria-label="Communauté">
                        Communauté
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
