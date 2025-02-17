/**
 * Récupère des données à partir d'une URL.
 * @param {string} url - L'URL à partir de laquelle récupérer les données.
 * @returns {Promise<any>} - Une promesse qui se résout en les données récupérées.
 * @throws {Error} - S'il y a une erreur lors de la récupération des données.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()

        return data
    } catch (error) {
        console.error(`Failed to fetch data from ${url}:`, error)
        throw error
    }
}

export default fetchData
