export function renderCurrentWeather(coords, weather) {

    const cityElement = document.querySelector(".temp h2");
    const dateElement = document.querySelector(".temp p");
    const tempElement = document.querySelector(".tempDeg");

    const feelsLikeElement = document.querySelector(".feels_like");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const precipitationElement = document.querySelector(".precipitation");

    cityElement.textContent = `${coords.name}, ${coords.country}`;

    const temperature = weather.current_weather.temperature;

    tempElement.textContent = `${Math.round(temperature)}°`;

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
        });


    const feelsLike =
        weather.hourly.apparent_temperature[0];

    const humidity =
        weather.hourly.relative_humidity_2m[0];

    const precipitation =
        weather.hourly.precipitation[0];

    const wind =
        weather.current_weather.windspeed;

    feelsLikeElement.textContent =
        `${Math.round(feelsLike)}°`;

    humidityElement.textContent =
        `${humidity}%`;

    windElement.textContent =
        `${wind} km/h`;

    precipitationElement.textContent =
        `${precipitation} mm`;
}