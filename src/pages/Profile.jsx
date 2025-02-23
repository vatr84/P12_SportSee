import { getUserData } from '../api/getUserData'
import Header from '../components/Header/Header'
import Loader from '../components/Loader/Loader'
import KeyDatas from '../components/graphs/Keydatas/KeyDatas'
import ActivityBarChart from '../components/graphs/ActivityBarChart/ActivityBarChart'
import AverageSessionsLineChart from '../components/graphs/AverageSessionsLineChart/AverageSessionsLineChart'
import Performances from '../components/graphs/Performances/Performances'
import Score from '../components/graphs/Score/Score'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import './Profile.css'

/**
 * Rend le composant Profile.
 *
 * @returns {JSX.Element} Le composant Profile rendu.
 */
export default function Profile() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await getUserData(Number(id))
            } catch (error) {
                if (error.message === 'User not found') {
                    setIsNotFound(true)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (isNotFound) {
        return <Navigate to="/404" />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <main>
            <div className="profil">
                <Header userId={Number(id)} />
                <ActivityBarChart userId={Number(id)} />
                <KeyDatas userId={Number(id)} />
                <AverageSessionsLineChart userId={Number(id)} />
                <Performances userId={Number(id)} />
                <Score userId={Number(id)} />
            </div>
        </main>
    )
}
