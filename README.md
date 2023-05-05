Weather api app 
User Story
As a traveler, I want to easily access the weather outlook for multiple cities so that I can plan my trip accordingly.

Requirements
The application should allow the user to enter a city name or zip code in a search bar.
Upon entering a location, the application should retrieve the current and future weather conditions for that location using the OpenWeather API.
The application should display the current weather conditions for the location, including the location name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed.
The application should display a 5-day forecast that shows the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
The application should store the search history in localStorage and display it on the screen for easy access.
The user should be able to click on a location in the search history to display the current and future weather conditions for that location.
The application should handle errors gracefully, displaying an error message if the user enters an invalid city name or zip code, or if there is an issue retrieving weather data.
The application should be responsive and accessible, allowing users to easily access and use it on different devices and with different accessibility needs.
Installation
No installation is required to use this web application. Simply open the index.html file in a web browser to access the application.
Acceptance Criteria
Given a weather dashboard with form inputs
The application should have a search bar that allows users to enter a location name or zip code.
The application should have a search button that triggers a search for the entered location.
When I search for a location
The application should display the current and future weather conditions for that location.
The application should add the location to the search history.
When I view current weather conditions for that location
The application should display the location name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed.
When I view future weather conditions for that location
The application should display a 5-day forecast that shows the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
When I click on a location in the search history
The application should display the current and future weather conditions for that location.
