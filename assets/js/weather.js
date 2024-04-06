var APIkey = '5b756daa2c3f8347f2ab7b391a0b28b3';
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';


var searchBtn = document.querySelector('.searchBtn');
var cityInput = document.querySelector('.cityInput');
var savedBox = document.querySelector('.saved-searches');

var weatherIcon = 'http://openweathermap.org/img/w/';

async function checkWeather(city){
   const response = await fetch(`${apiURL} + ${city} + &appid=${APIkey}`);
   var data = await response.json();


   document.querySelector('#city').innerHTML = data.name;

}

localStorage.clear();

const fiveDayAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const cardTemp = document.querySelectorAll('#forecastTemp');
const cardDate = document.querySelectorAll('#forecasedate');
const cardHumid = document.querySelectorAll('#forecastHumid');
const cardWind = document.querySelectorAll('#forecastWind');
const weathericon = document.querySelectorAll('#icon');

async function getFiveDayForecast(city) {
    const response = await fetch(`${fiveDayAPI}${city}&appid=${APIkey}`);
    const data = await response.json();
    
    for (let i = 0; i < 6; i++) {
        const date = new Date (data.list[i].dt_txt).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
        const temperature = data.list[i].main.temp; 
        const wind = data.list[i].wind.speed;
        const humidity = data.list[i].main.humidity;
        const temperatureFahrenheit = (temperature - 273.15) * 9/5 + 32; 
        const icon = data.list[i].weather[0].icon;

        cardDate[i].textContent= date;
        cardTemp[i].innerHTML = 'Temperature : ' + Math.round(temperatureFahrenheit) + '℉';
        cardWind[i].innerHTML = 'Wind: ' + wind + 'mph';
        cardHumid[i].innerHTML = 'Humidity ' + humidity + ' % ';
        weathericon[i].src = `http://openweathermap.org/img/w/${icon}.png` ;
    }
    saveSearches();
}

function saveSearches(){
    const saveCity= cityInput.value;
    var citySaved = JSON.parse(localStorage.getItem('saved')) ?? [];
    var newSave = citySaved.concat(saveCity)
    localStorage.setItem('saved', JSON.stringify(newSave));
    for (var i = 0; i < newSave.length; i++) {
        var li = document.createElement('li');
        var newButton = document.createElement("button");
        newButton.setAttribute('class', 'btn')
        newButton.setAttribute('type', 'button')
        newButton.innerHTML = newSave[i];
        li.appendChild(newButton);
        savedBox.appendChild(li);
    }

}

// function pastSearch(event){
//    
// }
     
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
    getFiveDayForecast(cityInput.value);
});







