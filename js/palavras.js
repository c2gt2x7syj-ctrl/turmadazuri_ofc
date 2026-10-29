// Palavras da semana em inglês
// O site troca as palavras sozinho toda segunda-feira, seguindo a lista abaixo em ordem.
// Para acrescentar semanas novas, é só colocar mais itens no fim de SEMANAS.
// Quando a lista acaba, ela recomeça do início.

const INICIO = new Date(2026, 9, 26); // segunda-feira, 26 de outubro de 2026 = semana 1

const SEMANAS = [
  { tema: 'Bichos da turma', cor: 'laranja', palavras: [
    { en: 'toucan', pt: 'tucano', img: 'img/personagens/tucano.webp' },
    { en: 'armadillo', pt: 'tatu', img: 'img/personagens/bolota.webp' },
    { en: 'coati', pt: 'quati', img: 'img/personagens/fuxico.webp' },
    { en: 'turtle', pt: 'tartaruga', img: 'img/personagens/lua.webp' },
    { en: 'grandma', pt: 'vovó', img: 'img/personagens/vodita.webp' },
  ], frase: ['The toucan has a big beak.', 'O tucano tem um bico grande.'] },
  { tema: 'Na praia', cor: 'turquesa', palavras: [
    { en: 'sea', pt: 'mar', emoji: '🌊' }, { en: 'sand', pt: 'areia', emoji: '🏖️' },
    { en: 'shell', pt: 'concha', emoji: '🐚' }, { en: 'crab', pt: 'caranguejo', emoji: '🦀' },
    { en: 'sun', pt: 'sol', emoji: '☀️' },
  ], frase: ['The little turtle goes to the sea.', 'A tartaruguinha vai para o mar.'] },
  { tema: 'Cores', cor: 'vermelho', palavras: [
    { en: 'red', pt: 'vermelho', emoji: '🔴' }, { en: 'yellow', pt: 'amarelo', emoji: '🟡' },
    { en: 'blue', pt: 'azul', emoji: '🔵' }, { en: 'green', pt: 'verde', emoji: '🟢' },
    { en: 'orange', pt: 'laranja', emoji: '🟠' },
  ], frase: ['The toucan is black, orange and yellow.', 'O tucano é preto, laranja e amarelo.'] },
  { tema: 'Frutas do Brasil', cor: 'sol', palavras: [
    { en: 'banana', pt: 'banana', emoji: '🍌' }, { en: 'mango', pt: 'manga', emoji: '🥭' },
    { en: 'pineapple', pt: 'abacaxi', emoji: '🍍' }, { en: 'coconut', pt: 'coco', emoji: '🥥' },
    { en: 'watermelon', pt: 'melancia', emoji: '🍉' },
  ], frase: ['I like mango!', 'Eu gosto de manga!'] },
  { tema: 'No céu', cor: 'azul', palavras: [
    { en: 'moon', pt: 'lua', emoji: '🌙' }, { en: 'star', pt: 'estrela', emoji: '⭐' },
    { en: 'cloud', pt: 'nuvem', emoji: '☁️' }, { en: 'rain', pt: 'chuva', emoji: '🌧️' },
    { en: 'rainbow', pt: 'arco-íris', emoji: '🌈' },
  ], frase: ['Look at the moon!', 'Olhe a lua!'] },
  { tema: 'Família', cor: 'laranja', palavras: [
    { en: 'mom', pt: 'mamãe', emoji: '👩🏾' }, { en: 'dad', pt: 'papai', emoji: '👨🏾' },
    { en: 'sister', pt: 'irmã', emoji: '👧🏾' }, { en: 'brother', pt: 'irmão', emoji: '👦🏾' },
    { en: 'baby', pt: 'bebê', emoji: '👶🏾' },
  ], frase: ['I love my family.', 'Eu amo a minha família.'] },
  { tema: 'Meu corpo', cor: 'turquesa', palavras: [
    { en: 'head', pt: 'cabeça', emoji: '🙂' }, { en: 'eyes', pt: 'olhos', emoji: '👀' },
    { en: 'nose', pt: 'nariz', emoji: '👃🏾' }, { en: 'hands', pt: 'mãos', emoji: '👐🏾' },
    { en: 'feet', pt: 'pés', emoji: '🦶🏾' },
  ], frase: ['Clap your hands!', 'Bata palmas!'] },
  { tema: 'Como eu me sinto', cor: 'sol', palavras: [
    { en: 'happy', pt: 'feliz', emoji: '😄' }, { en: 'sad', pt: 'triste', emoji: '😢' },
    { en: 'brave', pt: 'corajoso', emoji: '🦸🏾' }, { en: 'scared', pt: 'com medo', emoji: '😨' },
    { en: 'calm', pt: 'calmo', emoji: '😌' },
  ], frase: ['Zuri is brave.', 'A Zuri é corajosa.'] },
  { tema: 'Na mata', cor: 'turquesa', palavras: [
    { en: 'tree', pt: 'árvore', emoji: '🌳' }, { en: 'flower', pt: 'flor', emoji: '🌺' },
    { en: 'leaf', pt: 'folha', emoji: '🍃' }, { en: 'river', pt: 'rio', emoji: '🏞️' },
    { en: 'rock', pt: 'pedra', emoji: '🪨' },
  ], frase: ['The toucan lives in a tall tree.', 'O tucano mora numa árvore alta.'] },
  { tema: 'Bichinhos pequenos', cor: 'vermelho', palavras: [
    { en: 'frog', pt: 'sapo', emoji: '🐸' }, { en: 'butterfly', pt: 'borboleta', emoji: '🦋' },
    { en: 'bee', pt: 'abelha', emoji: '🐝' }, { en: 'ant', pt: 'formiga', emoji: '🐜' },
    { en: 'snail', pt: 'caracol', emoji: '🐌' },
  ], frase: ['The butterfly can fly.', 'A borboleta sabe voar.'] },
  { tema: 'Vamos nos mexer', cor: 'laranja', palavras: [
    { en: 'run', pt: 'correr', emoji: '🏃🏾' }, { en: 'jump', pt: 'pular', emoji: '🤸🏾' },
    { en: 'swim', pt: 'nadar', emoji: '🏊🏾' }, { en: 'dance', pt: 'dançar', emoji: '💃🏾' },
    { en: 'roll', pt: 'rolar', img: 'img/personagens/bolota.webp' },
  ], frase: ['Bolota can roll!', 'O Bolota sabe rolar!'] },
  { tema: 'Em casa', cor: 'azul', palavras: [
    { en: 'house', pt: 'casa', emoji: '🏠' }, { en: 'door', pt: 'porta', emoji: '🚪' },
    { en: 'window', pt: 'janela', emoji: '🪟' }, { en: 'bed', pt: 'cama', emoji: '🛏️' },
    { en: 'table', pt: 'mesa', emoji: '🍽️' },
  ], frase: ['Grandma is at home.', 'A vovó está em casa.'] },
  { tema: 'Na escola', cor: 'sol', palavras: [
    { en: 'book', pt: 'livro', emoji: '📖' }, { en: 'pencil', pt: 'lápis', emoji: '✏️' },
    { en: 'teacher', pt: 'professora', emoji: '👩🏾‍🏫' }, { en: 'friend', pt: 'amigo', emoji: '🤝🏾' },
    { en: 'school', pt: 'escola', emoji: '🏫' },
  ], frase: ['You are my friend.', 'Você é meu amigo.'] },
  { tema: 'Hora de comer', cor: 'laranja', palavras: [
    { en: 'rice', pt: 'arroz', emoji: '🍚' }, { en: 'beans', pt: 'feijão', emoji: '🫘' },
    { en: 'bread', pt: 'pão', emoji: '🍞' }, { en: 'milk', pt: 'leite', emoji: '🥛' },
    { en: 'egg', pt: 'ovo', emoji: '🥚' },
  ], frase: ['Rice and beans, yummy!', 'Arroz e feijão, que delícia!'] },
  { tema: 'Formas', cor: 'vermelho', palavras: [
    { en: 'circle', pt: 'círculo', emoji: '⚪' }, { en: 'square', pt: 'quadrado', emoji: '🟥' },
    { en: 'triangle', pt: 'triângulo', emoji: '🔺' }, { en: 'heart', pt: 'coração', emoji: '❤️' },
    { en: 'star', pt: 'estrela', emoji: '⭐' },
  ], frase: ['Bolota is a little circle!', 'O Bolota é uma bolinha!'] },
  { tema: 'Roupas', cor: 'turquesa', palavras: [
    { en: 'hat', pt: 'chapéu', emoji: '👒' }, { en: 'shoes', pt: 'sapatos', emoji: '👟' },
    { en: 'shirt', pt: 'camiseta', emoji: '👕' }, { en: 'dress', pt: 'vestido', emoji: '👗' },
    { en: 'socks', pt: 'meias', emoji: '🧦' },
  ], frase: ['Put on your shoes!', 'Coloque os sapatos!'] },
  { tema: 'Bichos de estimação', cor: 'sol', palavras: [
    { en: 'dog', pt: 'cachorro', emoji: '🐶' }, { en: 'cat', pt: 'gato', emoji: '🐱' },
    { en: 'bird', pt: 'passarinho', emoji: '🐦' }, { en: 'fish', pt: 'peixe', emoji: '🐟' },
    { en: 'rabbit', pt: 'coelho', emoji: '🐰' },
  ], frase: ['My dog is happy.', 'Meu cachorro está feliz.'] },
  { tema: 'O tempo lá fora', cor: 'azul', palavras: [
    { en: 'hot', pt: 'quente', emoji: '🥵' }, { en: 'cold', pt: 'frio', emoji: '🥶' },
    { en: 'wind', pt: 'vento', emoji: '🌬️' }, { en: 'storm', pt: 'tempestade', emoji: '⛈️' },
    { en: 'sunny', pt: 'ensolarado', emoji: '🌞' },
  ], frase: ['It is hot today!', 'Hoje está quente!'] },
  { tema: 'Passeios', cor: 'laranja', palavras: [
    { en: 'boat', pt: 'barco', emoji: '⛵' }, { en: 'bus', pt: 'ônibus', emoji: '🚌' },
    { en: 'car', pt: 'carro', emoji: '🚗' }, { en: 'bike', pt: 'bicicleta', emoji: '🚲' },
    { en: 'plane', pt: 'avião', emoji: '✈️' },
  ], frase: ['Let’s go by boat!', 'Vamos de barco!'] },
  { tema: 'No fundo do mar', cor: 'turquesa', palavras: [
    { en: 'whale', pt: 'baleia', emoji: '🐋' }, { en: 'dolphin', pt: 'golfinho', emoji: '🐬' },
    { en: 'octopus', pt: 'polvo', emoji: '🐙' }, { en: 'starfish', pt: 'estrela-do-mar', emoji: '⭐' },
    { en: 'wave', pt: 'onda', emoji: '🌊' },
  ], frase: ['The whale is very big.', 'A baleia é muito grande.'] },
  { tema: 'Música', cor: 'vermelho', palavras: [
    { en: 'drum', pt: 'tambor', emoji: '🥁' }, { en: 'guitar', pt: 'violão', emoji: '🎸' },
    { en: 'song', pt: 'canção', emoji: '🎵' }, { en: 'sing', pt: 'cantar', emoji: '🎤' },
    { en: 'clap', pt: 'bater palmas', emoji: '👏🏾' },
  ], frase: ['Let’s sing a song!', 'Vamos cantar uma música!'] },
  { tema: 'Brincadeiras', cor: 'sol', palavras: [
    { en: 'ball', pt: 'bola', emoji: '⚽' }, { en: 'kite', pt: 'pipa', emoji: '🪁' },
    { en: 'toy', pt: 'brinquedo', emoji: '🧸' }, { en: 'swing', pt: 'balanço', emoji: '🛝' },
    { en: 'play', pt: 'brincar', emoji: '🎈' },
  ], frase: ['Let’s play!', 'Vamos brincar!'] },
  { tema: 'Opostos', cor: 'azul', palavras: [
    { en: 'big', pt: 'grande', emoji: '🐘' }, { en: 'small', pt: 'pequeno', emoji: '🐭' },
    { en: 'fast', pt: 'rápido', emoji: '🐆' }, { en: 'slow', pt: 'devagar', emoji: '🐢' },
    { en: 'tall', pt: 'alto', emoji: '🦒' },
  ], frase: ['The turtle is slow.', 'A tartaruga é devagar.'] },
  { tema: 'Meu dia', cor: 'laranja', palavras: [
    { en: 'morning', pt: 'manhã', emoji: '🌅' }, { en: 'night', pt: 'noite', emoji: '🌃' },
    { en: 'breakfast', pt: 'café da manhã', emoji: '🥣' }, { en: 'bath', pt: 'banho', emoji: '🛁' },
    { en: 'sleep', pt: 'dormir', emoji: '😴' },
  ], frase: ['Good night, Bolota!', 'Boa noite, Bolota!'] },
  { tema: 'Palavras gentis', cor: 'turquesa', palavras: [
    { en: 'hello', pt: 'olá', emoji: '👋🏾' }, { en: 'goodbye', pt: 'tchau', emoji: '🙋🏾' },
    { en: 'please', pt: 'por favor', emoji: '🙏🏾' }, { en: 'thank you', pt: 'obrigado', emoji: '💛' },
    { en: 'sorry', pt: 'desculpa', emoji: '🤗' },
  ], frase: ['Thank you, Grandma!', 'Obrigada, vovó!'] },
  { tema: 'Bichos grandes do Brasil', cor: 'vermelho', palavras: [
    { en: 'jaguar', pt: 'onça', emoji: '🐆' }, { en: 'monkey', pt: 'macaco', emoji: '🐒' },
    { en: 'parrot', pt: 'papagaio', emoji: '🦜' }, { en: 'alligator', pt: 'jacaré', emoji: '🐊' },
    { en: 'sloth', pt: 'bicho-preguiça', emoji: '🦥' },
  ], frase: ['The sloth is very slow.', 'O bicho-preguiça é bem devagar.'] },
];

const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

function semanaAtual(hoje = new Date()) {
  const dias = Math.floor((new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) - INICIO) / 864e5);
  const numero = Math.max(0, Math.floor(dias / 7));
  const segunda = new Date(INICIO.getTime() + numero * SEMANA_MS);
  return { numero, semana: SEMANAS[numero % SEMANAS.length], segunda };
}

// Voz em inglês: escolhe a melhor voz americana disponível no aparelho
function vozIngles() {
  if (!('speechSynthesis' in window)) return null;
  const todas = speechSynthesis.getVoices().filter((v) => /^en(-|_)US/i.test(v.lang));
  const preferidas = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Ava', 'Allison'];
  for (const nome of preferidas) {
    const achou = todas.find((v) => v.name.includes(nome));
    if (achou) return achou;
  }
  return todas[0] || null;
}

function falarIngles(texto) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'en-US';
  fala.rate = 0.8;
  fala.pitch = 1.15;
  const voz = vozIngles();
  if (voz) fala.voice = voz;
  speechSynthesis.speak(fala);
}

function montarPalavras() {
  const area = document.getElementById('palavras-grade');
  if (!area) return;
  const { semana, segunda } = semanaAtual();
  const fmt = (d) => d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const domingo = new Date(segunda.getTime() + 6 * 864e5);

  document.getElementById('palavras-tema').textContent = semana.tema;
  document.getElementById('palavras-datas').textContent = `De ${fmt(segunda)} a ${fmt(domingo)}`;

  area.innerHTML = '';
  semana.palavras.forEach((p, i) => {
    const cartao = document.createElement('button');
    cartao.type = 'button';
    cartao.className = `palavra palavra--${['laranja', 'turquesa', 'sol', 'vermelho', 'azul'][i % 5]}`;
    cartao.setAttribute('aria-label', `${p.en}, quer dizer ${p.pt}. Toque para ouvir.`);
    const figura = p.img
      ? `<img src="${p.img}" alt="" loading="lazy">`
      : `<span class="palavra-emoji" aria-hidden="true">${p.emoji}</span>`;
    cartao.innerHTML = `${figura}<span class="palavra-en">${p.en}</span><span class="palavra-pt">${p.pt}</span><span class="palavra-ouvir" aria-hidden="true">🔊 ouvir</span>`;
    cartao.addEventListener('click', () => {
      falarIngles(p.en);
      cartao.classList.remove('falando');
      void cartao.offsetWidth;
      cartao.classList.add('falando');
    });
    area.appendChild(cartao);
  });

  const [fraseEn, frasePt] = semana.frase;
  document.getElementById('palavras-frase-en').textContent = fraseEn;
  document.getElementById('palavras-frase-pt').textContent = frasePt;
  document.getElementById('palavras-frase-ouvir').onclick = () => falarIngles(fraseEn);
}

if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};
document.addEventListener('DOMContentLoaded', montarPalavras);
window.PALAVRAS = { SEMANAS, semanaAtual };
