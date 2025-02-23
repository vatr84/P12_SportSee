import { getUserData } from '../../../api/getUserData'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {
    Line,
    LineChart,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import './AverageSessionsLineChart.css'

/**
 * Composant CustomizedTooltip.
 *
 * @param {Object} props - Les props du composant.
 * @param {boolean} props.active - Indique si le tooltip est actif.
 * @param {Array} props.payload - Les données du payload pour le tooltip.
 * @returns {JSX.Element|null} Le composant CustomizedTooltip rendu.
 */
function CustomizedTooltip({ active, payload }) {
    if (active && payload) {
        return (
            <div className="custom-tooltip">
                <p>{`${payload[0].value}`} min</p>
            </div>
        )
    }
    return null
}
CustomizedTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
}

/**
 * Rend un composant de curseur personnalisé.
 *
 * @param {Object} props - Les props du composant.
 * @param {Array} props.points - Le tableau de points.
 * @returns {JSX.Element} Le composant de curseur personnalisé.
 */
function CustomizedCursor({ points }) {
    return (
        <Rectangle
            fill="black"
            opacity={0.1}
            x={points[1].x}
            width={500}
            height={500}
        />
    )
}
CustomizedCursor.propTypes = {
    points: PropTypes.array,
}

/**
 * Rend un composant de point actif.
 * @param {Object} props - Les props du composant.
 * @param {number} props.cx - La coordonnée x du centre du cercle.
 * @param {number} props.cy - La coordonnée y du centre du cercle.
 * @param {string} props.stroke - La couleur du contour du cercle.
 * @returns {JSX.Element} Le composant de point actif rendu.
 */
const ActiveDot = ({ cx, cy, stroke }) => {
    return (
        <g>
            <circle cx={cx} cy={cy} r={10} fill="white" fillOpacity={0.3} />
            <circle
                cx={cx}
                cy={cy}
                r={4}
                stroke={stroke}
                strokeWidth={2}
                fill="white"
            />
        </g>
    )
}
ActiveDot.propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    stroke: PropTypes.string,
}

/**
 * Rend le composant AverageSessionsLineChart.
 * @param {Object} props - Les props du composant.
 * @param {number} props.userId - L'ID de l'utilisateur.
 * @returns {JSX.Element} Le composant AverageSessionsLineChart rendu.
 */
export default function AverageSessionsLineChart({ userId = 0 }) {
    const [userAverageSessions, setUserAverageSessions] = useState({
        sessions: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData(userId)
                setUserAverageSessions({
                    sessions: data?.userAverageSessions,
                })
            } catch (error) {
                console.error('Failed to fetch user average sessions:', error)
            }
        }
        fetchData()
    }, [userId])

    // Formater les étiquettes de l'axe x pour afficher la première lettre du jour
    const xAxisFormatter = (day) => {
        switch (day) {
            case 1:
                return 'L'
            case 2:
                return 'M'
            case 3:
                return 'M'
            case 4:
                return 'J'
            case 5:
                return 'V'
            case 6:
                return 'S'
            case 7:
                return 'D'
            default:
                return ''
        }
    }

    // Attribuer une durée de session à chaque jour
    let sessions = userAverageSessions.sessions.map((session) => {
        return {
            day: session.day,
            sessionLength: session.sessionLength,
        }
    })

    // Ajouter une donnée supplémentaire au début et à la fin pour faire déborder la ligne du graphique
    if (sessions && sessions.length > 0) {
        const firstSession = { ...sessions[0] }
        firstSession.day -= 1
        sessions.unshift(firstSession)
        const lastSession = { ...sessions[sessions.length - 1] }
        lastSession.day += 1
        sessions.push(lastSession)
    }

    // Calculer la moyenne des sessions
    const average =
        sessions.reduce((sum, session) => sum + session.sessionLength, 0) /
        sessions.length

    // Définir les min et max à 60% en dessous et au-dessus de la moyenne
    // pour centrer le graphique et éviter le débordement
    const min = average * 0.4
    const max = average * 1.6

    return (
        <section className="averageSessions">
            <h2>Durée moyenne des sessions</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={sessions}
                    margin={{
                        top: 0,
                        right: -10,
                        left: -10,
                        bottom: 10,
                    }}
                >
                    <XAxis
                        dy={9}
                        dataKey="day"
                        tickFormatter={xAxisFormatter}
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fill: 'white',
                            fontSize: 12,
                            fontWeight: 500,
                        }}

                    />

                    <YAxis
                        hide={true}
                        domain={[`dataMin-${min}`, `dataMax+${max}`]}
                    />
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop offset="0%" stopColor="#ffffff33" />
                            <stop offset="66%" stopColor="#ffffffff" />
                        </linearGradient>
                    </defs>
                    <Line
                        type="natural"
                        dataKey="sessionLength"
                        dot={false}
                        strokeWidth={2}
                        unit=" min"
                        style={{ stroke: 'url(#gradient)' }}
                        activeDot={<ActiveDot />}
                    />

                    <Tooltip
                        className="custom-tooltip"
                        content={<CustomizedTooltip />}
                        cursor={<CustomizedCursor />}
                    />
                </LineChart>
            </ResponsiveContainer>
        </section>
    )
}

// Définition des PropTypes
AverageSessionsLineChart.propTypes = {
    userId: PropTypes.number.isRequired,
}
