function updateTimer() {
  const targetDate = new Date(2026, 5, 26, 0, 0, 0);
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (86400000)) / (3600000));
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById('days').innerText = days < 10 ? '0'+days : days;
  document.getElementById('hours').innerText = hours < 10 ? '0'+hours : hours;
  document.getElementById('minutes').innerText = minutes < 10 ? '0'+minutes : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? '0'+seconds : seconds;
}
updateTimer();
setInterval(updateTimer, 1000);

const envelopeScreen = document.getElementById('envelopeScreen');
const luxuryEnvelope = document.querySelector('.luxury-envelope');
const mainContent = document.getElementById('mainContent');
function openEnvelope() {
  if(luxuryEnvelope) luxuryEnvelope.classList.add('open');
  setTimeout(() => { if(envelopeScreen) envelopeScreen.classList.add('hide'); }, 600);
  setTimeout(() => { if(mainContent) mainContent.classList.add('visible'); checkFade(); }, 900);
}
if(luxuryEnvelope) luxuryEnvelope.addEventListener('click', openEnvelope);
document.querySelector('.envelope-text-luxury')?.addEventListener('click', openEnvelope);
document.querySelector('.envelope-wrapper')?.addEventListener('click', openEnvelope);

const fadeElements = document.querySelectorAll('.fade-up');
function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) el.classList.add('visible');
  });
}
window.addEventListener('scroll', checkFade);
window.addEventListener('resize', checkFade);

// ========== КАРТА С РЕСТОРАНОМ ==========
document.getElementById('showMapBtn')?.addEventListener('click', () => {
  const mapDiv = document.getElementById('venue-map-luxury');
  if (!mapDiv) return;

  mapDiv.style.display = 'block';
  mapDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (!mapDiv.hasAttribute('data-initialized')) {
    mapDiv.setAttribute('data-initialized', 'true');
    
    function initMap() {
      var address = "Ростов-на-Дону, ул. Волкова, 12/1";
      
      ymaps.geocode(address, { results: 1 }).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        if (!firstGeoObject) {
          console.error("Адрес не найден");
          return;
        }
        
        var coords = firstGeoObject.geometry.getCoordinates();
        var formattedAddress = firstGeoObject.getAddressLine();
        
        var myMap = new ymaps.Map("venue-map-luxury", {
          center: coords,
          zoom: 17,
          controls: ['zoomControl', 'fullscreenControl']
        });
        
        var myPlacemark = new ymaps.Placemark(coords, {
          hintContent: 'Ресторан "Моя Италия"',
          balloonContent: `<strong>🍝 Ресторан "Моя Италия"</strong><br/>${formattedAddress}<br/>Итальянская кухня, банкетный зал`
        }, {
          preset: 'islands#redWeddingIcon',
          iconColor: '#d4af37'
        });
        
        myMap.geoObjects.add(myPlacemark);
        myPlacemark.balloon.open();
        
      }).catch(function (err) {
        console.error("Ошибка геокодирования: ", err);
        var defaultMap = new ymaps.Map("venue-map-luxury", {
          center: [47.222078, 39.720358],
          zoom: 14,
          controls: ['zoomControl', 'fullscreenControl']
        });
      });
    }
    
    ymaps.ready(initMap);
  }
});

console.log('💍 Сайт готов! Свадьба 26.06.2026, ресторан "Моя Италия"');