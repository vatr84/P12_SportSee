import Icone from '../../Icones/Icones'
import PropTypes from 'prop-types'

/**
 * Rend un composant KeyDatasCard.
 *
 * @component
 * @param {Object} props - Les props du composant.
 * @param {string} props.title - Le titre de la carte.
 * @param {string} props.value - La valeur à afficher dans la carte.
 * @param {string} props.color - La couleur de la carte.
 * @param {string} props.unit - L'unité de mesure de la valeur.
 * @returns {JSX.Element} Le composant KeyDatasCard rendu.
 */
export function KeyDatasCard({
    title = '',
    value = '',
    color = '',
    unit = '',
}) {
    return (
        <aside className="dataCard">
            <Icone
                className="dataCard__icon"
                title={title}
                type={title.toLowerCase()}
                color={color}
            />
            <div className="dataCard__data">
                <h3 className="dataCard__title">{title}</h3>
                <p className="dataCard__value">
                    {value}
                    {unit}
                </p>
            </div>
        </aside>
    )
}

KeyDatasCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    color: PropTypes.string,
}
