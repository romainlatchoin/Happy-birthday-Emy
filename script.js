// -----------------------
// Timer de 24h
// -----------------------
let countdown = 24 * 60 * 60; // 24h en secondes
const timerElement = document.getElementById('timer');

function updateTimer() {
  let hours = Math.floor(countdown / 3600);
  let minutes = Math.floor((countdown % 3600) / 60);
  let seconds = countdown % 60;

  timerElement.textContent = 
    `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

  if (countdown > 0) {
    countdown--;
  } else {
    countdown = 24 * 60 * 60; // reset à 24h si tu veux répéter
  }
}

// met à jour toutes les secondes
setInterval(updateTimer, 1000);

// -----------------------
// Déblocage des jours
// -----------------------
const dateDepart = localStorage.getItem('dateDepart') 
  ? new Date(localStorage.getItem('dateDepart'))
  : (() => {
      const d = new Date();
      localStorage.setItem('dateDepart', d);
      return d;
    })();

const jours = document.querySelectorAll('.jour');

function updateJours() {
  const maintenant = new Date();
  const diff = Math.floor((maintenant - dateDepart) / (1000 * 60 * 60 * 24));

  jours.forEach((jour, i) => {
    if (i <= diff) jour.style.display = 'block';
    else jour.style.display = 'none';
  });
}

updateJours();
setInterval(updateJours, 60 * 1000); // vérifie toutes les minutes
