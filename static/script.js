// Inicializar mapa con tiles oscuros legibles (Carto Voyager Dark)
const map = L.map('map').setView([18.944167, -99.199722], 15);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

let marker, circle;
let radius = 1;

// Actualiza coordenadas, geocode y enlaces
function updateDisplay(lat, lon) {
  const geocode = `geocode:${lat},${lon},${radius}km`;
  document.getElementById("coords").textContent = `${lat}, ${lon}`;
  document.getElementById("geocode").textContent = geocode;

  const base = `https://x.com/search?q=${encodeURIComponent(geocode)}`;
  document.getElementById("linkAll").href = `${base}&src=typed_query&f=live`;
  document.getElementById("linkMedia").href = `${base}%20filter:media&src=typed_query&f=live`;
  document.getElementById("linkImages").href = `${base}%20filter:images&src=typed_query&f=live`;
  document.getElementById("linkVideos").href = `${base}%20filter:native_video&src=typed_query&f=live`;
}

// Dibuja marcador y círculo
function drawMarker(lat, lon, label = null) {
  if (marker) map.removeLayer(marker);
  if (circle) map.removeLayer(circle);
  marker = L.marker([lat, lon], {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize:[30,30]})}).addTo(map);
  if (label) marker.bindPopup(`<b>${label}</b>`).openPopup();
  circle = L.circle([lat, lon], { radius: radius*1000, color:'#00ffff', fillOpacity:0.2 }).addTo(map);
  updateDisplay(lat, lon);
}

// Clic en mapa
map.on('click', e => drawMarker(e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6)));

// Autocompletado con Nominatim
const input = document.getElementById('search');
const resultsBox = document.getElementById('results');
let searchTimeout;

input.addEventListener('input', () => {
  const query = input.value.trim();
  if (searchTimeout) clearTimeout(searchTimeout);
  if (query.length < 3) {
    resultsBox.style.display = 'none';
    return;
  }
  searchTimeout = setTimeout(async () => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8&countrycodes=mx`;
    const res = await fetch(url, { headers: { 'Accept-Language':'es' } });
    const data = await res.json();
    resultsBox.innerHTML = '';
    if (data.length > 0) {
      data.forEach(loc => {
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action';
        item.textContent = loc.display_name;
        item.addEventListener('click', () => {
          drawMarker(parseFloat(loc.lat).toFixed(6), parseFloat(loc.lon).toFixed(6), loc.display_name);
          map.setView([loc.lat, loc.lon], 16);
          resultsBox.style.display = 'none';
          input.value = loc.display_name;
        });
        resultsBox.appendChild(item);
      });
      resultsBox.style.display = 'block';
    } else resultsBox.style.display = 'none';
  }, 300);
});

// Ocultar lista al hacer clic afuera
document.addEventListener('click', e => {
  if (!resultsBox.contains(e.target) && e.target !== input) resultsBox.style.display = 'none';
});

// Botones de radio
document.getElementById("increase").addEventListener("click", ()=>{
  radius = Math.min(radius+1,50);
  document.getElementById("radiusLabel").textContent = `${radius} km`;
  if(marker) drawMarker(marker.getLatLng().lat, marker.getLatLng().lng);
});
document.getElementById("decrease").addEventListener("click", ()=>{
  radius = Math.max(radius-1,1);
  document.getElementById("radiusLabel").textContent = `${radius} km`;
  if(marker) drawMarker(marker.getLatLng().lat, marker.getLatLng().lng);
});
