let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let from = document.querySelector("#search-form");
from.addEventListener("submit", handleSubmit);

//temperature conversion
let celciusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celciusLink = document.querySelector("#celcius-link");
    let minRangeTemp = document.querySelector("#minimum")
    let maxRangeTemp = document.querySelector("#maximum")
fahrenheitLink.addEventListener("click", displayFTemp);

search("Tilburg");

//Gets the timezone from the data of the first API
//Returns datetime
function presentCurrentTime(timezone) {
 
    let now = new Date(); // Create a new (local) date object
    let time = now.getTime() + (timezone * 1000); // Get the UTC time from the (local) date object 
    // which is more accurate than from the API and we add the timezone seconds (first multiply to create milliseconds)
    let timeCalculated = new Date(time); // Now we create a new date object using the milliseconds 
    // from UTC + timezone (so the time of the target location)

   
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

//Gets dt timestamp
//Returns the day
function getForecastDay(timestamp) {
    let dayCalculated = new Date(timestamp * 1000);
    let forecastDay = dayCalculated.getUTCDay();
    return days[forecastDay];
}

//Gets coordinates and calls a newly created API, then calls showForecast
function getForecastCoords(coordinates) {
    let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

//Gets the response from the API and displays a forecast in a row
function showForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`; //Indicating to JS that we will build a grid
    let forecast = response.data.daily; 
    
        //each day will be processed through a function-which expects a day-in a loop
        //populating the variable with the content of itself and the block of code from HTML
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `              
          <div class="col-2">
            <div class="weather-forecast-description">
              <div class="weather-forecast-date">${getForecastDay(forecastDay.dt)}</div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max temps">${Math.round(forecastDay.temp.max)}</span>° / 
                <span class="weather-forecast-temperature-min temps">${Math.round(forecastDay.temp.min)}</span>°
              </div>
              <img
                src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt="weather picture"
                width="40%"
              />
            </div>
          </div>`;
    }
} );
    forecastHTML = forecastHTML+`</div>`; //closing the div the same way it started
    forecastElement.innerHTML = forecastHTML 
    
    
}

//targets elements and displays data from the API response
function showTemperature(response) {
    console.log(response.data);
    //Target top section
    let dateElement = document.querySelector("h4")
    let temperatureElement = document.querySelector("#temperature");
    let city = document.querySelector("#city");
    //let rangeTemperature = document.querySelector("#tempRange");

    let descriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let iconElement = document.querySelector("#icon");


    celciusTemp = response.data.main.temp;
    dateElement.innerHTML = presentCurrentTime(response.data.timezone);
    temperatureElement.innerHTML = `${Math.round(celciusTemp)}` ;
    city.innerHTML = response.data.name;
    //rangeTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}° / ${Math.round(response.data.main.temp_max)}°C`;
    minRangeTemp.innerHTML = Math.round(response.data.main.temp_min);
    maxRangeTemp.innerHTML = Math.round(response.data.main.temp_max);
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
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
    
//Uses the city name to call API and get data, then sends the data to function showTemp
function search(city) {
    let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`  
    axios.get(apiUrl).then(showTemperature);
}

//Activates when a request for a city has been made and gives the city name to the function search
function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

//Activates when the request for F conversion has been made, calculates and displays Fahrenheit temp
function displayFTemp(event) {
    event.preventDefault();
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let tempsElements = document.querySelectorAll(".temps");
    let denominatorElements = document.querySelectorAll(".denominator");
    
    minRangeTemp.innerHTML = `${Math.round((minRangeTemp.innerHTML * 9) / 5 + 32)}`;
    maxRangeTemp.innerHTML = `${Math.round((maxRangeTemp.innerHTML * 9) / 5 + 32)}`;

    denominatorElements.forEach(function (symbol) {
        symbol.innerHTML = "°F";
    })
    tempsElements.forEach(function (temperature) { 
        temperature.innerHTML = `${Math.round((temperature.innerHTML * 9) / 5 + 32)}`;
    })
    celciusLink.addEventListener("click", displayCTemp);
    fahrenheitLink.removeEventListener("click", displayFTemp);
}

//Activates when the request for C conversion has been made, calculates and displays Celcius temp
function displayCTemp(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    let tempsElements = document.querySelectorAll(".temps");
    let denominatorElements = document.querySelectorAll(".denominator");

    minRangeTemp.innerHTML = `${Math.round((minRangeTemp.innerHTML-32) * 5 / 9)}`;
    maxRangeTemp.innerHTML = `${Math.round((maxRangeTemp.innerHTML-32) * 5 / 9)}`;

    denominatorElements.forEach(function (symbol) {
        symbol.innerHTML = "°C";
    })
    tempsElements.forEach(function (temperature) { 
        temperature.innerHTML = `${Math.round(((temperature.innerHTML-32) * 5 / 9))}`;
    })
    fahrenheitLink.addEventListener("click", displayFTemp)
    celciusLink.removeEventListener("click", displayCTemp)
}


