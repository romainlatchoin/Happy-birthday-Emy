// -----------------------
// Minuteur central universel (compte à rebours jusqu'à minuit)
// -----------------------
function updateTimer() {
  const maintenant = new Date();

  // Calcul de la prochaine minuit
  const demain = new Date();
  demain.setHours(24, 0, 0, 0); // minuit
  const diff = demain - maintenant; // différence en ms

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

  // -----------------------
  // Déblocage des jours selon la date réelle
  // -----------------------
  const jours = document.querySelectorAll('.jour');
  const jourActuel = Math.min(7, maintenant.getDate() % 8); // limite à 7 jours

  jours.forEach((jour, i) => {
    if (i < jourActuel) {
      jour.style.display = 'block';
    } else {
      jour.style.display = 'none';
    }
  });
}

// Mise à jour toutes les secondes
setInterval(updateTimer, 1000);
updateTimer(); // appel initial
