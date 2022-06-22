const secret_api = 'at_WqxYparaQRxJH0wCC8n2zLHQYuU07'
const api_url = 'https://geo.ipify.org/api/v2/country,city?'

const myForm = document.querySelector('form')
let current_ip = document.getElementById('ip_add')
let current_town = document.getElementById('town')
let current_zone = document.getElementById('zone')
let current_isp = document.getElementById('isp_result')

const entered_ip = document.getElementById('ip')
const search_btn = document.getElementById('button')

const map = L.map('map', {
   'center': [30,-95],
   'zoom': 13,
   'layers': [
   L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
   })]
});

var customIcon = L.icon({iconUrl:'./img/icon-location.svg'});
 let myMarker;

updateMarker = (update_marker = [30, -95]) => {
   map.setView(update_marker, 13);

   if(myMarker != null) myMarker.remove()
   
   myMarker = L.marker(update_marker, {icon: customIcon}).addTo(map);
}

let ip_url;

getIPDetails = (default_ip) => {
   if(default_ip == undefined) {
      ip_url = `${api_url}&apiKey=${secret_api}`;
   }
   else {
      ip_url = `${api_url}&apiKey=${secret_api}&ipAddress=${default_ip}`;
   }

   fetch(ip_url)
   .then(results => results.json())
   .then(data => {
      current_ip.innerHTML = data.ip
      current_town.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
      current_zone.innerHTML = `UTC ${data.location.timezone}`
      current_isp.innerHTML = data.isp

      updateMarker([data.location.lat, data.location.lng])
   })
   .catch(errors => {
      current_ip.innerHTML = '___'
      current_town.innerHTML = '___'
      current_zone.innerHTML = '___'
      current_isp.innerHTML = '___'

      const myInput = myForm.searchInput
      myInput.classList.add('error')
      setTimeout(() => myInput.classList.remove('error'), 3000)
      console.error(error)

      alert("Oops! Something went wrong")
   });

}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
   e.preventDefault()
   if(entered_ip.value != '' && entered_ip.value != null) {
      getIPDetails(entered_ip.value)
      return
   }
   const myInput = myForm.searchInput
   myInput.classList.add('error')
   setTimeout(() => myInput.classList.remove('error'), 3000)
   alert("Please enter a valid IP address")
})

getIPDetails()

