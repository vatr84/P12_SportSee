import fetchData from '../utils/fetchData'
import API_URLS from './apiUrls'
import { getMockedUserData } from './mockData'

// Définir cette variable à true pour utiliser des données simulées
const useMockedData = import.meta.env.VITE_APP_USE_MOCKED_DATA === 'true'

/**
 * Récupère les données de l'utilisateur depuis l'API.
 * @param {string} id - L'ID de l'utilisateur.
 * @returns {Promise<Object>} - Une promesse qui se résout en un objet contenant les données de l'utilisateur.
 */
export const getUserData = async (id) => {
    if (useMockedData) {
        return getMockedUserData(id)
    }

    const urls = [
        API_URLS.USER(id),
        API_URLS.USER_ACTIVITY(id),
        API_URLS.USER_AVERAGE_SESSIONS(id),
        API_URLS.USER_PERFORMANCE(id),
    ]

    const [userInfo, userActivity, userAverageSessions, userPerformance] =
        await Promise.all(urls.map((url) => fetchData(url)))

    // Vérifier si l'utilisateur a été trouvé
    if (!userInfo || !userInfo.data || !userInfo.data.id) {
        throw new Error('User not found')
    }

    return {
        userInfo: {
            userId: userInfo.data.id,
            userInfos: userInfo.data.userInfos,
            userKeyData: userInfo.data.keyData,
            userScore: userInfo.data.todayScore || userInfo.data.score,
        },
        userActivity: userActivity.data.sessions,
        userAverageSessions: userAverageSessions.data.sessions,
        userPerformance: {
            kind: userPerformance.data.kind,
            kindValue: userPerformance.data.data,
        },
    }
}
