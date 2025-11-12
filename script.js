// -----------------------
// Contenus détaillés des jours
// -----------------------
const contenusJours = {
  jour1: "<h2>Jour 1</h2><p>Texte, image ou vidéo pour Jour 1</p>",
  jour2: "<h2>Jour 2</h2><p>Contenu du Jour 2</p>",
  jour3: "<h2>Jour 3</h2><p>Contenu du Jour 3</p>",
  jour4: "<h2>Jour 4</h2><p>Contenu du Jour 4</p>",
  jour5: "<h2>Jour 5</h2><p>Contenu du Jour 5</p>",
  jour6: "<h2>Jour 6</h2><p>Contenu du Jour 6</p>",
  jour7: "<h2>Jour 7</h2><p>Contenu du Jour 7</p>",
};

// Overlay
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const closeBtn = document.getElementById('close-btn');

// Ouvrir overlay
function openOverlay(jourId) {
  overlayText.innerHTML = contenusJours[jourId] || "Pas de contenu";
  overlay.classList.remove('hidden');
}

// Fermer overlay
closeBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

// Ajouter événements aux jours
document.querySelectorAll('.jour').forEach(jour => {
  jour.addEventListener('click', () => openOverlay(jour.id));
});

// -----------------------
// Minuteur central synchronisé France
// -----------------------
async function updateTimer() {
  try {
    // Récupère l'heure exacte de France
    const res = await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris');
    const data = await res.json();
    const now = new Date(data.datetime);

    // Prochain minuit en France
    const demain = new Date(now);
    demain.setHours(24, 0, 0, 0);
    const diff = demain - now;

    // Conversion heures, minutes, secondes
    let heures = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secondes = Math.floor((diff % (1000 * 60)) / 1000);

    // Affichage du timer
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent =
        `${heures.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${secondes.toString().padStart(2,'0')}`;
    }

    // Déblocage des jours selon date France
    const jours = document.querySelectorAll('.jour');
    const debutCalendrier = new Date(2025, 10, 13); // Exemple : 13 novembre 2025
    const diffJours = Math.floor((now - debutCalendrier) / (1000*60*60*24));

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
