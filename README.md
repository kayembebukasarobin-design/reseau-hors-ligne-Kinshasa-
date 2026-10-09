const statusPill = document.getElementById('statusPill');
const statusText = document.getElementById('statusText');
const heroTitle = document.getElementById('heroTitle');
const heroText = document.getElementById('heroText');
const wifiValue = document.getElementById('wifiValue');
const latencyValue = document.getElementById('latencyValue');
const dnsValue = document.getElementById('dnsValue');
const deviceValue = document.getElementById('deviceValue');
const diagnosticBtn = document.getElementById('diagnosticBtn');
const refreshBtn = document.getElementById('refreshBtn');
const clearLogBtn = document.getElementById('clearLogBtn');
const logList = document.getElementById('logList');

const state = {
  wifi: 96,
  latency: 12,
  dns: 'OK',
  devices: 7
};

function setStatus(mode, text) {
  statusPill.classList.remove('online', 'warning', 'alert');
  statusPill.classList.add(mode);
  statusText.textContent = text;
}

function updateDashboard() {
  wifiValue.textContent = `${state.wifi}%`;
  latencyValue.textContent = `${state.latency} ms`;
  dnsValue.textContent = state.dns;
  deviceValue.textContent = `${state.devices}/7`;

  if (state.wifi >= 85 && state.latency <= 25) {
    setStatus('online', 'Opérationnel');
    heroTitle.textContent = 'Réseau principal stable';
    heroText.textContent = 'Les services internes, équipements et points d’accès répondent normalement.';
  } else if (state.wifi >= 60) {
    setStatus('warning', 'Attention');
    heroTitle.textContent = 'Fluctuation détectée';
    heroText.textContent = 'Quelques équipements sont instables et méritent un contrôle manuel.';
  } else {
    setStatus('alert', 'Incident');
    heroTitle.textContent = 'Interruption localisée';
    heroText.textContent = 'Une partie du réseau demande une intervention rapide pour rétablir la stabilité.';
  }
}

function addLog(message) {
  const li = document.createElement('li');
  li.textContent = message;
  logList.prepend(li);
}

function randomizeState() {
  state.wifi = Math.max(60, Math.min(99, state.wifi + Math.floor(Math.random() * 11) - 5));
  state.latency = Math.max(8, Math.min(40, state.latency + Math.floor(Math.random() * 9) - 4));
  state.dns = Math.random() > 0.18 ? 'OK' : 'Répétition';
  state.devices = Math.max(5, Math.min(7, state.devices + (Math.random() > 0.68 ? 1 : -1)));
  updateDashboard();
}

function runDiagnostic() {
  addLog('Diagnostic réseau lancé sur tous les segments locaux.');
  addLog('Vérification du routeur principal en cours.');
  addLog('Test de bande passante et latence terminé.');
  randomizeState();
  addLog('Aucune anomalie critique détectée.');
}

function handleAction(action) {
  const actions = {
    scan: 'Scan des appareils terminé avec succès.',
    restart: 'Redémarrage du routeur programmé dans 30 secondes.',
    refresh: 'Table ARP actualisée sans erreur.',
    security: 'Accès filtré et règles de sécurité renforcées.',
    backup: 'Sauvegarde locale du réseau enregistrée.',
    audit: 'Audit complet exécuté : aucun risque majeur.'
  };

  addLog(actions[action] || 'Action exécutée.');

  if (action === 'scan') state.wifi = Math.min(99, state.wifi + 2);
  if (action === 'restart') state.latency = 16;
  if (action === 'security') state.dns = 'OK';
  if (action === 'backup') state.devices = Math.min(7, state.devices + 1);

  updateDashboard();
}

diagnosticBtn.addEventListener('click', runDiagnostic);
refreshBtn.addEventListener('click', () => {
  randomizeState();
  addLog('Mise à jour manuelle du réseau effectuée.');
});

clearLogBtn.addEventListener('click', () => {
  logList.innerHTML = '';
});

document.querySelectorAll('.action-btn').forEach((button) => {
  button.addEventListener('click', () => handleAction(button.dataset.action));
});

updateDashboard();
setInterval(() => {
  randomizeState();
  addLog('Contrôle périodique du réseau terminé.');
}, 20000);
