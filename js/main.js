// Menu do celular
const botaoMenu = document.querySelector('.menu-botao');
const menu = document.getElementById('menu');
if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
  });
  menu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
    })
  );
}

// Quem sou eu?
const pistas = document.querySelectorAll('#pistas li');
const proxima = document.getElementById('proxima-pista');
const revelar = document.getElementById('revelar');
const caixaImagem = document.getElementById('enigma-img');
const foto = document.getElementById('enigma-foto');
const resposta = document.getElementById('resposta');
let pistaAtual = 0;

if (proxima) {
  proxima.addEventListener('click', () => {
    if (pistaAtual < pistas.length - 1) {
      pistaAtual += 1;
      pistas[pistaAtual].hidden = false;
    }
    if (pistaAtual === pistas.length - 1) {
      proxima.textContent = 'Já sabe? Fala alto!';
      proxima.disabled = true;
    }
  });
}
if (revelar) {
  revelar.addEventListener('click', () => {
    pistas.forEach((p) => (p.hidden = false));
    caixaImagem.classList.add('revelado');
    foto.alt = 'Zuri comemorando ao lado de um tucano';
    resposta.textContent = 'Eu sou o TUCANO! Em inglês: toucan.';
  });
}
