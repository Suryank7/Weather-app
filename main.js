const apiKey = apiKey; // Use your API key
const apiUrl =
  apiUrl;

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Change weather icon based on condition
    const weatherCondition = data.weather[0].main;
    let iconSrc = "images/default.png"; // Default image
    if (weatherCondition === "Clouds") {
      iconSrc = "images/clouds.png";
    } else if (weatherCondition === "Clear") {
      iconSrc = "images/clear.png";
    } else if (weatherCondition === "Rain") {
      iconSrc = "images/rain.png";
    } else if (weatherCondition === "Drizzle") {
      iconSrc = "images/drizzle.png";
    } else if (weatherCondition === "Mist") {
      iconSrc = "images/mist.png";
    }

    weatherIcon.src = iconSrc;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error(error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Click event
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Enter key event
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
