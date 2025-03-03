// L'URL de base pour l'API
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// Les endpoints de l'API
const API_URLS = {
    USER: (id) => `${BASE_URL}/user/${id}`,
    USER_ACTIVITY: (id) => `${BASE_URL}/user/${id}/activity`,
    USER_AVERAGE_SESSIONS: (id) => `${BASE_URL}/user/${id}/average-sessions`,
    USER_PERFORMANCE: (id) => `${BASE_URL}/user/${id}/performance`,
}

export default API_URLS
