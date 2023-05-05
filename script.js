// Initialize variables
var apiKey = "39aa6d2ce2b8bca312184e74e988036a3";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#history-list");
var clearHistoryBtn = document.querySelector("#clear-history");
var todayWeatherEl = document.querySelector("#today");
var forecastWeatherEl = document.querySelector("#forecast");

// When the search form is submitted
function handleSearchFormSubmit(event) {
  event.preventDefault();

  // Get the search term from the input field
  var searchTerm = searchInputEl.value.trim();

  // If there is no search term, do nothing
  if (!searchTerm) {
    return;
  }

  // Get the current weather and forecast for the given city
  getCurrentWeather(searchTerm);
  getForecast(searchTerm);

  // Add the search term to the search history
  addSearchTermToHistory(searchTerm);

  // Clear the search input field
  searchInputEl.value = "";
}

// Get the current weather for the given city
function getCurrentWeather(city) {
  // Build the URL for the current weather API
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // Send a request to the current weather API
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Build the HTML for the current weather
      var todayHtml = buildTodayHtml(data);

      // Update the HTML for the current weather
      todayWeatherEl.innerHTML = todayHtml;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Get the forecast for the given city
function getForecast(city) {
  // Build the URL for the forecast API
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  // Send a request to the forecast API
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Build the HTML for the forecast
      var forecastHtml = buildForecastHtml(data);

      // Update the HTML for the forecast
      forecastWeatherEl.innerHTML = forecastHtml;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Add the given search term to the search history
function addSearchTermToHistory(searchTerm) {
  // Create a new list item for the search term
  var liEl = document.createElement("li");
  liEl.classList.add("list-group-item");
  liEl.textContent = searchTerm;

  // Add the list item to the search history
  searchHistoryEl.appendChild(liEl);

  // Save the search history to local storage
  localStorage.setItem(
    "weatherDashboardSearchHistory",
    searchHistoryEl.innerHTML
  );
}

function buildTodayHtml(data) {
  var date = dayjs(data.dt * 1000).tz(data.timezone).format("M/D/YYYY");
  var iconUrl =
    "https://openweathermap.org/img/wn/" +
    data.weather[0].icon +
    "@2x.png";
  var uvIndex = data.uvi;
  var uvIndexClass =
    uvIndex < 3
      ? "bg-success"
      : uvIndex < 7
      ? "bg-warning"
      : "bg-danger";
  var todayHtml = `
    <h2>${data.name} (${date}) <img src="${iconUrl}" alt="${data.weather[0].description}"></h2>
    <ul>
      <li>Temperature: ${data.main.temp} °F</li>
      <li>Humidity: ${data.main.humidity}%</li>
      <li>Wind Speed: ${data.wind.speed} MPH</li>
      <li>UV Index: <span class="uv-index ${uvIndexClass}">${uvIndex}</span></li>
    </ul>
  `;
  return todayHtml;
}

// Build the HTML for the forecast
function buildForecastHtml(data) {
  var forecastHtml = "";
  for (var i = 0; i < data.list.length; i++) {
    // Only show forecast data for 3:00 PM
    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
      var forecastDate = dayjs(data.list[i].dt * 1000)
        .tz(data.city.timezone)
        .format("M/D/YYYY");
      var forecastIconUrl =
        "https://openweathermap.org/img/wn/" +
        data.list[i].weather[0].icon +
        "@2x.png";
      forecastHtml += `
        <div class="col-md-2 mb-3">
          <div class="card">
            <div class="card-body p-2">
              <h5>${forecastDate}</h5>
              <img src="${forecastIconUrl}" alt="${data.list[i].weather[0].description}">
              <p>Temp: ${data.list[i].main.temp} °F</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
            </div>
          </div>
        </div>
      `;
    }
  }
  return forecastHtml;
}

// When the page loads
function init() {
  // Load the search history from local storage
  var searchHistory = localStorage.getItem("weatherDashboardSearchHistory");
  if (searchHistory) {
    searchHistoryEl.innerHTML = searchHistory;
  }

  // Add event listeners
  searchFormEl.addEventListener("submit", handleSearchFormSubmit);
  clearHistoryBtn.addEventListener("click", function () {
    searchHistoryEl.innerHTML = "";
    localStorage.removeItem("weatherDashboardSearchHistory");
  });
}

// Call the init function when the page loads
init();

