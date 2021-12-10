var searchForCity = function (cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2171ce42c13304d2fa6bfcca68ffe041`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                
                getWeather(data.coord.lat, data.coord.lon, data.name);
            }) 
        } else {
            console.log(err);
        }
    })
};

var getWeather = function (lat, lon, cityName) {
    console.log(lat, lon, cityName);

    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=2171ce42c13304d2fa6bfcca68ffe041&units=imperial`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayWeatherData(data, cityName);
                forcastDisplayData(data);
            }) 
        } else {
            console.log(err);
        }
    })
}

var displayWeatherData = function (weather, Name) {

    var currentDayEl = $("#current-day");

    currentDayEl.html(`
        <h2>${Name} ${moment().format("l")} <img src="http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png" alt="Sky"></h2>
        <ul>
            <li>
            Temp: ${weather.current.temp}\u00B0F
            </li>
            <li>
            Wind: ${weather.current.wind_speed} MPH
            </li>
            <li>
            Humidity: ${weather.current.humidity} %
            </li>
            <li>
            Uv index: ${weather.current.uvi}
            </li>
        </ul>
    `);
}

var forcastDisplayData = function (weather) {

    var weatherCardsEl = $("#weather-cards");
    var dateDisplay = moment();

    for (let i = 1; i <= 5; i++) {
        dateDisplay.add(1, 'days');

        weatherCardsEl.children(".weather-forcast").eq(i-1).html(`
            <div class="card-header text-center">${dateDisplay.format("l")}</div>
            <div class="card-body text-secondary">
                <ul>
                    <li>
                    <img src="http://openweathermap.org/img/wn/${weather.daily[i].weather[0].icon}@2x.png" alt="Sky">
                    </li>
                    <li>
                        Temp: ${weather.daily[i].temp.day}
                    </li>
                    <li>
                        Wind: ${weather.daily[i].wind_speed}
                    </li>
                    <li>
                        Humidity: ${weather.daily[i].humidity}
                    </li>   
                </ul>
            </div>
        `);
        console.log(i-1)
    }
} 

var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-city");

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var searchEl = $("input").val();
    if (searchEl) {
        searchForCity(searchEl);
    }
};

searchForCity("orlando");
$("form").on("submit", formSubmitHandler);
