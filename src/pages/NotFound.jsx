import { Link } from 'react-router'
import './NotFound.css'

/**
 * Rend le composant NotFound.
 *
 * @returns {JSX.Element} Le composant NotFound rendu.
 */
export default function NotFound() {
    return (
        <main>
            <div className="notfound">
                <h1>404</h1>
                <p>La page que vous demandez ne semble pas exister...</p>
                <Link className="button" to={'/'}>
                    Revenir au profil
                </Link>
            </div>
        </main>
    )
}
