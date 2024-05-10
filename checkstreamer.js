const axios = require('axios');

// Fonction pour vérifier le statut de streaming d'un streamer spécifique
async function checkStreamerStatus(userId) {
    console.log("La fonction checkStreamerStatus est appelée.");
    const clientId = 'kdxbss3irisu6se5y4upqn5oxj9jc9';
    const clientSecret = '60uc0nobkm1din4bmzjbmyvor0e7kz';
    const accessToken = 'sx551k85hixjbssyzd2frjdibvhngg';

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Cibler l'élément <a> avec l'ID "twitch"
        const twitchAnchor = document.getElementById('twitch');

        // Si le tableau data est vide, le streamer n'est pas en live
        if (response.data.data.length === 0) {
            // Récupérer la date du dernier live
            const lastLiveDate = await getLastLiveDate(userId);
            // Afficher le message dans l'élément <a> avec l'ID "twitch"
            twitchAnchor.textContent = `Jackofswiss n'a pas stream depuis le ${lastLiveDate}`;
        } else {
            // Afficher le message dans l'élément <a> avec l'ID "twitch"
            twitchAnchor.innerHTML = `<h2>Jackofswiss</h2><img src="Onair.jpg" alt="En direct">`;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

// Fonction pour récupérer la date du dernier live
async function getLastLiveDate(userId) {
    const clientId = 'kdxbss3irisu6se5y4upqn5oxj9jc9';
    const clientSecret = '60uc0nobkm1din4bmzjbmyvor0e7kz';
    const accessToken = 'sx551k85hixjbssyzd2frjdibvhngg';

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=1`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.data.data.length > 0) {
            // Récupérer la date du dernier live
            const lastLiveDate = new Date(response.data.data[0].created_at);
            // Formater la date
            const formattedDate = `${lastLiveDate.getDate()} ${getMonthName(lastLiveDate.getMonth())} ${lastLiveDate.getFullYear()} à ${lastLiveDate.getHours()}h${lastLiveDate.getMinutes()}`;
            return formattedDate;
        } else {
            return "Aucun live trouvé.";
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération de la date du dernier live :', error);
        return "Date non disponible";
    }
}

// Fonction utilitaire pour obtenir le nom du mois
function getMonthName(monthIndex) {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    return months[monthIndex];
}

// Exemple d'utilisation de la fonction pour vérifier le statut de streaming d'un streamer avec son user_id
checkStreamerStatus('436382906');
