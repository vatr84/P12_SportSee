import { getUserData } from '../api/getUserData'
import Header from '../components/Header/Header'
import Loader from '../components/Loader/Loader'
import KeyDatas from '../components/charts/Keydatas/KeyDatas'
import Activity from '../components/charts/Activity/Activity'

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
                <Activity userId={Number(id)} />
                <KeyDatas userId={Number(id)} />

            </div>
        </main>
    )
}
