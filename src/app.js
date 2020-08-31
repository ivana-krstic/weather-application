// Date
function FormatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
// Display Date and Time
let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = FormatDate(currentTime);

// Submit City Search
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  searchCity(cityInput.value);
}

//Search City
function searchCity(city) {
  let apiKey = "9ba9fca0d4e765da2c731eb735f4c043";
  let units = "imperial";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let myLocationButton = document.querySelector("#myLocation");
myLocationButton.addEventListener("click", myLocation);

// My Location
function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "ba381ba7f5af0b2afdddc476b2f74382";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#countryName").innerHTML = response.data.sys.country;
  // Weather API
  let temperatureFahr = response.data.main.temp;
  console.log(temperatureFahr);
  let temperatureRound = Math.round(temperatureFahr);
  document.querySelector("#tempFar").innerHTML = `${temperatureRound}°F`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(response.data.wind.speed)} mpH`;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#weather-description-today").innerHTML = response.data.weather[0].description;

  // Icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function convertToCel(){
  document.querySelector("#tempCel").classList.remove("none");
  let tempy = document.querySelector("#tempFar").innerHTML;
  console.log(tempy);

  let tempos =  parseInt(tempy);
  let tempCelsius =  Math.round((tempos - 32) * 5/9);
  console.log(tempos);
  console.log(tempCelsius);
  document.querySelector("#tempCel").innerHTML = `${tempCelsius}°C`;
  document.querySelector("#tempFar").classList.add("none");
}

function convertToFar(){
  document.querySelector("#tempFar").classList.remove("none");
  document.querySelector("#tempCel").classList.add("none");
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

searchCity("Vienna");