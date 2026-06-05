// ========== ВИНТАЖНЫЙ КОНВЕРТ ==========
const envelopeScreen = document.getElementById('envelopeScreen');
const vintageEnvelope = document.getElementById('vintageEnvelope');
const mainContent = document.getElementById('mainContent');

function openEnvelope() {
  vintageEnvelope.classList.add('open');
  
  setTimeout(() => {
    envelopeScreen.classList.add('hide');
  }, 600);
  
  setTimeout(() => {
    mainContent.classList.add('visible');
    checkFade();
  }, 900);
}

if (vintageEnvelope) {
  vintageEnvelope.addEventListener('click', openEnvelope);
}
document.querySelector('.envelope-text')?.addEventListener('click', openEnvelope);
document.querySelector('.envelope-wrapper')?.addEventListener('click', openEnvelope);

// ========== ТАЙМЕР ==========
function updateTimer() {
  const targetDate = new Date(2026, 5, 6, 0, 0, 0);
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (86400000)) / (3600000));
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById('days').innerText = days < 10 ? '0' + days : days;
  document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}
updateTimer();
setInterval(updateTimer, 1000);

// ========== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ==========
const fadeElements = document.querySelectorAll('.fade-up');

function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('resize', checkFade);

// ========== КАРТА ПО КНОПКЕ ==========
document.getElementById('showMapBtn')?.addEventListener('click', () => {
  const mapDiv = document.getElementById('venue-map');
  if (mapDiv) {
    mapDiv.style.display = 'block';
    mapDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// ========== ВИШЛИСТ ==========
document.querySelectorAll('.reserve-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const giftName = btn.getAttribute('data-gift');
    alert(`🎁 Подарок "${giftName}" зарезервирован! Свяжитесь с нами для уточнения.`);
  });
});

console.log('💍 Свадебный сайт с винтажным конвертом готов!');