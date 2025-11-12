// -----------------------
// Compteur synchronisé France
// -----------------------

async function updateTimer() {
  try {
    // Récupère l'heure exacte en France via l'API
    const res = await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris');
    const data = await res.json();
    const now = new Date(data.datetime);

    // Prochain minuit en France
    const demain = new Date(now);
    demain.setHours(24, 0, 0, 0);
    const diff = demain - now;

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

    // Déblocage des jours selon l'heure en France
    const jours = document.querySelectorAll('.jour');
    const debutCalendrier = new Date(2025, 10, 13); // 13 novembre 2025
    const diffJours = Math.floor((now - debutCalendrier) / (1000 * 60 * 60 * 24));

    jours.forEach((jour, i) => {
      if (i <= diffJours && i < 7) {
        jour.style.display = 'block';
      } else {
        jour.style.display = 'none';
      }
    });

  } catch (err) {
    console.error('Erreur récupération heure France :', err);
  }
}

// Mise à jour toutes les secondes
setInterval(updateTimer, 1000);
updateTimer();
