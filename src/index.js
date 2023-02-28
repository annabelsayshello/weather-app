function searchNewCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=6d68aadfacdd4f5163bc273049a0cf2d&units=metric`
    )
    .then(showCurrentTemp);
}

function showCurrentTemp(response) {
  currentTemp = Math.round(response.data.main.temp);
  currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = `${currentTemp}°C `;
  let currentCity = document.querySelector("h3#current-city");
  currentCity.innerHTML = `${response.data.name}`;
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(showUserLocation);
}

function showUserLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=6d68aadfacdd4f5163bc273049a0cf2d&units=metric`
    )
    .then(showCurrentTemp);
}

// Time and date formatting
let dateInfo = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[dateInfo.getDay()];
let hour = dateInfo.getHours();
let minutes = ("0" + dateInfo.getMinutes()).slice(-2);

let dayAndTime = document.querySelector("h3#current-day-and-time");
dayAndTime.innerHTML = `${day} ${hour}:${minutes}`;

// Current user location submit
let userLocationButton = document.querySelector("#user-location");
userLocationButton.addEventListener("click", getUserLocation);

// Search for a city
let form = document.querySelector("form");
form.addEventListener("submit", searchNewCity);
