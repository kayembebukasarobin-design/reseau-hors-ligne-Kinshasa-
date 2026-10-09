const statusEl = document.getElementById('networkStatus');
const heroTitleEl = document.getElementById('heroTitle');
const heroTextEl = document.getElementById('heroText');
const wifiMetricEl = document.getElementById('wifiMetric');
const lanMetricEl = document.getElementById('lanMetric');
const dnsMetricEl = document.getElementById('dnsMetric');
const serverMetricEl = document.getElementById('serverMetric');
const runDiagnosticBtn = document.getElementById('runDiagnostic');
const clearLogBtn = document.getElementById('clearLog');
const logListEl = document.getElementById('systemLog');

const state = {
  wifi: 95,
  latency: 14,
  dns: 'OK',
  servers: '3/3',
};

function addLog(message) {
  const item = document.createElement('li');
  item.textContent = message;
  logListEl.prepend(item);
}

function updateDashboard() {
  wifiMetricEl.textContent = `${state.wifi}%`;
  lanMetricEl.textContent = `${state.latency} ms`;
  dnsMetricEl.textContent = state.dns;
  serverMetricEl.textContent = state.servers;

  if (state.wifi >= 85 && state.latency <= 25) {
    statusEl.innerHTML = '<span class="dot"></span> Connecté';
    heroTitleEl.textContent = 'Infrastructure locale stable';
    heroTextEl.textContent = 'Tous les services internes répondent normalement.';
  } else {
    statusEl.innerHTML = '<span class="dot" style="background:#ffbe0b;box-shadow:0 0 12px rgba(255,190,11,.8)"></span> Attention';
    heroTitleEl.textContent = 'Interférence détectée';
    heroTextEl.textContent = 'Quelques équipements demandent une vérification manuelle.';
  }
}

function randomizeMetrics() {
  state.wifi = Math.max(60, Math.min(99, state.wifi + Math.floor(Math.random() * 11) - 5));
  state.latency = Math.max(8, Math.min(45, state.latency + Math.floor(Math.random() * 9) - 4));
  state.dns = Math.random() > 0.2 ? 'OK' : 'Répétition';
  state.servers = `${Math.floor(Math.random() * 2) + 2}/3`;

  updateDashboard();
}

function runDiagnostic() {
  addLog('Diagnostic réseau lancé...');
  addLog('Test de la latence sur le routeur principal.');
  addLog('Validation des services internes terminée.');
  randomizeMetrics();
  addLog('Rapport final : aucun conflit critique détecté.');
}

function handleAction(action) {
  const actions = {
    scan: 'Scan des appareils en cours sur le réseau local.',
    restart: 'Redémarrage du routeur programmée dans 30 secondes.',
    refresh: 'Table ARP actualisée avec succès.',
    lock: 'Accès réseau verrouillé pour les appareils non autorisés.',
  };

  addLog(actions[action] || 'Action exécutée.');

  if (action === 'scan') {
    state.wifi = Math.min(99, state.wifi + 2);
  }

  if (action === 'restart') {
    state.latency = 19;
  }

  updateDashboard();
}

runDiagnosticBtn.addEventListener('click', runDiagnostic);
clearLogBtn.addEventListener('click', () => {
  logListEl.innerHTML = '';
});

document.querySelectorAll('.action-btn').forEach((button) => {
  button.addEventListener('click', () => handleAction(button.dataset.action));
});

updateDashboard();
setInterval(() => {
  randomizeMetrics();
  addLog('Le système a vérifié une mise à jour de l’état du réseau.');
}, 15000);
