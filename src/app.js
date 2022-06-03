function showTemperature(response) {
    console.log(response.data.main.temp);
}

let apiKey = "f3b72f65f46b84b8e79b5ce613a7a232";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`



axios.get(apiUrl).then(showTemperature);