import { getUserData } from '../../api/getUserData'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import './Header.css'

/**
 * Composant Header.
 *
 * @component
 * @param {Object} props - Les props du composant.
 * @param {string} props.userId - L'ID de l'utilisateur.
 * @returns {JSX.Element} Le composant rendu.
 *
 * @example
 * return <Header userId={1} />
 */
export default function Header({ userId }) {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(userId)
                setUserData(userData)
            } catch (error) {
                console.error('Failed to fetch user informations:', error)
            }
        }
        fetchData()
    }, [userId])

    return (
        <header className="header">
            <h1>
                Bonjour{' '}
                <strong>{userData?.userInfo.userInfos.firstName}</strong>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </header>
    )
}

// Définition des PropTypes
Header.propTypes = {
    userId: PropTypes.number.isRequired,
}
