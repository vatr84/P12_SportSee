import { getUserData } from '../../../api/getUserData'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
} from 'recharts'
import './ScoreRadialBarChart.css'

/**
 * Le composant Score affiche le score de l'utilisateur sous forme de graphique en barres radiales.
 * @param {Object} props - Les props du composant.
 * @param {string} props.userId - L'ID de l'utilisateur.
 * @returns {JSX.Element} - Le composant ScoreRadialBarChart rendu.
 */
export default function ScoreRadialBarChart({ userId }) {
    const [score, setScore] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(userId)
                setScore(userData?.userInfo?.userScore || 0)
            } catch (error) {
                console.error('Failed to fetch user score:', error)
            }
        }
        fetchData()
    }, [userId])

    // Calculer le score
    const calculatedScore = score * 100
    const scoreValue = [{ value: calculatedScore }]
    const newScore = calculatedScore

    return (
        <section className="score">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    data={scoreValue}
                    innerRadius={200}
                    barSize={10}
                    startAngle={90}
                    endAngle={440}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                    />
                    <RadialBar
                        dataKey="value"
                        cornerRadius={14}
                        fill={'#FF0000'}
                    />
                    <text
                        x="50%"
                        y="42%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="26"
                        fontWeight="700"
                        fill="black"
                    >
                        {newScore}%
                    </text>
                    <text
                        x="50%"
                        y="46%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="16"
                        fill="gray"
                        fontWeight="500"
                    >
                        <tspan x="50%" dy="1.2em">
                            de votre
                        </tspan>
                        <tspan x="50%" dy="1.2em">
                            objectif
                        </tspan>
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </section>
    )
}

// Définition des PropTypes
ScoreRadialBarChart.propTypes = {
    userId: PropTypes.number.isRequired,
}
