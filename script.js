document.addEventListener('DOMContentLoaded', function() {
    var whiteBoxes = document.querySelectorAll('.white-box');
    var animationDuration = 4000; // Durée de l'animation en millisecondes

    setTimeout(function() {
        whiteBoxes.forEach(function(box) {
            box.classList.add('clickable');
        });
    }, animationDuration);
});


// Fonction pour mettre à jour le contenu du div "twitch"
async function updateTwitchInfo(userId) {
    const twitchDiv = document.getElementById('twitch');

    try {
        const response = await checkStreamerStatus(userId);

        // Si le streamer est en live
        if (response.live) {
            twitchDiv.innerHTML = `
                <h2>${response.displayName}</h2>
                <img src="Onair.jpg" alt="En direct">
            `;

        } else {
            twitchDiv.innerHTML = `
                <p>${response.displayName} n'a pas stream depuis le ${response.lastLiveDate}</p>
            `;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}


// Exemple d'utilisation de la fonction pour mettre à jour le contenu du div "twitch"
updateTwitchInfo('436382906');
