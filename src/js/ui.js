import {
  convertTemperature,
  convertWind,
  convertPrecipitation,
  units
} from "./units.js"


export function renderCurrentWeather(coords, weather) {

  const cityElement = document.querySelector(".temp h2");
  const dateElement = document.querySelector(".temp p");
  const tempElement = document.querySelector(".tempDeg");

  const feelsLikeElement = document.querySelector(".feels_like");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const precipitationElement = document.querySelector(".precipitation");

  const iconElement = document.querySelector('.temp_number img');
  const weatherCode = weather.current_weather.weathercode;
  const icon = getWeatherIcon(weatherCode)
  iconElement.src = `assets/images/${icon}`;

  cityElement.textContent = `${coords.name}, ${coords.country}`;

  const temperature = weather.current_weather.temperature;


  tempElement.textContent = `${convertTemperature(temperature)}°`;

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

  feelsLikeElement.textContent =
    `${convertTemperature(feelsLike)}°`

  humidityElement.textContent =
    `${humidity}%`;

  const wind =
    weather.current_weather.windspeed;
  const windUnit =
    units.wind === "kmh" ? "km/h" : "mph";
  windElement.textContent =
    `${convertWind(wind)} ${windUnit}`;

  const precipitation =
    weather.hourly.precipitation[0];
  const precipitationUnit =
    units.precipitation === "mm" ? "mm" : "in";
  precipitationElement.textContent =
    `${convertPrecipitation(precipitation)} ${precipitationUnit}`;

}


function getWeatherIcon(code) {

  if (code === 0) return "icon-sunny.webp";

  if (code === 1 || code === 2) return "icon-partly-cloudy.webp";

  if (code === 3) return "icon-overcast.webp";

  if (code >= 45 && code <= 48) return "icon-fog.webp";

  if (code >= 51 && code <= 57) return "icon-drizzle.webp";

  if (
    (code >= 61 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) return "icon-rain.webp";

  if (code >= 71 && code <= 77) return "icon-snow.webp";

  if (code >= 95) return "icon-storm.webp";

  return "icon-overcast.webp";
}

/* Daily forecast */
export function renderDailyForecast(weather) {

  const list = document.querySelector(".dailyForecast_list");

  list.innerHTML = "";

  const days = weather.daily.time;
  const maxTemps = weather.daily.temperature_2m_max;
  const minTemps = weather.daily.temperature_2m_min;
  const codes = weather.daily.weathercode;

  for (let i = 0; i < 7; i++) {

    const date = new Date(days[i] + "T00:00");

    const weekday =
      i === 0
        ? "Today"
        : date.toLocaleDateString("en-US", { weekday: "short" });

    const icon = getWeatherIcon(codes[i]);

    const card = document.createElement("li");

    card.classList.add("dailyForecast_card");

    card.innerHTML = `
    <h3>${weekday}</h3>
    <img src="assets/images/${icon}">
    <div class="dailyForecast_cardNumber">
      <p>${convertTemperature(maxTemps[i])}°</p>
      <p>${convertTemperature(minTemps[i])}°</p>
    </div>
  `;

    list.appendChild(card);

  }
}

/* Hourly forecast */
export function renderHourlyForecastByDay(dayData, nextDayData = []) {
  const list = document.querySelector(".hourlyForecast_list");

  list.innerHTML = "";

  const nowHour = new Date().getHours();

  let startIndex = dayData.findIndex(item => {
    const itemDate = new Date(item.time);
    const now = new Date();

    return (
      itemDate.getHours() === now.getHours() &&
      itemDate.getDate() === now.getDate()
    );
  });

  if (startIndex === -1) {
    startIndex = 0;
  }

  const today = new Date().toISOString().split("T")[0];
  const currentDay = dayData[0].time.split("T")[0];

  let slice = [];

  if (currentDay === today) {

    let startIndex = dayData.findIndex(item => {
      const itemDate = new Date(item.time);
      const now = new Date();

      return (
        itemDate.getHours() === now.getHours() &&
        itemDate.getDate() === now.getDate()
      );
    });

    if (startIndex === -1) startIndex = 0;

    slice = dayData.slice(startIndex);

    if (slice.length < 8 && nextDayData.length) {
      const missing = 8 - slice.length;
      const nextSlice = nextDayData.slice(0, missing);
      slice = slice.concat(nextSlice);
    }

    slice = slice.slice(0, 8);

  } else {

    slice = dayData.filter(item => {
      const hour = new Date(item.time).getHours();

      return hour >= 8 && hour <= 22 && hour % 2 === 0;
    }).slice(0, 8);
  }

  slice = slice.slice(0, 8);

  slice.forEach((item, index) => {
    const time = new Date(item.time);

    const isNow =
      index === 0 &&
      new Date().toISOString().split("T")[0] === item.time.split("T")[0];

    const hour = isNow
      ? "Now"
      : time.toLocaleTimeString("en-US", { hour: "numeric" });

    const icon = getWeatherIcon(item.code);

    const card = document.createElement("li");

    card.classList.add("hourlyForecast_card");

    card.innerHTML = `
      <p>
        <img src="assets/images/${icon}">
        ${hour}
      </p>
      <p>${convertTemperature(item.temp)}°</p>
    `;

    list.appendChild(card);
  });
}

export function groupHourlyByDay(hourly) {
  const grouped = {};

  const { time, temperature_2m, weathercode, precipitation } = hourly;

  for (let i = 0; i < time.length; i++) {
    const date = time[i].split("T")[0]; // "2026-03-17"

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push({
      time: time[i],
      temp: temperature_2m[i],
      code: weathercode[i],
      precipitation: precipitation[i]
    });
  }

  return grouped;
}

export function sortDays(grouped) {
  const today = new Date().toISOString().split("T")[0];

  return Object.keys(grouped).sort((a, b) => {
    if (a === today) return -1;
    if (b === today) return 1;
    return new Date(a) - new Date(b);
  });
}

export function formatDayLabel(dateStr) {
  const today = new Date().toISOString().split("T")[0];

  if (dateStr === today) return "Today";

  const date = new Date(dateStr + "T00:00");

  return date.toLocaleDateString("en-US", {
    weekday: "long"
  });
}

export function renderHourlyDropdown(days, activeDay, onSelect) {
  const menu = document.querySelector(".dropdown_hourlyForecast_menu");
  const button = document.querySelector(".dropdown_hourlyForecast_button");

  menu.innerHTML = "";

  days.forEach(day => {
    const btn = document.createElement("button");

    btn.textContent = formatDayLabel(day);

    if (day === activeDay) {
      btn.classList.add("is_active");
      button.textContent = formatDayLabel(day);
    }

    btn.addEventListener("click", () => {
      onSelect(day);
    });

    menu.appendChild(btn);
  });
}