// Define constants
const apiKey = 'a7699e1428af300106018b453f0b4444'; // Replace with your OpenWeather API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input"); // Input element
const searchBtn = document.querySelector(".search button"); // Button element
const weatherIcon = document.querySelector(".weather-icon"); // Icon element

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error("Weather data not found");
    
    const data = await response.json();
    console.log(data);

    // Display weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".Temperature").innerHTML = `${Math.round(data.main.temp)} °C`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} m/s`;
    document.querySelector(".descpt").innerHTML = data.weather[0].description;
    document.querySelector(".Humidity").innerHTML = `${data.main.humidity}%`;

    // Display the appropriate weather icon
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Display the weather result section
    document.querySelector(".weather").style.display = "block";

  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").innerHTML = "Error fetching weather data";
  }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
