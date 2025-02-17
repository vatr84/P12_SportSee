import './Loader.css'

/**
 * Un composant qui affiche une animation de chargement.
 *
 * @returns {JSX.Element} Le composant Loader rendu.
 *
 * @example
 * return <Loader />
 */
const Loader = () => {
    return (
        <div className="loader">
            <div className="bounce">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
            </div>
        </div>
    )
}

export default Loader
