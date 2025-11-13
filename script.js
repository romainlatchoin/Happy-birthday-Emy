// -----------------------
// script.js - timer France synchronisé + overlay
// -----------------------

// CONFIG : change la date de départ ici (format YYYY, M-1, D)
const START_DATE = { year: 2025, monthIndex: 10, day: 13 }; // ex: 13 novembre 2025 (monthIndex=10 car Jan=0)

// Contenus détaillés (modifie comme tu veux)
const contenusJours = {
  jour1: "<h2>Jour 1</h2><p>Cadeau 1 — ton texte, image ou vidéo ici.</p>",
  jour2: "<h2>Jour 2</h2><p>Cadeau 2 — contenu à personnaliser.</p>",
  jour3: "<h2>Jour 3</h2><p>Contenu Jour 3.</p>",
  jour4: "<h2>Jour 4</h2><p>Contenu Jour 4.</p>",
  jour5: "<h2>Jour 5</h2><p>Contenu Jour 5.</p>",
  jour6: "<h2>Jour 6</h2><p>Contenu Jour 6.</p>",
  jour7: "<h2>Jour 7</h2><p>Contenu Jour 7.</p>",
};

// DOM refs
const timerElement = document.getElementById('timer');
const warnElement = document.getElementById('warn');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const closeBtn = document.getElementById('close-btn');
const jourNodes = Array.from(document.querySelectorAll('.jour'));

// State: offset between server France time and local Date.now()
let timeOffsetMs = 0;
let apiOk = false;

// Utility: safe format
function pad(n){ return String(n).padStart(2,'0'); }

// Récupère l'heure officielle de France une fois et calcule offset
async function syncFranceTimeOnce(){
  try {
    const res = await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris', {cache: "no-store"});
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    // data.datetime exemple: "2025-11-13T15:26:07.123456+01:00"
    const serverNow = new Date(data.datetime);
    timeOffsetMs = serverNow.getTime() - Date.now();
    apiOk = true;
    warnElement.classList.add('hidden');
    // console.log('offset ms', timeOffsetMs);
  } catch (err) {
    console.warn('Impossible de synchroniser l’heure France, fallback à l’heure locale :', err);
    apiOk = false;
    timeOffsetMs = 0; // fallback -> timer basé sur l'heure locale
    warnElement.textContent = "Attention : impossible d'obtenir l'heure officielle. Le minuteur peut différer.";
    wa
