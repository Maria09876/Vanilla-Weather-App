function presentCurrentTime(timestamp) {
    let now = new Date;
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let month = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];
    
    let day = days[now.getDay()];
    let currentDate = now.getDate();
    let currentMonth = month[now.getMonth()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day}, ${currentDate} ${currentMonth}, ${hours}:${minutes}`;

} 
    
    
function showTemperature(response) {
    console.log(response.data);
    //data and variables from the top section
    let dateElement=document.querySelector("h4")
    let temperatureElement = document.querySelector("#temperature");
    let city = document.querySelector("#city");
    let rangeTemperature = document.querySelector("#tempRange");
    let descriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let iconElement = document.querySelector("#icon");

    celciusTemp = response.data.main.temp;

    dateElement.innerHTML = presentCurrentTime(response.data.dt);
    temperatureElement.innerHTML = `${Math.round(celciusTemp)}°C`;
    city.innerHTML = response.data.name;
    rangeTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}° / ${Math.round(response.data.main.temp_max)}°C`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    //data and variables for the middle section
    let windElement = document.querySelector("#windSpeed");
    let humidityElement = document.querySelector("#humidity");


    //let kilometers = convertWindSpeed(response.data.wind.speed);
    windElement.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km / h`;
    humidityElement.innerHTML = `${response.data.main.humidity} %`;
}

//function convertWindSpeed(km) {
    //return Math.round(response.data.wind.speed * 3.6);
//}
//api for Uv index
//let apiKeyUV = "64b8c55c2ce6dc6c14c598f6d9595ce3";
//let apiUrlUV="https://api.openuv.io/api/v1/uv"


    
//for the search engine
function search(city) {
    let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`  
    axios.get(apiUrl).then(showTemperature);
}

let from = document.querySelector("#search-form");

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
from.addEventListener("submit", handleSubmit);


//temperature conversion
let celciusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celciusLink = document.querySelector("#celcius-link");
fahrenheitLink.addEventListener("click", displayFTemp);
celciusLink.addEventListener("click", displayCTemp);

function displayFTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function displayCTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    temperatureElement.innerHTML = `${Math.round(celciusTemp)}°C`;

}
