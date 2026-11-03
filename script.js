
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");

const map = L.map("map").setView([52.0, 19.0], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
}).addTo(map);

let marker = null;

startBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        statusText.textContent = "Twoja przeglądarka nie obsługuje GPS.";
        return;
    }

    statusText.textContent = "Oczekiwanie na zgodę i lokalizację...";

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            latText.textContent = lat.toFixed(6);
            lonText.textContent = lon.toFixed(6);

            map.setView([lat, lon], 16);

            if (marker) {
                marker.setLatLng([lat, lon]);
            } else {
                marker = L.marker([lat, lon]).addTo(map);
            }

            marker.bindPopup("Twoja lokalizacja").openPopup();

            statusText.textContent = "Lokalizacja została pobrana!";
        },

        (error) => {
            statusText.textContent =
                "Nie udało się pobrać lokalizacji. Sprawdź zgodę GPS.";
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );

});
