import { getUserData } from '../../../api/getUserData'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import './KeyDatas.css'
import { KeyDatasCard as Card } from './KeyDatasCard'

/**
 * Rend le composant KeyDatas.
 * @param {Object} props - Les props du composant.
 * @param {number} props.userId - L'ID de l'utilisateur.
 * @returns {JSX.Element} Le composant KeyDatas rendu.
 */
export default function KeyDatas({ userId = 0 }) {
    const [keyData, setKeyData] = useState({
        calorieCount: 0,
        proteinCount: 0,
        carbohydrateCount: 0,
        lipidCount: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(userId)
                setKeyData({
                    calorieCount: userData?.userInfo?.userKeyData.calorieCount,
                    proteinCount: userData?.userInfo?.userKeyData.proteinCount,
                    carbohydrateCount:
                        userData?.userInfo?.userKeyData.carbohydrateCount,
                    lipidCount: userData?.userInfo?.userKeyData.lipidCount,
                })
            } catch (error) {
                console.error('Failed to fetch user key data:', error)
            }
        }
        fetchData()
    }, [userId])

    return (
        <section className="keyDatas">
            <h2 className="sr-only">Données clés</h2>
            {keyData && (
                <>
                    <Card
                        title="Calories"
                        value={keyData?.calorieCount}
                        unit="kCal"
                        color="#e60000"
                    />
                    <Card
                        title="Protéines"
                        value={keyData?.proteinCount}
                        unit="g"
                        color="#4AB8FF"
                    />
                    <Card
                        title="Glucides"
                        value={keyData?.carbohydrateCount}
                        unit="g"
                        color="#FDCC0C"
                    />
                    <Card
                        title="Lipides"
                        value={keyData?.lipidCount}
                        unit="g"
                        color="#FD5181"
                    />
                </>
            )}
        </section>
    )
}

// Définition des PropTypes
KeyDatas.propTypes = {
    userId: PropTypes.number,
}
