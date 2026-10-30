// ===== ENTRADA E SAÍDA =====
function entrar() {
  document.getElementById('entrada').classList.add('sumir'); // a tela sobe e some
  chover();                                                    // começam os corações
}
function sair() {
  document.getElementById('saida').classList.add('aparecer'); // a tela sobe de baixo
}
function voltar() {
  document.getElementById('saida').classList.remove('aparecer');
}

// ===== CORAÇÕES NO CABEÇALHO =====
function criarCoracao() {
  var hero = document.getElementById('hero');
  var c = document.createElement('span');
  c.className = 'coracao';
  c.innerHTML = '❤';
  c.style.left = Math.random() * 95 + '%';   // posição aleatória
  hero.appendChild(c);
  setTimeout(function () { c.remove(); }, 6000); // apaga depois de subir
}
function chover() {
  for (var i = 0; i < 8; i++) {
    setTimeout(criarCoracao, i * 300);
  }
}
setInterval(criarCoracao, 1500); // um coração novo a cada 1,5 segundo

// ===== CALENDÁRIO 2026 =====
var nomesMeses = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
var emojis = ['<img src="1_DP-nil6k3etToaslbOGXlA.jpg" alt=".">','<img src="IMG-20260710-WA0020.jpg" alt=".">'
  ,'<img src="IMG-20260906-WA0046.jpg" alt=".">','<img src="IMG-20260808-WA0049.jpg" alt=".">',
  '<img src="IMG-20260710-WA0099.jpg" alt=".">','<img src="IMG-20260613-WA0071.jpg" alt=".">',
  '<img src="IMG-20260604-WA0052.jpg" alt=".">','<img src="Screenshot_2026-07-10-21-58-14-27_50ef9f5a0f3fc24b6f0ffc8843167fe4.jpg" alt=".">',
  '<img src="IMG_20260706_223516.jpg" alt=".">','<img src="IMG-20260613-WA0073.jpg" alt=".">',
  '<img src="IMG-20260808-WA0059.jpg" alt=".">','<img src="IMG-20260808-WA0062.jpg" alt=".">'];
var divMeses = document.getElementById('meses');

for (var m = 0; m < 12; m++) {
  var primeiroDia = new Date(2026, m, 1).getDay();       // 0 = domingo
  var totalDias = new Date(2026, m + 1, 0).getDate();     // quantos dias tem o mês

  var tabela = '<table><tr><th class="domingo">D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th></tr><tr>';
  for (var v = 0; v < primeiroDia; v++) { tabela += '<td></td>'; } // espaços vazios

  for (var d = 1; d <= totalDias; d++) {
    var classe = '';
    if ((primeiroDia + d - 1) % 7 === 0) { classe = 'domingo'; }
    // de 24/02 até 31/10 = verde escuro
    if ((m === 1 && d >= 24) || (m >= 2 && m <= 9)) { classe += ' verde'; }
    // de 01/11 até 31/12 = amarelo
    if (m >= 10) { classe += ' amarelo'; }
    if (m === 1 && d === 24) { classe += ' destaque'; }             // 24 de fevereiro
    tabela += '<td class="' + classe + '">' + d + '</td>';
    if ((primeiroDia + d) % 7 === 0) { tabela += '</tr><tr>'; }   // nova linha no sábado
  }
  tabela += '</tr></table>';

  var legenda = (m === 1) ? '<small>24/02 – Nos conhecemos</small>' : '';
  // Para usar foto: troque a div "foto" por <img src="mes' + (m+1) + '.jpg">
  divMeses.innerHTML += '<div class="card mes escondido"><div class="foto">' + emojis[m] + '</div><h3>' + nomesMeses[m] + ' 2026</h3>' + tabela + legenda + '</div>';
}

// ===== GALERIA DE FOTOS =====
var legendas = ['Pôr do sol','Abraço','Nós dois','Girassóis','Flores','Sorriso','Carinho','Shopping','Selfie','Nosso momento','Memórias','Juntos','Sempre você','Nosso amor'];
// nomes das fotos da galeria (na mesma ordem das legendas acima)
// troque pelos nomes das suas fotos, os arquivos ficam na mesma pasta do site
var fotosGaleria = [
  'IMG_20260517_192830.jpg',
  'IMG_20260706_223516.jpg',
  'IMG_20260904_075608.jpg',
  'IMG_20260927_145917.jpg',
  'IMG-20260613-WA0060.jpg',
  'IMG-20260710-WA0099.jpg',
  'Screenshot_2026-07-10-21-58-14-27_50ef9f5a0f3fc24b6f0ffc8843167fe4.jpg',
  'Screenshot_2026-07-10-21-41-58-53_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  'IMG-20260906-WA0046.jpg',
  'IMG-20260710-WA0020.jpg',
  'IMG-20260524-WA0083.jpg',
  'IMG-20260604-WA0052.jpg',
  'IMG-20260814-WA0071.jpg',
  'IMG-20260420-WA0241.jpg'
];

var galeria = document.getElementById('galeria');
for (var i = 0; i < legendas.length; i++) {
  // cada card agora tem uma imagem no lugar do emoji
  galeria.innerHTML += '<div class="card escondido"><img src="' + fotosGaleria[i] + '" alt="' + legendas[i] + '"><p>' + legendas[i] + '</p></div>';
}

// ===== APARECER AO ROLAR =====
// os títulos também entram com animação
var titulos = document.querySelectorAll('h2');
for (var t = 0; t < titulos.length; t++) {
  titulos[t].classList.add('escondido');
}

function mostrarAoRolar() {
  var itens = document.querySelectorAll('.escondido:not(.visivel)');
  var atraso = 0; // cada item espera um pouquinho mais que o anterior
  for (var i = 0; i < itens.length; i++) {
    var topo = itens[i].getBoundingClientRect().top;
    if (topo < window.innerHeight - 60) {
      itens[i].style.animationDelay = atraso + 'ms';
      itens[i].classList.add('visivel');
      atraso += 150;
    }
  }
}

// ===== TRANSIÇÃO ENTRE PARTES =====
var passagem = document.getElementById('passagem');

function irPara(destino) {
  passagem.classList.add('ativa'); // a tela escurece com o coração
  setTimeout(function () {
    var posicao = 0; // 'inicio' = topo da página
    if (destino !== 'inicio') {
      posicao = document.getElementById(destino).offsetTop - document.querySelector('header').offsetHeight;
    }
    window.scrollTo({ top: posicao, behavior: 'instant' });
    mostrarAoRolar();
    passagem.classList.remove('ativa'); // a tela clareia mostrando a nova parte
  }, 500);
}

// todos os links que começam com # usam a transição
var links = document.querySelectorAll('a[href^="#"]');
for (var l = 0; l < links.length; l++) {
  links[l].addEventListener('click', function (evento) {
    evento.preventDefault();
    irPara(this.getAttribute('href').substring(1));
  });
}

// ===== AO ROLAR: barra de progresso e botão de voltar =====
function aoRolar() {
  mostrarAoRolar();
  var rolou = window.scrollY;
  var total = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progresso').style.width = (rolou / total * 100) + '%';

  var botao = document.getElementById('botaoTopo');
  if (rolou > 400) {
    botao.classList.add('mostrar');
  } else {
    botao.classList.remove('mostrar');
  }
}
window.addEventListener('scroll', aoRolar);
window.addEventListener('load', mostrarAoRolar);
