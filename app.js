"use strict";

const inputField = document.querySelector(".inputField");
const submitBtn = document.querySelector(".submitBtn");
const ipAddress = document.querySelector(".ipAddress");
const location = document.querySelector(".location");
const timeZone = document.querySelector(".location");
const isp = document.querySelector(".isp");

//Leaflet Map
const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();

////geolocation API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then((pos) => console.log(pos));

// IPify API
// https://geo.ipify.org/api/v2/country,city?apiKey=at_5azKAD4YK0mwQNBotQlfpXSZyww2C&ipAddress=8.8.8.8

submitBtn.addEventListener("click", function () {
  const getIpify = async () => {
    const ipInput = inputField.value;
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_5azKAD4YK0mwQNBotQlfpXSZyww2C&ipAddress=${ipInput}`
    );
    const data = await res.json();
    return data;
  };
});

//TO DO: sort returned data(.ip, .location, .location.timezone, .isp) into appropriate DOM elements.
