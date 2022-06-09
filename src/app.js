function presentCurrentTime(timezone) {

    let now = new Date(); // Create a new (local) date object
    let time = now.getTime() + (timezone * 1000); // Get the UTC time from the (local) date object 
    // which is more accurate than from the API and we add the timezone seconds (first multiply to create milliseconds)
    let timeCalculated = new Date(time); // Now we create a new date object using the milliseconds 
    // from UTC + timezone (so the time of the target location)

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
    
    let day = days[timeCalculated.getUTCDay()];
    let currentDate = timeCalculated.getUTCDate();
    let currentMonth = month[timeCalculated.getUTCMonth()];
    let hours = timeCalculated.getUTCHours();
    let minutes = timeCalculated.getUTCMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day}, ${currentDate} ${currentMonth}, ${hours}:${minutes}`;

} 

function getForecastCoords(coordinates) {
    
    let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`; //Indicating to JS that we will build a grid
    let days = [ "THU", "FRI", "SAT", "SUN"]; 

    //each day will be processed through a function-which expects a day-in a loop
    //populating the variable with the content of itself and the block of code from HTML
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `                  
          <div class="col-2">
            <div class="weather-forecast-description">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> 22° / </span>
                <span class="weather-forecast-temperature-min"> 11° </span>
              </div>
              <img
                src="https://openweathermap.org/img/wn/02d@2x.png"
                alt="weather picture"
                width="40%"
              />
            </div>
          </div>`;
    });
    
    forecastHTML = forecastHTML+`</div>`; //closing the div the same way it started
    forecastElement.innerHTML = forecastHTML    
    console.log(response.data.daily);
}
  
function showTemperature(response) {
    console.log(response.data);
    //Target top section
    let dateElement = document.querySelector("h4")
    let temperatureElement = document.querySelector("#temperature");
    let city = document.querySelector("#city");
    let rangeTemperature = document.querySelector("#tempRange");
    let descriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let iconElement = document.querySelector("#icon");


    celciusTemp = response.data.main.temp;
    dateElement.innerHTML = presentCurrentTime(response.data.timezone);
    temperatureElement.innerHTML = `${Math.round(celciusTemp)}°C`;
    city.innerHTML = response.data.name;
    rangeTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}° / ${Math.round(response.data.main.temp_max)}°C`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecastCoords(response.data.coord);

    //Target middle section
    let windElement = document.querySelector("#windSpeed"); //Wind speed
    let humidityElement = document.querySelector("#humidity"); //Humidity
    let windForce = document.querySelector("#wind-force-description"); //Wind description


    //Convert Wind Speed and Indicate Wind Force
    let windSpeedKmh = Math.round(response.data.wind.speed * 3.6);
    windElement.innerHTML = `${windSpeedKmh} km/h`;
    humidityElement.innerHTML = `${response.data.main.humidity} %`;

    if (windSpeedKmh > 0 && windSpeedKmh <= 5) {
        windForce.innerHTML = "Light Air";
    } else if (windSpeedKmh > 5   && windSpeedKmh <= 11) {
        windForce.innerHTML = "Light Breeze";
    } else if (windSpeedKmh > 11  && windSpeedKmh <= 19) {
        windForce.innerHTML = "Gentle Breeze";
    } else if (windSpeedKmh > 19  && windSpeedKmh <= 28) {
        windForce.innerHTML = "Moderate Breeze";
    } else if (windSpeedKmh > 28  && windSpeedKmh <= 37) {
        windForce.innerHTML = "Fresh Breeze";
    } else if (windSpeedKmh > 37  && windSpeedKmh <= 49) {
        windForce.innerHTML = "Strong Breeze";
    } else if (windSpeedKmh > 49  && windSpeedKmh <= 61) {
        windForce.innerHTML = "Near Gale";
    } else if (windSpeedKmh > 61  && windSpeedKmh <= 74) {
        windForce.innerHTML = "Gale";
    } else if (windSpeedKmh > 74  && windSpeedKmh <= 88) {
        windForce.innerHTML = "Strong Gale";
    } else if (windSpeedKmh > 88  && windSpeedKmh <= 102) {
        windForce.innerHTML = "Storm";
    } else if (windSpeedKmh > 102 && windSpeedKmh <= 117) {
        windForce.innerHTML = "Violent Storm";
    } else if (windSpeedKmh > 117) {
        windForce.innerHTML = "Hurricane";
    }


}




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