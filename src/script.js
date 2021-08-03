// ⏰Changing the time

let now = new Date();

let date = document.querySelector("#current-time");

let currentDate = now.getDate();
let currentHours = now.getHours();
let currentMins = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
date.innerHTML = `${day} ${month} ${currentDate}, ${currentHours}:${currentMins}`;

// 🌡 Finding the temperature

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;
}

function getInformation(event) {
  event.preventDefault();
  let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
  let cityName = document.querySelector("#search-city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayWeather);
}

let inputCity = document.querySelector("#search-form");
inputCity.addEventListener("submit", getInformation);

// 📍 Current location
function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let h1 = document.querySelector("h1");
  let currentTemp = document.querySelector("#current-temp");
  h1.innerHTML = `${place}`;
  currentTemp.innerHTML = `${temperature}°C`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

let currentLocation = document.querySelector("#check-location");
currentLocation.addEventListener("click", getCurrentLocation);
