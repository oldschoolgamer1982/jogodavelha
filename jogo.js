var jogadas = 0;
var cont = 0;
var jogador = {nome:'', valores: []};
var ganhador = 'velha';
var vitoria = [['a1','a2','a3'],['b1','b2','b3'],['c1','c2','c3'],['a1','b1','c1'],['a2','b2','c2'],['a3','b3','c3'],['a1','b2','c3'],['a3','b2','c1']];
var player1 = []
var player2 = []
var inicio = false
const msg1 = "Vamos Começar!";
const msg2 = "Escolha e clique!";

const linha1 = document.getElementById("linha1");
const linha2 = document.getElementById("linha2");

function typeWrite(alinha,mensagem){
  
  const textoArray = mensagem.split("");
  textoArray.forEach((caractere, i) => {
    setTimeout(() => alinha.innerHTML += caractere, 100 * i)
  });
}
typeWrite(linha1, msg1);

setTimeout(function(){
  linha1.textContent = ""
  typeWrite(linha1, msg2);
}, 2000);

setTimeout(function(){
  inicio = true
 }, 4000);

function marcarJogada(p){
  if (inicio) {
    ++jogadas
    jogada = document.getElementById(p)
    jogada.onclick = function(){ return false }
    linha1.textContent = "Sua vez..."
    linha2.textContent = ""
    

    if(jogadas % 2 === 0){
      jogada.textContent = "0"
      linha2.textContent = "Player 1"
      jogador.nome = 'Player 2'
      jogador.valores = player2
      player2.push(p)
    } else {
      jogada.textContent = "x"
      jogador.nome = 'Player 1'
      jogador.valores = player1
      player1.push(p)
      linha2.textContent = "Player 2"
    }

    if(jogadas >= 5){ 
      for (res of vitoria) {
        for(i of res) {
          if (jogador.valores.indexOf(i) != -1) {
            cont += 1
          }
        }
        if (cont >= 3){
          ganhador = jogador.nome
          finalJogo(ganhador, res)
          console.log(ganhador, res)
          break
        }
        cont = 0
      }
    } 
    
    if (jogadas >= 9 && ganhador == 'velha') {
      var pecas = document.querySelectorAll('.peca')
      finalJogo(ganhador, pecas)
    }

    function finalJogo(ganhador,marcador){
      travarTabuleiro()
      if (ganhador != 'velha') {
        linha1.textContent = ""
        linha1.textContent = ganhador
        linha2.textContent = "You Win !!!"
        for (e of marcador) {
          document.getElementById(e).style.color = "chartreuse"
        }
      } else {
        linha1.textContent = ""
        linha1.textContent = "Deu " + ganhador
        linha2.textContent = "Draw !!!"
        for (e of marcador) {
          e.style.color = "red"
        }
      }
      setTimeout(function(){ 
        document.getElementById("reload").style.display = "block"
      }, 1000);
    }
  }
}

function travarTabuleiro() {
  var tab = document.querySelectorAll('.peca')
  for (e of tab){
      e.onclick = function(){ return false }
  }
}
