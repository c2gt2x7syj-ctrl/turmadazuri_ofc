// Jogos da Turma da Zuri
// Voz: usa a síntese de fala do próprio navegador (sem custo, funciona offline na maioria dos aparelhos).

// As falas são tocadas por dizer(), em js/vozes.js

function embaralhar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const sorteio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/* ---------------- 1. Vamos contar ---------------- */
const NUMEROS = [
  null,
  ['um', 'one'], ['dois', 'two'], ['três', 'three'], ['quatro', 'four'], ['cinco', 'five'],
  ['seis', 'six'], ['sete', 'seven'], ['oito', 'eight'], ['nove', 'nine'], ['dez', 'ten'],
];
const BICHOS_CONTAR = [
  { img: 'img/personagens/lua.webp', singular: 'tartaruguinha', plural: 'tartaruguinhas', voz: 'tartaruguinhas' },
  { img: 'img/personagens/bolota.webp', singular: 'tatu-bola', plural: 'tatus-bola', voz: 'tatus' },
  { img: 'img/personagens/fuxico.webp', singular: 'quati', plural: 'quatis', voz: 'quatis' },
  { img: 'img/personagens/tucano.webp', singular: 'tucano', plural: 'tucanos', voz: 'tucanos' },
];

const contar = {
  campo: document.getElementById('contar-campo'),
  opcoes: document.getElementById('contar-opcoes'),
  pergunta: document.getElementById('contar-pergunta'),
  retorno: document.getElementById('contar-retorno'),
  proximo: document.getElementById('contar-proximo'),
  ouvir: document.getElementById('contar-ouvir'),
  pontos: document.getElementById('contar-pontos'),
  acertos: 0,
  certo: 0,
  bicho: null,
  respondido: false,
  max: 5,
};

function novaRodadaContar() {
  const c = contar;
  c.respondido = false;
  c.certo = sorteio(1, c.max);
  c.bicho = BICHOS_CONTAR[sorteio(0, BICHOS_CONTAR.length - 1)];
  c.pergunta.textContent = `Quantos ${c.bicho.plural} você vê?`;
  c.retorno.textContent = '';
  c.retorno.className = 'retorno';
  c.proximo.hidden = true;

  c.campo.innerHTML = '';
  for (let i = 0; i < c.certo; i += 1) {
    const ficha = document.createElement('button');
    ficha.type = 'button';
    ficha.className = 'ficha';
    ficha.style.setProperty('--giro', `${sorteio(-10, 10)}deg`);
    ficha.innerHTML = `<img src="${c.bicho.img}" alt="">`;
    ficha.setAttribute('aria-label', `${c.bicho.singular} ${i + 1}`);
    ficha.addEventListener('click', () => {
      if (ficha.classList.contains('contado')) return;
      const n = c.campo.querySelectorAll('.contado').length + 1;
      ficha.classList.add('contado');
      efeitos.toque();
      ficha.dataset.n = n;
      dizer(`zuri/num-${n}`);
    });
    c.campo.appendChild(ficha);
  }

  const alternativas = new Set([c.certo]);
  while (alternativas.size < 3) {
    const n = Math.min(c.max, Math.max(1, c.certo + sorteio(-3, 3)));
    alternativas.add(n);
  }
  c.opcoes.innerHTML = '';
  embaralhar([...alternativas]).forEach((n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcao';
    b.innerHTML = `<span class="opcao-numero">${n}</span><span class="opcao-ingles">${NUMEROS[n][1]}</span>`;
    b.addEventListener('click', () => responderContar(b, n));
    c.opcoes.appendChild(b);
  });
}

function responderContar(botao, n) {
  const c = contar;
  if (c.respondido) return;
  if (n === c.certo) {
    c.respondido = true;
    c.acertos += 1;
    c.pontos.textContent = c.acertos;
    botao.classList.add('certo');
    efeitos.acertou(botao);
    const [pt, en] = NUMEROS[n];
    c.retorno.textContent = `Isso! ${n} ${n === 1 ? c.bicho.singular : c.bicho.plural}. Em inglês: ${en}!`;
    c.retorno.className = 'retorno retorno--certo';
    dizer(['zuri/isso', `zuri/num-${n}`, 'zuri/em-ingles', `zuri/en-${n}`]);
    c.proximo.hidden = false;
    c.proximo.focus();
  } else {
    botao.classList.add('errado');
    efeitos.errou(botao);
    botao.disabled = true;
    c.retorno.textContent = 'Quase! Toque em cada bichinho e conte de novo.';
    c.retorno.className = 'retorno retorno--quase';
    dizer('zuri/quase-contar');
  }
}

if (contar.campo) {
  contar.proximo.addEventListener('click', novaRodadaContar);
  document.querySelectorAll('[data-nivel]').forEach((b) => b.addEventListener('click', () => {
    contar.max = Number(b.dataset.nivel);
    document.querySelectorAll('[data-nivel]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    novaRodadaContar();
  }));
  contar.ouvir.addEventListener('click', () => dizer(`zuri/quantos-${contar.bicho.voz}`));
  novaRodadaContar();
}

/* ---------------- 2. Jogo da memória ---------------- */
const TURMA = [
  { id: 'zuri', nome: 'Zuri', img: 'img/personagens/zuri.webp', fala: 'Zuri, a exploradora!' },
  { id: 'bolota', nome: 'Bolota', img: 'img/personagens/bolota.webp', fala: 'Bolota, o tatu-bola. Ele só existe no Brasil!' },
  { id: 'vodita', nome: 'Vó Dita', img: 'img/personagens/vodita.webp', fala: 'Vó Dita, a contadora de histórias!' },
  { id: 'mapa', nome: 'Mapa Falante', img: 'img/personagens/mapa.webp', fala: 'O Mapa Falante! Mapa, abre o caminho!' },
  { id: 'fuxico', nome: 'Fuxico', img: 'img/personagens/fuxico.webp', fala: 'Fuxico, o quati! Fuxico, nada de fuxicar!' },
  { id: 'lua', nome: 'Lua', img: 'img/personagens/lua.webp', fala: 'Lua, a tartaruguinha. Em inglês, lua é moon!' },
];

const memoria = {
  grade: document.getElementById('memoria-grade'),
  jogadasEl: document.getElementById('memoria-jogadas'),
  paresEl: document.getElementById('memoria-pares'),
  retorno: document.getElementById('memoria-retorno'),
  abertas: [],
  travado: false,
  jogadas: 0,
  pares: 0,
};

function montarMemoria() {
  const m = memoria;
  m.abertas = [];
  m.travado = false;
  m.jogadas = 0;
  m.pares = 0;
  m.jogadasEl.textContent = '0';
  m.paresEl.textContent = '0';
  m.retorno.textContent = '';
  m.grade.innerHTML = '';
  embaralhar([...TURMA, ...TURMA]).forEach((p, i) => {
    const carta = document.createElement('button');
    carta.type = 'button';
    carta.className = 'carta';
    carta.dataset.id = p.id;
    carta.setAttribute('aria-label', `Carta ${i + 1}, virada para baixo`);
    carta.innerHTML = `
      <span class="carta-interna">
        <span class="carta-verso" aria-hidden="true">?</span>
        <span class="carta-frente"><img src="${p.img}" alt=""><span>${p.nome}</span></span>
      </span>`;
    carta.addEventListener('click', () => virarCarta(carta, p));
    m.grade.appendChild(carta);
  });
}

function virarCarta(carta, p) {
  const m = memoria;
  if (m.travado || carta.classList.contains('virada')) return;
  carta.classList.add('virada');
  efeitos.virar();
  carta.setAttribute('aria-label', p.nome);
  m.abertas.push({ carta, p });
  if (m.abertas.length < 2) return;

  m.jogadas += 1;
  m.jogadasEl.textContent = m.jogadas;
  const [a, b] = m.abertas;
  if (a.p.id === b.p.id) {
    a.carta.classList.add('par');
    b.carta.classList.add('par');
    efeitos.acertou(b.carta);
    m.pares += 1;
    m.paresEl.textContent = m.pares;
    m.abertas = [];
    if (m.pares === TURMA.length) {
      m.retorno.textContent = `Missão cumprida, bicho feliz! Você achou todos os pares em ${m.jogadas} jogadas.`;
      setTimeout(() => efeitos.confete(m.grade, 70), 300);
      dizer('zuri/missao-cumprida');
    } else {
      m.retorno.textContent = `Achou: ${p.nome}!`;
      dizer(`narrador/${p.id}`);
    }
  } else {
    m.travado = true;
    setTimeout(() => {
      [a, b].forEach(({ carta: c }, i) => {
        c.classList.remove('virada');
        c.setAttribute('aria-label', `Carta virada para baixo ${i + 1}`);
      });
      m.abertas = [];
      m.travado = false;
    }, 1000);
  }
}

if (memoria.grade) {
  document.getElementById('memoria-reiniciar').addEventListener('click', montarMemoria);
  montarMemoria();
}

/* ---------------- 3. Quem sou eu? ---------------- */
const ENIGMAS = [
  {
    resposta: 'tucano',
    voz: 'tucano',
    nome: 'o tucano',
    ingles: 'toucan',
    pistas: ['Tenho um bico enorme e colorido.', 'Moro no alto das árvores.', 'Meu bico é grande, mas é bem levinho.'],
  },
  {
    resposta: 'lua',
    voz: 'tartaruga',
    nome: 'a tartaruga-marinha',
    ingles: 'turtle',
    pistas: ['Nasço na areia da praia, quase sempre de noite.', 'Carrego minha casinha nas costas.', 'Sigo a luz da lua para encontrar o mar.'],
  },
  {
    resposta: 'bolota',
    voz: 'tatu',
    nome: 'o tatu-bola',
    ingles: 'armadillo',
    pistas: ['Tenho um casco com faixas.', 'Só existo no Brasil.', 'Quando me assusto, viro uma bolinha completa.'],
  },
  {
    resposta: 'fuxico',
    voz: 'quati',
    nome: 'o quati',
    ingles: 'coati',
    pistas: ['Tenho um focinho comprido.', 'Meu rabo é enorme e cheio de listras.', 'Adoro fuçar o chão procurando comida.'],
  },
];
const OPCOES_BICHOS = {
  tucano: { img: 'img/personagens/tucano.webp', nome: 'Tucano' },
  lua: { img: 'img/personagens/lua.webp', nome: 'Tartaruga' },
  bolota: { img: 'img/personagens/bolota.webp', nome: 'Tatu-bola' },
  fuxico: { img: 'img/personagens/fuxico.webp', nome: 'Quati' },
};

const adivinha = {
  pistasEl: document.getElementById('adivinha-pistas'),
  opcoesEl: document.getElementById('adivinha-opcoes'),
  retorno: document.getElementById('adivinha-retorno'),
  botaoPista: document.getElementById('adivinha-pista'),
  proximo: document.getElementById('adivinha-proximo'),
  rodadaEl: document.getElementById('adivinha-rodada'),
  ordem: [],
  rodada: 0,
  pistasMostradas: 1,
  respondido: false,
};

function mostrarPistas() {
  const a = adivinha;
  const enigma = a.ordem[a.rodada];
  a.pistasEl.innerHTML = '';
  enigma.pistas.slice(0, a.pistasMostradas).forEach((texto, i) => {
    const li = document.createElement('li');
    li.textContent = `Pista ${i + 1}: ${texto}`;
    a.pistasEl.appendChild(li);
  });
  a.botaoPista.disabled = a.pistasMostradas >= enigma.pistas.length;
  a.botaoPista.textContent = a.botaoPista.disabled ? 'Já sabe? Fala alto!' : 'Mais uma pista';
}

function novaRodadaAdivinha() {
  const a = adivinha;
  a.respondido = false;
  a.pistasMostradas = 1;
  a.retorno.textContent = '';
  a.retorno.className = 'retorno';
  a.proximo.hidden = true;
  a.rodadaEl.textContent = a.rodada + 1;
  mostrarPistas();

  a.opcoesEl.innerHTML = '';
  embaralhar(Object.keys(OPCOES_BICHOS)).forEach((chave) => {
    const op = OPCOES_BICHOS[chave];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcao-imagem';
    b.innerHTML = `<img src="${op.img}" alt=""><span>${op.nome}</span>`;
    b.addEventListener('click', () => responderAdivinha(b, chave));
    a.opcoesEl.appendChild(b);
  });
}

function responderAdivinha(botao, chave) {
  const a = adivinha;
  if (a.respondido) return;
  const enigma = a.ordem[a.rodada];
  if (chave === enigma.resposta) {
    a.respondido = true;
    botao.classList.add('certo');
    efeitos.acertou(botao);
    a.retorno.textContent = `Acertou! Eu sou ${enigma.nome}. Em inglês: ${enigma.ingles}.`;
    a.retorno.className = 'retorno retorno--certo';
    dizer([`vodita/acertou-${enigma.voz}`, 'zuri/em-ingles', `zuri/en-${enigma.ingles}`]);
    a.pistasMostradas = enigma.pistas.length;
    mostrarPistas();
    a.proximo.hidden = false;
    a.proximo.textContent = a.rodada === a.ordem.length - 1 ? 'Jogar de novo' : 'Próximo bicho';
    a.proximo.focus();
  } else {
    botao.classList.add('errado');
    efeitos.errou(botao);
    botao.disabled = true;
    a.retorno.textContent = 'Ainda não! Que tal mais uma pista?';
    a.retorno.className = 'retorno retorno--quase';
    dizer('vodita/ainda-nao');
  }
}

if (adivinha.pistasEl) {
  adivinha.ordem = embaralhar(ENIGMAS);
  document.getElementById('adivinha-total').textContent = ENIGMAS.length;
  adivinha.botaoPista.addEventListener('click', () => {
    adivinha.pistasMostradas += 1;
    mostrarPistas();
    const enigma = adivinha.ordem[adivinha.rodada];
    dizer(`vodita/${enigma.voz}-${adivinha.pistasMostradas}`);
  });
  document.getElementById('adivinha-ouvir').addEventListener('click', () => {
    const enigma = adivinha.ordem[adivinha.rodada];
    dizer(enigma.pistas.slice(0, adivinha.pistasMostradas).map((_, i) => `vodita/${enigma.voz}-${i + 1}`));
  });
  adivinha.proximo.addEventListener('click', () => {
    if (adivinha.rodada === adivinha.ordem.length - 1) {
      adivinha.ordem = embaralhar(ENIGMAS);
      adivinha.rodada = 0;
    } else {
      adivinha.rodada += 1;
    }
    novaRodadaAdivinha();
  });
  novaRodadaAdivinha();
}


/* ---------------- 4. De quem é a sombra? ---------------- */
const SOMBRAS = [
  { id: 'zuri', nome: 'Zuri', sombra: 'img/sombras/zuri.png', img: 'img/personagens/zuri.webp', fala: 'É a Zuri! Olha os dois puffs no cabelo!' },
  { id: 'bolota', nome: 'Bolota', sombra: 'img/sombras/bolota.png', img: 'img/personagens/bolota.webp', fala: 'É o Bolota! Olha as orelhas grandes!' },
  { id: 'lua', nome: 'Lua', sombra: 'img/sombras/lua.png', img: 'img/personagens/lua.webp', fala: 'É a Lua, a tartaruguinha!' },
  { id: 'fuxico', nome: 'Fuxico', sombra: 'img/sombras/fuxico.png', img: 'img/personagens/fuxico.webp', fala: 'É o Fuxico! Olha o rabo listrado e o boné!' },
];
const sombra = {
  img: document.getElementById('sombra-img'),
  palco: document.getElementById('sombra-palco'),
  opcoes: document.getElementById('sombra-opcoes'),
  retorno: document.getElementById('sombra-retorno'),
  proximo: document.getElementById('sombra-proximo'),
  rodadaEl: document.getElementById('sombra-rodada'),
  ordem: [],
  rodada: 0,
  respondido: false,
};
function novaRodadaSombra() {
  const s = sombra;
  const alvo = s.ordem[s.rodada];
  s.respondido = false;
  s.palco.classList.remove('revelado');
  s.img.src = alvo.sombra;
  s.img.alt = 'Sombra de um personagem da turma';
  s.retorno.textContent = '';
  s.retorno.className = 'retorno';
  s.proximo.hidden = true;
  s.rodadaEl.textContent = s.rodada + 1;
  s.opcoes.innerHTML = '';
  embaralhar(SOMBRAS).forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcao-imagem';
    b.innerHTML = `<img src="${p.img}" alt=""><span>${p.nome}</span>`;
    b.addEventListener('click', () => {
      if (s.respondido) return;
      if (p.id === alvo.id) {
        s.respondido = true;
        b.classList.add('certo');
        efeitos.acertou(b);
        s.palco.classList.add('revelado');
        s.img.src = alvo.img;
        s.img.alt = alvo.nome;
        s.retorno.textContent = alvo.fala;
        s.retorno.className = 'retorno retorno--certo';
        dizer(`${alvo.id}/apresenta`);
        s.proximo.hidden = false;
        s.proximo.textContent = s.rodada === s.ordem.length - 1 ? 'Jogar de novo' : 'Próxima sombra';
        s.proximo.focus();
      } else {
        b.classList.add('errado');
        efeitos.errou(b);
        b.disabled = true;
        s.retorno.textContent = 'Não é esse! Olhe bem a forma da sombra.';
        s.retorno.className = 'retorno retorno--quase';
        dizer('zuri/nao-e-esse');
      }
    });
    s.opcoes.appendChild(b);
  });
}
if (sombra.img) {
  sombra.ordem = embaralhar(SOMBRAS);
  document.getElementById('sombra-total').textContent = SOMBRAS.length;
  sombra.proximo.addEventListener('click', () => {
    if (sombra.rodada === sombra.ordem.length - 1) {
      sombra.ordem = embaralhar(SOMBRAS);
      sombra.rodada = 0;
    } else {
      sombra.rodada += 1;
    }
    novaRodadaSombra();
  });
  novaRodadaSombra();
}

/* ---------------- 5. Ouça e toque ---------------- */
const PALAVRAS = [
  { en: 'moon', pt: 'lua', img: 'img/personagens/lua-cheia.webp' },
  { en: 'turtle', pt: 'tartaruga', img: 'img/personagens/lua.webp' },
  { en: 'armadillo', pt: 'tatu', img: 'img/personagens/bolota.webp' },
  { en: 'toucan', pt: 'tucano', img: 'img/personagens/tucano.webp' },
  { en: 'coati', pt: 'quati', img: 'img/personagens/fuxico.webp' },
  { en: 'friends', pt: 'amigos', img: 'img/personagens/amigos.webp' },
];
const ouca = {
  ouvir: document.getElementById('ouca-ouvir'),
  ouvirTexto: document.getElementById('ouca-ouvir-texto'),
  palavra: document.getElementById('ouca-palavra'),
  opcoes: document.getElementById('ouca-opcoes'),
  retorno: document.getElementById('ouca-retorno'),
  proximo: document.getElementById('ouca-proximo'),
  pontos: document.getElementById('ouca-pontos'),
  acertos: 0,
  alvo: null,
  anterior: null,
  respondido: false,
  comecou: false,
};
function dizerPalavra() {
  if (!ouca.alvo) return;
  dizer(`zuri/en-${ouca.alvo.en}`);
}
function novaRodadaOuca() {
  const o = ouca;
  o.respondido = false;
  o.retorno.textContent = '';
  o.retorno.className = 'retorno';
  o.proximo.hidden = true;
  o.palavra.textContent = '';
  const possiveis = PALAVRAS.filter((p) => p !== o.anterior);
  o.alvo = possiveis[sorteio(0, possiveis.length - 1)];
  o.anterior = o.alvo;
  const outras = embaralhar(PALAVRAS.filter((p) => p !== o.alvo)).slice(0, 3);
  o.opcoes.innerHTML = '';
  embaralhar([o.alvo, ...outras]).forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcao-imagem';
    b.innerHTML = `<img src="${p.img}" alt="${p.pt}">`;
    b.classList.add('opcao-imagem--sem-nome');
    b.addEventListener('click', () => {
      if (o.respondido || !o.comecou) return;
      if (p === o.alvo) {
        o.respondido = true;
        o.acertos += 1;
        o.pontos.textContent = o.acertos;
        b.classList.add('certo');
        efeitos.acertou(b);
        b.insertAdjacentHTML('beforeend', `<span>${p.pt}</span>`);
        o.palavra.textContent = o.alvo.en;
        o.retorno.textContent = `Isso! ${o.alvo.en} quer dizer ${o.alvo.pt}.`;
        o.retorno.className = 'retorno retorno--certo';
        dizer(['zuri/isso', `zuri/en-${o.alvo.en}`, `zuri/quer-dizer-${o.alvo.pt}`]);
        o.proximo.hidden = false;
        o.proximo.focus();
      } else {
        b.classList.add('errado');
        efeitos.errou(b);
        b.disabled = true;
        o.retorno.textContent = 'Quase! Ouça de novo.';
        o.retorno.className = 'retorno retorno--quase';
        dizerPalavra();
      }
    });
    o.opcoes.appendChild(b);
  });
  if (o.comecou) dizerPalavra();
}
if (ouca.ouvir) {
  ouca.ouvir.addEventListener('click', () => {
    if (!ouca.comecou) {
      ouca.comecou = true;
      ouca.ouvirTexto.textContent = 'Ouvir de novo';
    }
    dizerPalavra();
  });
  ouca.proximo.addEventListener('click', novaRodadaOuca);
  novaRodadaOuca();
}

/* ---------------- 6. Labirinto da Lua ---------------- */
// Paredes de cada casa: [cima, direita, baixo, esquerda]
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const lab = {
  area: document.querySelector('.lab-area'),
  tab: document.getElementById('lab-tabuleiro'),
  retorno: document.getElementById('lab-retorno'),
  pontos: document.getElementById('lab-pontos'),
  n: 5, paredes: [], pos: [0, 0], saida: 0, chegou: false, celulas: [], lua: null, chegadas: 0, passos: 0,
};

function gerarLabirinto(n) {
  const paredes = Array.from({ length: n * n }, () => [true, true, true, true]);
  const visto = new Array(n * n).fill(false);
  const pilha = [[0, 0]];
  visto[0] = true;
  while (pilha.length) {
    const [r, c] = pilha[pilha.length - 1];
    const vizinhos = DIRS.map(([dr, dc], d) => [r + dr, c + dc, d])
      .filter(([rr, cc]) => rr >= 0 && cc >= 0 && rr < n && cc < n && !visto[rr * n + cc]);
    if (!vizinhos.length) { pilha.pop(); continue; }
    const [rr, cc, d] = vizinhos[sorteio(0, vizinhos.length - 1)];
    paredes[r * n + c][d] = false;
    paredes[rr * n + cc][(d + 2) % 4] = false;
    visto[rr * n + cc] = true;
    pilha.push([rr, cc]);
  }
  return paredes;
}

// Caminho mais curto (para a dica)
function caminhoAteMar() {
  const { n, paredes, saida } = lab;
  const inicio = lab.pos[0] * n + lab.pos[1];
  const fim = (n - 1) * n + saida;
  const veio = new Map([[inicio, -1]]);
  const fila = [inicio];
  while (fila.length) {
    const i = fila.shift();
    if (i === fim) break;
    const r = Math.floor(i / n), c = i % n;
    DIRS.forEach(([dr, dc], d) => {
      if (paredes[i][d]) return;
      const j = (r + dr) * n + (c + dc);
      if (r + dr < 0 || r + dr >= n || c + dc < 0 || c + dc >= n || veio.has(j)) return;
      veio.set(j, i);
      fila.push(j);
    });
  }
  const caminho = [];
  for (let i = fim; i !== -1 && i !== undefined; i = veio.get(i)) caminho.push(i);
  return caminho.reverse();
}

function desenharLua(bateu = false) {
  const [r, c] = lab.pos;
  lab.lua.style.transform = `translate(${c * 100}%, ${r * 100}%)`;
  lab.celulas[r * lab.n + c].classList.add('pegada');
  if (bateu) { lab.lua.classList.remove('bate'); void lab.lua.offsetWidth; lab.lua.classList.add('bate'); }
}

function novoLabirinto() {
  const n = lab.n;
  lab.paredes = gerarLabirinto(n);
  lab.saida = sorteio(Math.floor(n / 2), n - 1);
  lab.paredes[(n - 1) * n + lab.saida][2] = false; // abre para o mar
  lab.pos = [0, 0];
  lab.chegou = false;
  lab.passos = 0;
  lab.area.style.setProperty('--n', n);
  lab.retorno.textContent = '';
  lab.retorno.className = 'retorno';
  lab.tab.innerHTML = '';
  lab.celulas = lab.paredes.map((p, i) => {
    const el = document.createElement('div');
    const r = Math.floor(i / n);
    el.className = 'lab-celula';
    if (p[0] && i !== 0) el.classList.add('n');
    if (p[3]) el.classList.add('w');
    if (r === n - 1 && p[2]) el.classList.add('s');
    if (r === n - 1 && !p[2]) el.classList.add('saida');
    el.addEventListener('click', () => tocarCasa(i));
    lab.tab.appendChild(el);
    return el;
  });
  lab.lua = document.createElement('div');
  lab.lua.className = 'lab-lua';
  lab.lua.innerHTML = '<img src="img/personagens/lua.webp" alt="">';
  lab.tab.appendChild(lab.lua);
  desenharLua();
}

function mover(d) {
  if (lab.chegou) return;
  const [r, c] = lab.pos;
  const i = r * lab.n + c;
  if (r === lab.n - 1 && c === lab.saida && d === 2) { chegarAoMar(); return; }
  if (lab.paredes[i][d]) { efeitos.errou(); desenharLua(true); return; }
  lab.pos = [r + DIRS[d][0], c + DIRS[d][1]];
  lab.passos += 1;
  efeitos.toque();
  desenharLua();
  lab.celulas.forEach((el) => el.classList.remove('caminho'));
}

function tocarCasa(i) {
  const r = Math.floor(i / lab.n), c = i % lab.n;
  const [pr, pc] = lab.pos;
  if (r === pr && c === pc && r === lab.n - 1 && c === lab.saida) { mover(2); return; }
  const d = DIRS.findIndex(([dr, dc]) => pr + dr === r && pc + dc === c);
  if (d >= 0) mover(d);
}

function chegarAoMar() {
  lab.chegou = true;
  lab.lua.style.transform = `translate(${lab.saida * 100}%, ${lab.n * 100}%)`;
  lab.chegadas += 1;
  lab.pontos.textContent = lab.chegadas;
  efeitos.acertou(lab.tab);
  lab.retorno.textContent = `A Lua chegou ao mar em ${lab.passos + 1} passos! Tchau, Lua!`;
  lab.retorno.className = 'retorno retorno--certo';
  dizer(['zuri/missao-cumprida']);
}

if (lab.tab) {
  document.querySelectorAll('.lab-seta').forEach((b) => b.addEventListener('click', () => mover(Number(b.dataset.dir))));
  const TECLAS = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3, w: 0, d: 1, s: 2, a: 3 };
  lab.tab.addEventListener('keydown', (e) => {
    if (e.key in TECLAS) { e.preventDefault(); mover(TECLAS[e.key]); }
  });
  // arrastar o dedo
  let toque = null;
  lab.tab.addEventListener('pointerdown', (e) => { toque = [e.clientX, e.clientY]; });
  lab.tab.addEventListener('pointerup', (e) => {
    if (!toque) return;
    const dx = e.clientX - toque[0], dy = e.clientY - toque[1];
    toque = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; // foi um toque, não um arrasto
    if (Math.abs(dx) > Math.abs(dy)) mover(dx > 0 ? 1 : 3); else mover(dy > 0 ? 2 : 0);
  });
  document.getElementById('lab-novo').addEventListener('click', novoLabirinto);
  document.getElementById('lab-dica').addEventListener('click', () => {
    if (lab.chegou) return;
    const caminho = caminhoAteMar();
    caminho.forEach((i) => lab.celulas[i].classList.add('caminho'));
    setTimeout(() => lab.celulas.forEach((el) => el.classList.remove('caminho')), 2500);
  });
  document.querySelectorAll('[data-lab]').forEach((b) => b.addEventListener('click', () => {
    lab.n = Number(b.dataset.lab);
    document.querySelectorAll('[data-lab]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    novoLabirinto();
  }));
  novoLabirinto();
}

/* ---------------- 7. Cada bicho na sua casa ---------------- */
const casas = {
  bichosEl: document.getElementById('casas-bichos'), destinosEl: document.getElementById('casas-destinos'),
  retorno: document.getElementById('casas-retorno'), pontosEl: document.getElementById('casas-pontos'),
  reiniciar: document.getElementById('casas-reiniciar'), selecionado: null, pontos: 0,
};
const BICHOS_CASAS = [
  { id: 'tartaruga', nome: 'Tartaruga', img: 'img/personagens/lua.webp', casa: 'praia', fala: 'zuri/casa-tartaruga' },
  { id: 'tatu', nome: 'Tatu-bola', img: 'img/personagens/bolota.webp', casa: 'caatinga', fala: 'zuri/casa-tatu' },
  { id: 'quati', nome: 'Quati', img: 'img/personagens/fuxico.webp', casa: 'mata', fala: 'zuri/casa-quati' },
  { id: 'tucano', nome: 'Tucano', img: 'img/personagens/tucano.webp', casa: 'copa', fala: 'zuri/casa-tucano' },
];
const DESTINOS_CASAS = [
  { id: 'praia', nome: 'Praia e mar', emoji: '🌊' }, { id: 'caatinga', nome: 'Caatinga', emoji: '🌵' },
  { id: 'mata', nome: 'Mata Atlântica', emoji: '🌳' }, { id: 'copa', nome: 'Copa das árvores', emoji: '🌴' },
];
function escolherBichoCasa(botao) {
  if (casas.selecionado) casas.selecionado.classList.remove('selecionado');
  casas.selecionado = botao;
  botao.classList.add('selecionado');
  casas.retorno.textContent = `Agora escolha a casa de ${botao.dataset.nome}.`;
}
function levarParaCasa(destino) {
  const b = casas.selecionado;
  if (!b) { casas.retorno.textContent = 'Primeiro escolha um bicho.'; return; }
  if (b.dataset.casa !== destino.dataset.casa) {
    efeitos.errou(b); b.classList.add('balanca'); setTimeout(() => b.classList.remove('balanca'), 450);
    casas.retorno.textContent = 'Quase! Será que ele mora aí?'; casas.retorno.className = 'retorno retorno--quase'; return;
  }
  const img = b.querySelector('img').cloneNode(); img.className = 'casa-morador'; img.alt = b.dataset.nome;
  destino.appendChild(img); destino.disabled = true; b.remove(); casas.selecionado = null; casas.pontos += 1;
  casas.pontosEl.textContent = casas.pontos; casas.retorno.textContent = `${img.alt} chegou em casa!`;
  casas.retorno.className = 'retorno retorno--certo'; efeitos.acertou(destino); dizer(b.dataset.fala);
  if (casas.pontos === BICHOS_CASAS.length) {
    casas.retorno.textContent = 'Todo mundo em casa!'; casas.reiniciar.hidden = false; dizer('zuri/missao-cumprida');
  }
}
function montarCasas() {
  casas.pontos = 0; casas.selecionado = null; casas.pontosEl.textContent = '0'; casas.reiniciar.hidden = true;
  casas.retorno.textContent = ''; casas.retorno.className = 'retorno'; casas.bichosEl.innerHTML = ''; casas.destinosEl.innerHTML = '';
  embaralhar(BICHOS_CASAS).forEach((bicho) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'opcao-imagem casa-bicho';
    b.dataset.casa = bicho.casa; b.dataset.nome = bicho.nome; b.dataset.fala = bicho.fala;
    b.innerHTML = `<img src="${bicho.img}" alt=""><span>${bicho.nome}</span>`;
    b.addEventListener('click', () => escolherBichoCasa(b));
    b.addEventListener('pointerdown', (e) => { escolherBichoCasa(b); b.setPointerCapture(e.pointerId); b.classList.add('arrastando'); });
    b.addEventListener('pointerup', (e) => {
      b.classList.remove('arrastando'); const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest('.casa-destino');
      if (alvo) levarParaCasa(alvo);
    });
    casas.bichosEl.appendChild(b);
  });
  DESTINOS_CASAS.forEach((casa) => {
    const d = document.createElement('button'); d.type = 'button'; d.className = 'casa-destino'; d.dataset.casa = casa.id;
    d.innerHTML = `<span class="casa-emoji" aria-hidden="true">${casa.emoji}</span><span>${casa.nome}</span>`;
    d.addEventListener('click', () => levarParaCasa(d)); casas.destinosEl.appendChild(d);
  });
}
if (casas.bichosEl) { casas.reiniciar.addEventListener('click', montarCasas); montarCasas(); }

/* ---------------- 8. Repita a sequência ---------------- */
const seq = {
  grade: document.getElementById('seq-grade'), retorno: document.getElementById('seq-retorno'),
  tamanho: document.getElementById('seq-tamanho'), recordeEl: document.getElementById('seq-recorde'),
  comecar: document.getElementById('seq-comecar'), lista: [], entrada: [], botoes: [], mostrando: false, velocidade: 1.5, recorde: 0,
};
const SEQ_PERSONAGENS = [
  ['Zuri', 'img/personagens/zuri.webp', '#F28C28', 523], ['Bolota', 'img/personagens/bolota.webp', '#7FA1C6', 659],
  ['Lua', 'img/personagens/lua.webp', '#1FA2A8', 784], ['Fuxico', 'img/personagens/fuxico.webp', '#E5414F', 988],
];
function tocarNota(freq) {
  if (!efeitos.somLigado()) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext; if (!AudioCtx) return;
  seq.audio = seq.audio || new AudioCtx(); const osc = seq.audio.createOscillator(); const ganho = seq.audio.createGain();
  osc.frequency.value = freq; ganho.gain.setValueAtTime(.08, seq.audio.currentTime); ganho.gain.exponentialRampToValueAtTime(.001, seq.audio.currentTime + .35);
  osc.connect(ganho).connect(seq.audio.destination); osc.start(); osc.stop(seq.audio.currentTime + .35);
}
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function acenderSeq(i, duracao = 450) {
  const b = seq.botoes[i]; b.classList.add('aceso'); tocarNota(SEQ_PERSONAGENS[i][3]); await esperar(duracao * seq.velocidade); b.classList.remove('aceso');
}
async function mostrarSequencia() {
  seq.mostrando = true; seq.entrada = []; seq.retorno.textContent = 'Olhe e escute!'; seq.botoes.forEach((b) => { b.disabled = true; });
  await esperar(350);
  for (const i of seq.lista) { await acenderSeq(i); await esperar(250 * seq.velocidade); }
  seq.mostrando = false; seq.botoes.forEach((b) => { b.disabled = false; }); seq.retorno.textContent = 'Sua vez!'; dizer('zuri/seq-sua-vez');
}
async function tocarSeq(i) {
  if (seq.mostrando || !seq.lista.length) return;
  await acenderSeq(i, 220); const pos = seq.entrada.length;
  if (seq.lista[pos] !== i) {
    efeitos.errou(seq.grade); seq.retorno.textContent = 'Quase! Vou mostrar de novo.'; dizer('zuri/seq-quase');
    seq.entrada = []; await esperar(800); mostrarSequencia(); return;
  }
  seq.entrada.push(i);
  if (seq.entrada.length === seq.lista.length) {
    efeitos.acertou(seq.grade); seq.recorde = Math.max(seq.recorde, seq.lista.length); seq.recordeEl.textContent = seq.recorde;
    seq.retorno.textContent = 'Muito bem! A sequência vai crescer.'; seq.botoes.forEach((b) => { b.disabled = true; });
    await esperar(800); seq.lista.push(sorteio(0, 3)); seq.tamanho.textContent = seq.lista.length; mostrarSequencia();
  }
}
function iniciarSequencia() { seq.lista = [sorteio(0, 3), sorteio(0, 3)]; seq.tamanho.textContent = '2'; seq.comecar.textContent = 'Recomeçar'; mostrarSequencia(); }
if (seq.grade) {
  SEQ_PERSONAGENS.forEach(([nome, img, cor], i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'seq-botao'; b.style.setProperty('--cor', cor);
    b.setAttribute('aria-label', `${i + 1}. ${nome}`); b.innerHTML = `<img src="${img}" alt="">`; b.addEventListener('click', () => tocarSeq(i)); seq.grade.appendChild(b); seq.botoes.push(b);
  });
  seq.comecar.addEventListener('click', iniciarSequencia);
  document.querySelectorAll('[data-seq-vel]').forEach((b) => b.addEventListener('click', () => {
    seq.velocidade = Number(b.dataset.seqVel); document.querySelectorAll('[data-seq-vel]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));
  document.addEventListener('keydown', (e) => { if (/^[1-4]$/.test(e.key) && document.activeElement?.tagName !== 'INPUT') tocarSeq(Number(e.key) - 1); });
}

/* ---------------- 9. Quebra-cabeça da turma ---------------- */
const quebra = {
  tab: document.getElementById('quebra-tabuleiro'), personagens: document.getElementById('quebra-personagens'),
  retorno: document.getElementById('quebra-retorno'), jogadasEl: document.getElementById('quebra-jogadas'),
  mostrar: document.getElementById('quebra-mostrar'), n: 2, personagem: null, pecas: [], selecionada: null, jogadas: 0, terminou: false,
};
const QUEBRA_PERSONAGENS = TURMA.map((p) => ({ ...p, voz: `${p.id}/apresenta` }));
function posicaoPeca(peca, n) { const r = Math.floor(peca / n), c = peca % n; return `${c * 100 / (n - 1)}% ${r * 100 / (n - 1)}%`; }
function atualizarQuebra() {
  [...quebra.tab.children].filter((x) => x.classList.contains('quebra-peca')).forEach((el, pos) => {
    const id = Number(el.dataset.id); el.classList.toggle('certa', id === pos); el.setAttribute('aria-label', `Peça ${id + 1}, posição ${pos + 1}`);
  });
  if (!quebra.terminou && [...quebra.tab.querySelectorAll('.quebra-peca')].every((el, pos) => Number(el.dataset.id) === pos)) {
    quebra.terminou = true; quebra.tab.classList.add('montado'); quebra.retorno.textContent = 'Você montou a foto!'; quebra.retorno.className = 'retorno retorno--certo';
    efeitos.acertou(quebra.tab); dizer(quebra.personagem.voz);
  }
}
function trocarPecas(a, b) {
  if (!a || !b || a === b || quebra.terminou) return;
  const marcador = document.createElement('span'); a.before(marcador); b.before(a); marcador.replaceWith(b);
  quebra.jogadas += 1; quebra.jogadasEl.textContent = quebra.jogadas; a.classList.remove('selecionada'); b.classList.remove('selecionada'); quebra.selecionada = null; atualizarQuebra();
}
function selecionarPeca(el) {
  if (quebra.terminou) return;
  if (!quebra.selecionada) { quebra.selecionada = el; el.classList.add('selecionada'); return; }
  trocarPecas(quebra.selecionada, el);
}
function montarQuebra() {
  quebra.terminou = false; quebra.selecionada = null; quebra.jogadas = 0; quebra.jogadasEl.textContent = '0'; quebra.retorno.textContent = ''; quebra.retorno.className = 'retorno';
  quebra.tab.className = 'quebra-tabuleiro'; quebra.tab.style.setProperty('--n', quebra.n); quebra.tab.innerHTML = '';
  let ids; do { ids = embaralhar([...Array(quebra.n * quebra.n).keys()]); } while (ids.some((id, pos) => id === pos));
  ids.forEach((id) => {
    const p = document.createElement('button'); p.type = 'button'; p.className = 'quebra-peca'; p.dataset.id = id; p.draggable = false;
    p.style.backgroundImage = `url("${quebra.personagem.img}")`; p.style.backgroundSize = `${quebra.n * 100}% ${quebra.n * 100}%`; p.style.backgroundPosition = posicaoPeca(id, quebra.n);
    p.addEventListener('click', () => selecionarPeca(p));
    p.addEventListener('pointerdown', (e) => { p.setPointerCapture(e.pointerId); p.classList.add('arrastando'); });
    p.addEventListener('pointerup', (e) => { p.classList.remove('arrastando'); const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest('.quebra-peca'); if (alvo && alvo !== p) trocarPecas(p, alvo); });
    quebra.tab.appendChild(p);
  });
  atualizarQuebra();
}
if (quebra.tab) {
  QUEBRA_PERSONAGENS.forEach((p, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'quebra-personagem'; b.setAttribute('aria-label', p.nome); b.setAttribute('aria-pressed', String(i === 0));
    b.innerHTML = `<img src="${p.img}" alt="">`; b.addEventListener('click', () => { quebra.personagem = p; [...quebra.personagens.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); montarQuebra(); }); quebra.personagens.appendChild(b);
  });
  quebra.personagem = QUEBRA_PERSONAGENS[0];
  document.querySelectorAll('[data-quebra-n]').forEach((b) => b.addEventListener('click', () => { quebra.n = Number(b.dataset.quebraN); document.querySelectorAll('[data-quebra-n]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); montarQuebra(); }));
  quebra.mostrar.addEventListener('click', () => { if (quebra.tab.querySelector('.quebra-preview')) return; const img = document.createElement('img'); img.className = 'quebra-preview'; img.src = quebra.personagem.img; img.alt = 'Foto completa'; quebra.tab.appendChild(img); setTimeout(() => img.remove(), 2000); });
  montarQuebra();
}

/* ---------------- 10. Onde está o Bolota? ---------------- */
const esconde = {
  fundo: document.getElementById('esconde-fundo'), frente: document.getElementById('esconde-frente'), bolota: document.getElementById('esconde-bolota'),
  fuxico: document.getElementById('esconde-fuxico'), retorno: document.getElementById('esconde-retorno'),
  pontosEl: document.getElementById('esconde-pontos'), cenaEl: document.getElementById('esconde-cena'),
  novo: document.getElementById('esconde-novo'), pontos: 0, cena: -1, travado: false, dicaTimer: null,
};
const CENAS_ESCONDE = [
  { src: 'img/jogos/onde-bolota/quintal.jpg', frente: 'img/jogos/onde-bolota/quintal-frente.png', alt: 'Quintal colorido da Turma da Zuri', posicoes: [[1, 43, .84], [12, 52, .8], [24, 54, .82], [68, 52, .78], [82, 43, .82], [4, 23, .76], [78, 23, .78]] },
  { src: 'img/jogos/onde-bolota/floresta.jpg', frente: 'img/jogos/onde-bolota/floresta-frente.png', alt: 'Clareira verde da Mata Atlântica', posicoes: [[1, 43, .8], [13, 52, .84], [26, 55, .78], [68, 54, .82], [82, 42, .8], [4, 25, .76], [78, 25, .78]] },
  { src: 'img/jogos/onde-bolota/praia.jpg', frente: 'img/jogos/onde-bolota/praia-frente.png', alt: 'Praia e manguezal ensolarados', posicoes: [[1, 43, .82], [13, 53, .78], [27, 56, .82], [67, 54, .78], [82, 42, .82], [4, 24, .76], [78, 23, .78]] },
];
function posicionarEscondido(el, pos, giro, dificuldade) {
  el.style.left = `${pos[0]}%`; el.style.top = `${pos[1]}%`; el.style.setProperty('--giro', `${giro}deg`);
  el.style.setProperty('--escala', Math.max(.58, pos[2] * dificuldade).toFixed(2));
}
function somTonhonhoin() {
  if (!efeitos.somLigado()) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext; if (!AudioCtx) return;
  esconde.audio = esconde.audio || new AudioCtx(); const agora = esconde.audio.currentTime;
  const osc = esconde.audio.createOscillator(); const ganho = esconde.audio.createGain();
  osc.type = 'triangle'; osc.frequency.setValueAtTime(620, agora); osc.frequency.exponentialRampToValueAtTime(135, agora + .42);
  ganho.gain.setValueAtTime(.001, agora); ganho.gain.exponentialRampToValueAtTime(.18, agora + .03); ganho.gain.exponentialRampToValueAtTime(.001, agora + .48);
  osc.connect(ganho).connect(esconde.audio.destination); osc.start(agora); osc.stop(agora + .5);
}
function novaCenaEsconde() {
  const e = esconde; clearTimeout(e.dicaTimer); e.travado = false; e.cena = (e.cena + 1) % CENAS_ESCONDE.length;
  const cena = CENAS_ESCONDE[e.cena]; e.fundo.src = cena.src; e.fundo.alt = cena.alt; e.frente.src = cena.frente; e.cenaEl.textContent = e.cena + 1;
  const lugares = embaralhar([...cena.posicoes]); const dificuldade = Math.max(.9, 1 - e.pontos * .012);
  posicionarEscondido(e.bolota, lugares[0], sorteio(-12, 12), dificuldade); posicionarEscondido(e.fuxico, lugares[1], sorteio(-12, 12), dificuldade);
  e.bolota.classList.remove('achou', 'dica-visual'); e.fuxico.classList.remove('pegadinha'); e.bolota.disabled = false; e.fuxico.disabled = false;
  e.retorno.textContent = 'Onde será que o Bolota se escondeu?'; e.retorno.className = 'retorno';
  e.dicaTimer = setTimeout(() => { if (!e.travado) { e.bolota.classList.add('dica-visual'); e.retorno.textContent = 'Dica: procure atrás das folhas e das pedras!'; } }, 5500);
}
if (esconde.bolota) {
  esconde.bolota.addEventListener('click', () => {
    if (esconde.travado) return; clearTimeout(esconde.dicaTimer); esconde.travado = true; esconde.bolota.disabled = true; esconde.fuxico.disabled = true;
    esconde.pontos += 1; esconde.pontosEl.textContent = esconde.pontos; esconde.bolota.classList.add('achou');
    esconde.retorno.textContent = 'Achou o Bolota! Muito bem!'; esconde.retorno.className = 'retorno retorno--certo'; efeitos.acertou(esconde.bolota); dizer('bolota/apresenta');
    setTimeout(novaCenaEsconde, 1100);
  });
  esconde.fuxico.addEventListener('click', () => {
    if (esconde.travado) return; somTonhonhoin(); esconde.fuxico.classList.remove('pegadinha'); void esconde.fuxico.offsetWidth; esconde.fuxico.classList.add('pegadinha');
    esconde.retorno.textContent = 'Tonhonhoin! Esse é o Fuxico. Continue procurando o Bolota!'; esconde.retorno.className = 'retorno retorno--quase';
  });
  esconde.novo.addEventListener('click', novaCenaEsconde); novaCenaEsconde();
}
