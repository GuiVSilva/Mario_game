// Selecionando elementos do DOM
const mario = document.querySelector('.mario') // Elemento HTML que representa o personagem Mario
const pipe = document.querySelector('.pipe') // Elemento HTML que representa o cano

const start = document.querySelector('.start') // Elemento HTML que representa o botão de iniciar o jogo
const gameOver = document.querySelector('.game-over') // Elemento HTML que representa a tela de game over

// Carregando e configurando áudios
audioStart = new Audio('soung/audio_theme.mp3') // Áudio reproduzido no início do jogo
audioGameOver = new Audio('soung/audio/audio_gameover.mp3') // Áudio reproduzido ao final do jogo

// Função para iniciar o jogo
const startGame = () => {
  // Adiciona a classe de animação ao cano para movimento
  pipe.classList.add('pipe-animation')
  // Esconde o botão de iniciar para o jogador não clicar novamente
  start.style.display = 'none'

  // Reproduz o áudio do início do jogo
  audioStart.play()
}

// Função para reiniciar o jogo
const restartGame = () => {
  // Esconde a tela de game over
  gameOver.style.display = 'none'
  // Reseta a posição do cano
  pipe.style.left = ''
  pipe.style.right = '0'
  // Reseta a imagem e as propriedades do Mario
  mario.src = 'img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  // Esconde o botão de iniciar
  start.style.display = 'none'
}

// Função para fazer o Mario pular
const jump = () => {
  // Adiciona a classe de animação de pulo ao Mario
  mario.classList.add('jump')

  // Remove a classe de pulo após 800ms para completar a animação
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

// Função para verificar colisão e encerrar o jogo, se houver
const loop = () => {
  setInterval(() => {
    // Obtém a posição do cano e do Mario
    const pipePosition = pipe.offsetLeft // Posição horizontal do cano
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ') // Posição vertical do Mario

    // Verifica se houve colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      // Remove a animação do cano
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      // Remove a animação de pulo do Mario
      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      // Altera a imagem do Mario para a tela de game over
      mario.src = 'img/game-over.png'
      mario.style.width = '75px'
      mario.style.marginLeft = '50px'

      // Exibe a tela de game over
      gameOver.style.display = 'flex'

      // Interrompe o loop
      clearInterval(loop)
    }
  }, 10) // Executa a verificação a cada 10 milissegundos
}

loop() // Inicia o loop de verificação de colisão

// Evento de tecla para fazer o Mario pular
document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump() // Chama a função para fazer o Mario pular
  }
})

// Evento de toque na tela para fazer o Mario pular
document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() // Chama a função para fazer o Mario pular
  }
})

// Evento de tecla Enter para iniciar o jogo
document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame() // Chama a função para iniciar o jogo
  }
})
