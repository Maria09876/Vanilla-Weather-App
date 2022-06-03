function showTemperature(response) {
    console.log(response.data);
    //data and variables from the top section
    let temperatureElement = document.querySelector("#temperature");
    let city = document.querySelector("h1");
    let rangeTemperature = document.querySelector("#tempRange");
    let descriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feelsLike");

    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    city.innerHTML = response.data.name;
    rangeTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}° / ${Math.round(response.data.main.temp_max)}°C`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

}

let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`

//api for Uv index
//let apiKeyUV = "64b8c55c2ce6dc6c14c598f6d9595ce3";
//let apiUrlUV="https://api.openuv.io/api/v1/uv"

axios.get(apiUrl).then(showTemperature);

