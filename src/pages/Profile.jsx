import { getUserData } from '../api/getUserData';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import KeyDatas from '../components/graphs/Keydatas/KeyDatas';
import ActivityBarChart from '../components/graphs/ActivityBarChart/ActivityBarChart';
import AverageSessionsLineChart from '../components/graphs/AverageSessionsLineChart/AverageSessionsLineChart';
import PerformancesRadarChart from '../components/graphs/PerformancesRadarChart/PerformancesRadarChart';
import ScoreRadialBarChart from '../components/graphs/ScoreRadialBarChart/ScoreRadialBarChart';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import './Profile.css';

/**
 * Rend le composant Profile.
 *
 * @returns {JSX.Element} Le composant Profile rendu.
 */
export default function Profile() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [hasConnectionError, setHasConnectionError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await getUserData(Number(id));
                if (result.error) {
                    if (result.message === 'Connection error') {
                        setHasConnectionError(true);
                    } else if (result.message === 'User not found') {
                        setIsNotFound(true);
                    } else {
                        setHasConnectionError(true); // Pour toutes les autres erreurs
                    }
                }
            } catch (error) {
                setHasConnectionError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isNotFound) {
        return <Navigate to="/error" state={{ message: 'User not found' }} />;
    }

    if (hasConnectionError) {
        return <Navigate to="/error" state={{ message: 'Connection error' }} />;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main>
            <div className="profil">
                <Header userId={Number(id)} />
                <ActivityBarChart userId={Number(id)} />
                <KeyDatas userId={Number(id)} />
                <AverageSessionsLineChart userId={Number(id)} />
                <PerformancesRadarChart userId={Number(id)} />
                <ScoreRadialBarChart userId={Number(id)} />
            </div>
        </main>
    );
}
