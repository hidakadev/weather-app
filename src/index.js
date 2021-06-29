function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let weekday = date.getDay();
    let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = weekdays[weekday];
    return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
}

function showCity(city) {
    let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function searchButton(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    showCity(city);
}

function showCurrent(position) {
    let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrent(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrent);
}

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchButton);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrent);

showCity("Dublin");