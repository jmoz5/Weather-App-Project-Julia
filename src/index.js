function DateFormat() {
    let realTime = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    function formatDay(timestamp){
      let date= new Date(timestamp *1000);
      let day = date.getDay();
      let days =[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
      return days[day];
    }
  
    let months = [
      "January",
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
      "December"
    ];
  
    let date = realTime.getDate();
    let year = realTime.getFullYear();
    let day = days[realTime.getDay()];
    let month = months[realTime.getMonth()];
    let hour = realTime.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minute = realTime.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
  
    let time = `${day}, ${month} ${date}, ${year}, ${hour}:${minute}`;
    return time;
  }
  
  //Update Time & Date
  let updateTime = document.querySelector("#datetime");
  updateTime.innerHTML = `${DateFormat()}`;
  
  let celsiusTemperature =null;

  //get city name
  let city = document.querySelector("#search-form");
  city.addEventListener("submit", cityName);
  
  //Replace city name with city entered in search bar
  function cityName(event) {
    event.preventDefault();
    let city = document.querySelector(".city");
    let Search = document.querySelector("#search");
    handleCity(Search.value);
  }
  //get current location
  function getCurrentLocation(position) {
    position.preventDefault();
    navigator.geolocation.getCurrentPosition(currentLocation);
  }
  
  function handleCity(city) {
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  //weather for current location
  function currentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  //click button "current"
  let currentButton = document.querySelector("#currentSpot");
  currentButton.addEventListener("click", getCurrentLocation);

  let iconElement=document.querySelector("#icon");
  
  function displayForecast(response){
    let forecast =response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
     `<div class="col">
     <div class="Days">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="100"
      />
      <div class="weather-forecast-temperatures">
        <br>
      ${Math.round(forecastDay.temp.min)}° / ${math.round(forecastDay.temp.max)}°;
      <div class="weather">
          Snowing
      </div>`;
    });

    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

  // show temperature of city
  function showTemperature(response) {
    celsiusTemperature = Math.round(response.data.main.temp);
    let CityTemperature = Math.round(celsiusTemperature);
    let todayTemp = document.querySelector("#current-temp");
    todayTemp.innerHTML = `${CityTemperature}°`;
    let city = document.querySelector("#city");
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    document.querySelector(".description").innerHTML = response.data.weather[0].description;
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#windspeed").innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    document.querySelector("#feels-like").innerHTML = `${Math.round(response.data.main.feels_like)}ºC `;
    getForecast(response.data.coord);
  }

  //show current city name
  function showLocation(city) {
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }

  handleCity("Berlin");

  //Calculate Fahrenheit temperature
  function showFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature=Math.round((celsiusTemperature*9)/5+32);
    let temperatureElement=document.querySelector("#current-temp");
    temperatureElement.innerHTML =(`${fahrenheitTemperature}°`);
  }

    //Show celsius temperature
    function showCelsiusTemperature(event){
      event.preventDefault();
      let temperatureElement=document.querySelector("#current-temp");
      temperatureElement.innerHTML=`${celsiusTemperature}°`;
    }


 //When Fahrenheit button clicked,  Fahrenheit value shown
  let fahrenheitLink = document.querySelector(".fahrenheit");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

   //When Celsius button clicked,  Fahrenheit value shown
   let celsiusLink = document.querySelector(".celsius");
   celsiusLink.addEventListener("click", showCelsiusTemperature);