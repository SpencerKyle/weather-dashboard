//universals
var userFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-input');
var weatherMainEl = document.querySelector('#weather-main');

var getCityInfo = function(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=c76096fafe8cde85ece92131d9372eb5';

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data.main.temp);
                    displayWeather(data,);
                });
            } else {
                alert('error u suk at city');
            }
        })
};

var displayWeather = function(data) {
    var cityName = data.main.temp;

    var cityTempEl = document.createElement('div');

    var titleEl = document.createElement('span');
    titleEl.textContent = cityName;

    cityTempEl.appendChild(titleEl);

    weatherMainEl.appendChild(cityTempEl);
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    
    if (city) {
        getCityInfo(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};


userFormEl.addEventListener("submit", formSubmitHandler);

document.querySelector('#city-btn').addEventListener("click", function(event) {
    console.log("button clicked");
});

// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=40.5725&lon=-111.859722&exclude=hourly,daily&units=imperial&appid=c76096fafe8cde85ece92131d9372eb5')
//     .then(response => response.json())
//     .then(data => console.log(data));

// fetch('https://api.openweathermap.org/data/2.5/weather?q=Sandy&units=imperial&appid=c76096fafe8cde85ece92131d9372eb5')
//     .then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });
