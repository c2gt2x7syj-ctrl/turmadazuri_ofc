// Efeitos dos jogos: sons curtinhos, confete, estrelas e festa a cada 5 acertos.
// Os sons são sintetizados no próprio navegador (sem arquivos e sem custo).

const efeitos = (() => {
  let ctx = null;
  let somLigado = true;
  try { somLigado = localStorage.getItem('zuri-som') !== 'off'; } catch (e) { /* sem armazenamento */ }

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function nota(freq, inicio, dur, tipo = 'triangle', volume = 0.18) {
    const c = audio();
    if (!c || !somLigado) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(freq, c.currentTime + inicio);
    g.gain.setValueAtTime(0.0001, c.currentTime + inicio);
    g.gain.exponentialRampToValueAtTime(volume, c.currentTime + inicio + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + inicio + dur);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + inicio);
    o.stop(c.currentTime + inicio + dur + 0.05);
  }

  const sons = {
    acerto() { [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.08, 0.22)); },
    erro() { nota(311, 0, 0.18, 'sine', 0.14); nota(233, 0.15, 0.28, 'sine', 0.14); },
    toque() { nota(880 + Math.random() * 200, 0, 0.09, 'sine', 0.12); },
    virar() { nota(600, 0, 0.06, 'square', 0.05); },
    festa() { [523, 659, 784, 659, 784, 1047, 1319].forEach((f, i) => nota(f, i * 0.11, 0.3)); },
  };

  // ---------- Confete ----------
  const CORES = ['#F28C28', '#1FA2A8', '#FFC93C', '#E5414F', '#7FA1C6', '#2FB36B'];
  const reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function confete(el, quantidade = 26) {
    if (reduzido) return;
    const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const x0 = r.left + r.width / 2;
    const y0 = r.top + r.height / 2;
    for (let i = 0; i < quantidade; i += 1) {
      const p = document.createElement('span');
      p.className = 'confete';
      p.style.background = CORES[i % CORES.length];
      p.style.left = `${x0}px`;
      p.style.top = `${y0}px`;
      const ang = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 160;
      p.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(ang) * dist - 80}px`);
      p.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1100);
    }
  }

  // ---------- Estrelas ----------
  let estrelas = 0;
  try { estrelas = Number(localStorage.getItem('zuri-estrelas')) || 0; } catch (e) { /* ok */ }
  const contador = document.getElementById('estrelas-total');
  function mostrarEstrelas() { if (contador) contador.textContent = estrelas; }
  mostrarEstrelas();

  function ganharEstrela(el) {
    estrelas += 1;
    try { localStorage.setItem('zuri-estrelas', String(estrelas)); } catch (e) { /* ok */ }
    mostrarEstrelas();
    const placa = document.getElementById('estrelas');
    if (placa) { placa.classList.remove('pulo'); void placa.offsetWidth; placa.classList.add('pulo'); }
    if (el && !reduzido) {
      const r = el.getBoundingClientRect();
      const s = document.createElement('span');
      s.className = 'estrela-voando';
      s.textContent = '★';
      s.style.left = `${r.left + r.width / 2}px`;
      s.style.top = `${r.top}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
    if (estrelas % 5 === 0) festa();
  }

  // ---------- Festa a cada 5 estrelas ----------
  function festa() {
    const caixa = document.getElementById('festa');
    if (!caixa) return;
    document.getElementById('festa-numero').textContent = estrelas;
    caixa.hidden = false;
    sons.festa();
    setTimeout(() => confete(caixa.querySelector('.festa-cartao'), 60), 150);
    caixa.querySelector('button').focus();
  }
  const fecharFesta = document.getElementById('festa-fechar');
  if (fecharFesta) fecharFesta.addEventListener('click', () => { document.getElementById('festa').hidden = true; });

  // ---------- Botão de som ----------
  const botaoSom = document.getElementById('som');
  function rotuloSom() {
    if (!botaoSom) return;
    botaoSom.setAttribute('aria-pressed', String(somLigado));
    botaoSom.querySelector('span').textContent = somLigado ? 'Som ligado' : 'Som desligado';
  }
  if (botaoSom) {
    rotuloSom();
    botaoSom.addEventListener('click', () => {
      somLigado = !somLigado;
      try { localStorage.setItem('zuri-som', somLigado ? 'on' : 'off'); } catch (e) { /* ok */ }
      if (!somLigado && window.calar) window.calar();
      rotuloSom();
    });
  }

  return {
    acertou(el) { sons.acerto(); confete(el); ganharEstrela(el); },
    errou(el) {
      sons.erro();
      if (el && !reduzido) { el.classList.remove('balanca'); void el.offsetWidth; el.classList.add('balanca'); }
    },
    toque: () => sons.toque(),
    virar: () => sons.virar(),
    confete,
    somLigado: () => somLigado,
  };
})();
window.efeitos = efeitos;
