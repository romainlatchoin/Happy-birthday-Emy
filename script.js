// -----------------------
// Script pour Happy Birthday Emy
// Minuteur universel + déblocage automatique des 7 jours
// -----------------------

// Fonction principale
async function updateTimer() {
  try {
    // Récupère l'heure UTC exacte depuis l'API
    const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await res.json();
    const now = new Date(data.utc_datetime);

    // Heure de déblocage prochaine journée (minuit UTC)
    const tomorrow = new Date(now);
    tomorrow.setUTCHours(24, 0, 0, 0); // minuit
    const diff = tomorrow - now;

    // Conversion en heures, minutes, secondes
    let heures = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secondes = Math.floor((diff % (1000 * 60)) / 1000);

    // Affichage du timer
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent = 
        `${heures.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${secondes.toString().padStart(2,'0')}`;
    }

    // Déblocage des jours selon la date UTC
    const jours = document.querySelectorAll('.jour');

    // Définition des jours 1 à 7 par rapport à une date de départ fixe
    const debutCalendrier = new Date(Date.UTC(2025, 10, 13, 0, 0, 0)); // Exemple : 13 novembre 2025
    const diffJours = Math.floor((now - debutCalendrier) / (1000 * 60 * 60 * 24));

    jours.forEach((jour, i) => {
      if (i <= diffJours && i < 7) {
        jour.style.display = 'block';
      } else {
        jour.style.display = 'none';
      }
    });

  } catch (err) {
    console.error('Erreur lors de la récupération de l’heure UTC :', err);
  }
}

// Mise à jour toutes les secondes
setInterval(updateTimer, 1000);
updateTimer();
