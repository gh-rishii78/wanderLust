mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});

// console.log(coordinates);
const marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(listing.geometry.coordinates) // listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h5>${listing.title}</h5><p>Exact Loaction will be provided after booking</p>`))
    .addTo(map);
/**
 * Geocoding - 
 * is the process of converting addresses (like a street address) into geographic
 * coordinates (like latitude and longitude), which you can use to place markers
 * on a map, or postion the map.
 * 
 * npm install @mapbox/mapbox-sdk
 * refer to : https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#forwardgeocode-1
 */