mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaHJhandvcmxkIiwiYSI6ImNrcm03dTczZTFrM2cycHB2cWxkMTlkZ3EifQ._9q3D5ezKLVfF41nXLfajg';
const coordinates = document.getElementById('coordinates');
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [81, 25],
    zoom: 8
});

const marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([81, 25])
    .addTo(map);

function onDragEnd() {
    const lngLat = marker.getLngLat();
    long = lngLat.lng
    lati = lngLat.lat
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
}

marker.on('dragend', onDragEnd);
