export function renderCurrentWeather(coords, weather){

    const cityElement = document.querySelector(".temp h2");
    const dateElement = document.querySelector(".temp p");
    const tempElement = document.querySelector(".tempDeg");

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

}