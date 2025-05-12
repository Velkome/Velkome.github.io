let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';


const $flamingoTap = document.querySelector('#flamingoTap')
const $score = document.querySelector('#score')

function start() {
  setScore(getScore())
  setImage()
}

function setScore(score) {
  localStorage.setItem('score', score)
  $score.textContent = score
}

function setImage() {
  if (getScore() >= 50) {
    $flamingoTap.setAttribute('src', './assets/lamingo.jpg')
  }
}

function getScore() {
  return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
  setScore(getScore() + 1)
  setImage()
}

$flamingoTap.addEventListener('click', (event) => {
  const rect = $flamingoTap.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 50

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  $flamingoTap.style.setProperty('--tiltX', `${tiltX}deg`)
  $flamingoTap.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    $flamingoTap.style.setProperty('--tiltX', `0deg`)
    $flamingoTap.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  $flamingoTap.parentElement.appendChild(plusOne)

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
})

start()
