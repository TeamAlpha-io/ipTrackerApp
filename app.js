"use strict";

const inputField = document.querySelector(".inputField");
const submitBtn = document.querySelector(".submitBtn");
const ipAddress = document.querySelector(".ipAddress");
const locationData = document.querySelector(".location");
const timeZone = document.querySelector(".timeZone");
const isp = document.querySelector(".isp");
const blackMarker = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [40, 50],
});

// IPify API
const getIpData = async (ipInput) => {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_5azKAD4YK0mwQNBotQlfpXSZyww2C&ipAddress=${ipInput}`
    );
    const data = await res.json();
    const { lat } = data.location;
    const { lng } = data.location;
    const coords = [lat, lng];

    const map = L.map("map").setView(coords, 5);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker(coords, { icon: blackMarker })
      .bindPopup("you are here")
      .addTo(map);
    return (
      (ipAddress.textContent = data.ip),
      (locationData.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`),
      (timeZone.textContent = `UTC ${data.location.timezone}`),
      (isp.textContent = data.isp)
    );
  } catch (err) {
    alert("Please whitelist this page.");
    console.log(err);
  }
};

submitBtn.addEventListener("click", getIpData(inputField.value));
