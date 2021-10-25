cityIdCounter = 0;
//universals
var userFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-input');
var weatherMainEl = document.querySelector('#weather-main');
var historyEl = document.querySelector("#history");
var historyClickEl = document.querySelector(".historyItem");
//create array to hold cities for saving
var cities = [];

//form stuff
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);
    } else {
        alert("Please enter a city");
        return false;
    }
};

var getCityInfo = function(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=c76096fafe8cde85ece92131d9372eb5';
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var cityDataObj = {
                        name: city,
                        temp: data.main.temp,
                        desc: data.weather[0].description,
                        humidity: data.main.humidity,
                        wind: data.wind.speed,
                    };
                    displayWeather(cityDataObj);
                });
            } else {
                alert('Please enter a valid city.');
            }
        })
};


var displayWeather = function(cityDataObj) {

    var cityTemp = parseInt(cityDataObj.temp);
    var cityCondition = (cityDataObj.desc);
    var cityHumidity = (cityDataObj.humidity);
    var cityWind = (cityDataObj.wind);

    //create degree div and append to container
    var weatherInfoEl = document.createElement('ul');
    weatherInfoEl.classList.add("no-bullet")
    //icon handler
    var cityIconEl = document.createElement('i');
    cityIconEl.classList.add("bi-brightness-high");
    weatherInfoEl.appendChild(cityIconEl);
    //city name handler
    var cityNameEl = document.createElement('li');
    cityNameEl.textContent = cityDataObj.name;
    weatherInfoEl.appendChild(cityNameEl);
    //city temp handler
    var cityTempEl = document.createElement('li');
    cityTempEl.textContent = 'Temp: ' + cityTemp + '\u00B0' + 'F';
    weatherInfoEl.appendChild(cityTempEl);
    //city desc handler
    cityCondition[0].toUpperCase();
    var cityDescEl = document.createElement('li');
    cityDescEl.textContent = cityCondition;
    weatherInfoEl.appendChild(cityDescEl);
    //humid handler
    var cityHumidityEl = document.createElement('li');
    cityHumidityEl.textContent = 'Humidity: ' + cityHumidity;
    weatherInfoEl.appendChild(cityHumidityEl);
    //wind speed handler
    var cityWindEl = document.createElement('li');
    cityWindEl.textContent = 'Wind Speed: ' + cityWind + 'mph';
    weatherInfoEl.appendChild(cityWindEl);
    //append all to container
    weatherMainEl.appendChild(weatherInfoEl);

    cityDataObj.id = cityIdCounter;
    
    cities.push(cityDataObj);
   
    addHistory(cityDataObj);
    saveData();

    cityIdCounter++;

    cityInputEl.value = "";
};

// var displayWeather = function(data, city) {
//     //
//     var cityTemp = parseInt(data.main.temp);
//     var cityCondition = (data.weather[0].description);
//     var cityHumidity = (data.main.humidity);
//     var cityWind = (data.wind.speed);

//     //create degree div and append to container
//     var weatherInfoEl = document.createElement('ul');
//     weatherInfoEl.classList.add("no-bullet")
//     //icon handler
//     var cityIconEl = document.createElement('i');
//     cityIconEl.classList.add("bi-brightness-high");
//     weatherInfoEl.appendChild(cityIconEl);
//     //city name handler
//     var cityNameEl = document.createElement('li');
//     cityNameEl.textContent = city;
//     weatherInfoEl.appendChild(cityNameEl);
//     //city temp handler
//     var cityTempEl = document.createElement('li');
//     cityTempEl.textContent = 'Temp: ' + cityTemp + '\u00B0' + 'F';
//     weatherInfoEl.appendChild(cityTempEl);
//     //city desc handler
//     cityCondition[0].toUpperCase();
//     var cityDescEl = document.createElement('li');
//     cityDescEl.textContent = cityCondition;
//     weatherInfoEl.appendChild(cityDescEl);
//     //humid handler
//     var cityHumidityEl = document.createElement('li');
//     cityHumidityEl.textContent = 'Humidity: ' + cityHumidity;
//     weatherInfoEl.appendChild(cityHumidityEl);
//     //wind speed handler
//     var cityWindEl = document.createElement('li');
//     cityWindEl.textContent = 'Wind Speed: ' + cityWind + 'mph';
//     weatherInfoEl.appendChild(cityWindEl);
//     //append all to container
//     weatherMainEl.appendChild(weatherInfoEl);

//     cities.push()
//     saveData(data);

//     cityInputEl.value = "";
// };

var addHistory = function(cityDataObj) {
    var cityName = document.createElement('li');
    cityName.classList.add('historyItem');
    cityName.textContent = cityDataObj.name;
    historyEl.appendChild(cityName);
}

var saveData = function() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

var loadData = function() {
    var savedData = localStorage.getItem("cities");

    savedData = JSON.parse(savedData);

    for (var i = 0; i < savedData.length; i++) {
        addHistory(savedData[i]);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
loadData();