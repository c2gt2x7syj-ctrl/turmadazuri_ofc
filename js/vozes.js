// Vozes da Turma da Zuri
// Cada fala é um arquivo de áudio gravado com a voz do personagem, em:
//   audio/<personagem>/<chave>.mp3   (ex.: audio/zuri/num-3.mp3)
// Se o arquivo ainda não existir, o site usa a voz do navegador como reserva,
// então dá para ir colocando os áudios aos poucos.

const FALAS = {
  // ---------- Zuri: números ----------
  'zuri/num-1': 'Um!', 'zuri/num-2': 'Dois!', 'zuri/num-3': 'Três!', 'zuri/num-4': 'Quatro!', 'zuri/num-5': 'Cinco!',
  'zuri/num-6': 'Seis!', 'zuri/num-7': 'Sete!', 'zuri/num-8': 'Oito!', 'zuri/num-9': 'Nove!', 'zuri/num-10': 'Dez!',
  'zuri/en-1': 'One!', 'zuri/en-2': 'Two!', 'zuri/en-3': 'Three!', 'zuri/en-4': 'Four!', 'zuri/en-5': 'Five!',
  'zuri/en-6': 'Six!', 'zuri/en-7': 'Seven!', 'zuri/en-8': 'Eight!', 'zuri/en-9': 'Nine!', 'zuri/en-10': 'Ten!',

  // ---------- Zuri: jogo de contar ----------
  'zuri/quantos-tartaruguinhas': 'Quantas tartaruguinhas você vê?',
  'zuri/quantos-tatus': 'Quantos tatus-bola você vê?',
  'zuri/quantos-quatis': 'Quantos quatis você vê?',
  'zuri/quantos-tucanos': 'Quantos tucanos você vê?',
  'zuri/isso': 'Isso!',
  'zuri/em-ingles': 'Em inglês:',
  'zuri/quase-contar': 'Quase! Vamos contar de novo?',

  // ---------- Zuri: ouça e toque ----------
  'zuri/en-moon': 'Moon.', 'zuri/en-turtle': 'Turtle.', 'zuri/en-armadillo': 'Armadillo.',
  'zuri/en-toucan': 'Toucan.', 'zuri/en-coati': 'Coati.', 'zuri/en-friends': 'Friends.',
  'zuri/quer-dizer-lua': 'Quer dizer lua!', 'zuri/quer-dizer-tartaruga': 'Quer dizer tartaruga!',
  'zuri/quer-dizer-tatu': 'Quer dizer tatu!', 'zuri/quer-dizer-tucano': 'Quer dizer tucano!',
  'zuri/quer-dizer-quati': 'Quer dizer quati!', 'zuri/quer-dizer-amigos': 'Quer dizer amigos!',
  'zuri/quase-ouvir': 'Quase! Ouça de novo.',

  // ---------- Zuri: sombra e finais ----------
  'zuri/nao-e-esse': 'Não é esse! Olhe bem a forma da sombra.',
  'zuri/missao-cumprida': 'Missão cumprida, bicho feliz!',

  // ---------- Cada personagem se apresenta (sombra) ----------
  // Já gravados: recortados das vozes-guia da pasta "Materiais base"
  'zuri/apresenta': 'Oi! Eu sou a Zuri!',
  'bolota/apresenta': 'Rolou, rolou, Bolota chegou!',
  'vodita/apresenta': 'Lembra, minha neta: quem escuta a mata, nunca se perde.',
  'mapa/apresenta': 'Primeiro, as Dunas Altas! Depois, o Mangue dos Caranguejos! E por fim... o Mar!',
  'fuxico/apresenta': 'Ah, nãããão! Tá bom, hoje eu deixo a lua brilhar!',
  'lua/apresenta': 'Eu sou a Lua.',

  // ---------- Narrador apresenta a turma (memória) ----------
  // Já gravados: são os áudios "app-..." da pasta "Materiais base"
  'narrador/zuri': 'Essa aí é a Zuri! Curiosa e corajosa. Dá tchau, Zuri!',
  'narrador/bolota': 'Esse é o Bolota, o tatu-bola mais rápido da mata! Dá tchau, Bolota!',
  'narrador/vodita': 'Essa é a Vó Dita, que sabe todas as histórias! Dá tchau, Vó!',
  'narrador/mapa': 'Esse é o Mapa Falante, que mostra o caminho! Dá tchau, Mapa!',
  'narrador/fuxico': 'Cuidado, é o Fuxico, o quati fuxiqueiro! Dá tchau, Fuxico!',
  'narrador/lua': 'E essa é a Lua, a tartaruguinha! Dá tchau, Lua!',

  // ---------- Vó Dita conta as pistas do Quem sou eu? ----------
  'vodita/tucano-1': 'Tenho um bico enorme e colorido.',
  'vodita/tucano-2': 'Moro no alto das árvores.',
  'vodita/tucano-3': 'Meu bico é grande, mas é bem levinho.',
  'vodita/tartaruga-1': 'Nasço na areia da praia, quase sempre de noite.',
  'vodita/tartaruga-2': 'Carrego minha casinha nas costas.',
  'vodita/tartaruga-3': 'Sigo a luz da lua para encontrar o mar.',
  'vodita/tatu-1': 'Tenho um casco com faixas.',
  'vodita/tatu-2': 'Só existo no Brasil.',
  'vodita/tatu-3': 'Quando me assusto, viro uma bolinha completa.',
  'vodita/quati-1': 'Tenho um focinho comprido.',
  'vodita/quati-2': 'Meu rabo é enorme e cheio de listras.',
  'vodita/quati-3': 'Adoro fuçar o chão procurando comida.',
  'vodita/acertou-tucano': 'Acertou, minha neta! É o tucano!',
  'vodita/acertou-tartaruga': 'Acertou! É a tartaruga-marinha!',
  'vodita/acertou-tatu': 'Acertou! É o tatu-bola!',
  'vodita/acertou-quati': 'Acertou! É o quati!',
  'vodita/ainda-nao': 'Ainda não. Que tal mais uma pista?',
};

// Arquivos de voz que já existem na pasta audio/ (atualize ao gravar novas falas:
// python3 ferramentas/atualizar_vozes.py). Falas fora desta lista vão direto para a voz
// do aparelho, sem esperar o site procurar um arquivo que não existe (era isso que travava).
const DISPONIVEIS = new Set([/*ARQUIVOS*/ 'bolota/apresenta', 'fuxico/apresenta', 'lua/apresenta', 'mapa/apresenta', 'narrador/bolota', 'narrador/fuxico', 'narrador/lua', 'narrador/mapa', 'narrador/vodita', 'narrador/zuri', 'vodita/apresenta', 'zuri/apresenta', 'zuri/missao-cumprida', 'zuri/nao-e-esse', 'zuri/num-1', 'zuri/num-2', 'zuri/quase-ouvir', 'zuri/quer-dizer-amigos', 'zuri/quer-dizer-lua', 'zuri/quer-dizer-quati', 'zuri/quer-dizer-tartaruga', 'zuri/quer-dizer-tatu', 'zuri/quer-dizer-tucano']);

// Idioma para a voz de reserva do navegador
const FALAS_EM_INGLES = /^zuri\/en-/;

const vozes = {
  fila: [],
  tocando: null,
  cache: new Map(),
};

// Deixa os áudios carregados na memória para tocarem na hora
function carregar(chave) {
  if (!DISPONIVEIS.has(chave)) return null;
  let audio = vozes.cache.get(chave);
  if (!audio) {
    audio = new Audio(`audio/${chave}.mp3`);
    audio.preload = 'auto';
    vozes.cache.set(chave, audio);
  }
  return audio;
}

function precarregar(prefixo) {
  DISPONIVEIS.forEach((chave) => { if (!prefixo || chave.startsWith(prefixo)) carregar(chave); });
}

function escolherVoz(lang) {
  if (!('speechSynthesis' in window)) return null;
  const todas = speechSynthesis.getVoices().filter((v) => v.lang.replace('_', '-').startsWith(lang));
  const boas = lang === 'en-US'
    ? ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Ava', 'Allison']
    : ['Luciana', 'Google português do Brasil', 'Microsoft Francisca', 'Microsoft Thalita', 'Fernanda'];
  for (const nome of boas) {
    const v = todas.find((x) => x.name.includes(nome));
    if (v) return v;
  }
  return todas[0] || null;
}

function vozReserva(chave) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) { resolve(); return; }
    const lang = FALAS_EM_INGLES.test(chave) ? 'en-US' : 'pt-BR';
    const fala = new SpeechSynthesisUtterance((FALAS[chave] || '').replace(/!/g, '.'));
    fala.lang = lang;
    const voz = escolherVoz(lang);
    if (voz) fala.voice = voz;
    fala.rate = 1;
    fala.pitch = 1.2;
    let feito = false;
    const fim = () => { if (!feito) { feito = true; clearTimeout(limite); resolve(); } };
    // alguns aparelhos nunca avisam que terminou: não deixa o jogo esperando
    const limite = setTimeout(fim, 600 + (FALAS[chave] || '').length * 90);
    fala.onend = fim;
    fala.onerror = fim;
    speechSynthesis.speak(fala);
  });
}

function tocarArquivo(chave) {
  const audio = carregar(chave);
  if (!audio) return vozReserva(chave);
  return new Promise((resolve) => {
    vozes.tocando = audio;
    let terminou = false;
    const fim = () => {
      if (terminou) return;
      terminou = true;
      audio.removeEventListener('ended', fim);
      audio.removeEventListener('pause', fim);
      resolve();
    };
    audio.addEventListener('ended', fim);
    audio.addEventListener('pause', fim);
    try { audio.currentTime = 0; } catch (e) { /* ainda carregando */ }
    audio.play().catch(() => { DISPONIVEIS.delete(chave); vozReserva(chave).then(fim); });
  });
}

// Para tudo o que estiver tocando
function calar() {
  vozes.fila = [];
  if (vozes.tocando) { vozes.tocando.pause(); vozes.tocando = null; }
  if ('speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel();
}

// Toca uma ou várias falas em sequência, interrompendo a anterior
async function dizer(chaves) {
  calar();
  if (window.efeitos && !window.efeitos.somLigado()) return;
  const lista = Array.isArray(chaves) ? chaves : [chaves];
  const minhaFila = [...lista];
  vozes.fila = minhaFila;
  for (const chave of lista) {
    if (vozes.fila !== minhaFila) return; // outra fala começou
    if (!(chave in FALAS)) continue;
    await tocarArquivo(chave);
  }
}

if ('speechSynthesis' in window) speechSynthesis.addEventListener?.('voiceschanged', () => {});
document.addEventListener('DOMContentLoaded', () => precarregar('zuri/'));

window.dizer = dizer;
window.calar = calar;
window.FALAS = FALAS;
