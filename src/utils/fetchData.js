/**
 * Récupère des données à partir d'une URL.
 * @param {string} url - L'URL à partir de laquelle récupérer les données.
 * @returns {Promise<any>} - Une promesse qui se résout en les données récupérées.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                return { error: true, message: 'User not found' };
            } else {
                return { error: true, message: `HTTP error! status: ${response.status}` };
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            return { error: true, message: 'Connection error' };
        }
        return { error: true, message: error.message };
    }
}

export default fetchData;
