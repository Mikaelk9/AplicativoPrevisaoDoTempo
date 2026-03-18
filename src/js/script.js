/*dropdown_units*/
const dropdown_units = document.querySelector('.dropdown_units');
const button = dropdown_units.querySelector('.dropdown_toggle');

button.addEventListener('click', () => {
  const isOpen = dropdown_units.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.dropdown_units').forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.dropdown_toggle');
      button.setAttribute('aria-expanded', false);
    }
  });
});

/*dropdown_units active*/
function setupActiveButtons(selector) {

  const buttons = document.querySelectorAll(selector);

  buttons.forEach(button => {
    button.addEventListener('click', () => {

      buttons.forEach(btn => {
        btn.classList.remove('is_active');
      });

      button.classList.add('is_active');

    });
  });

}

setupActiveButtons('.dropdown_menu_units_temperature button');
setupActiveButtons('.dropdown_menu_units_windSpeed button');
setupActiveButtons('.dropdown_menu_units_precipitation button');


/*--------------------------------------------*/

/*dropdown_hourlyForecast*/
const dropdown_hourlyForecast = document.querySelector('.dropdown_hourlyForecast');
const button_hourlyForecast = dropdown_hourlyForecast.querySelector('.dropdown_hourlyForecast_button');

button_hourlyForecast.addEventListener('click', () => {
  const isOpen = dropdown_hourlyForecast.classList.toggle('open');
  button_hourlyForecast.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.dropdown_hourlyForecast').forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.dropdown_hourlyForecast_button');
      button.setAttribute('aria-expanded', false);
    }
  });
});


/*--------------------------------------------*/

/*search_dropdown*/
const input = document.querySelector('#search');
const dropdown = document.querySelector('.search_dropdown');
const searchBox = document.querySelector('.search_box');

input.addEventListener('focus', () => {
  dropdown.classList.remove('hidden');
});

document.addEventListener('click', (event) => {
  if (!searchBox.contains(event.target)) {
    dropdown.classList.add('hidden');
  }
});

dropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    input.value = e.target.textContent;
    dropdown.classList.add('hidden');
  }
});



/*api*/
import { getCoordinates, getWeather, searchCity } from "./api.js";

import {
  groupHourlyByDay,
  sortDays,
  renderHourlyDropdown,
  renderHourlyForecastByDay
} from "./ui.js";

let hourlyGrouped = null;
let selectedDay = null;


/* Submit */
const form = document.querySelector(".search_form");
const inputSearch = document.querySelector("#search");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const city = inputSearch.value.trim();

  if (!city) return;

  hideError();
  showLoading();

  try {

    const { coords, weather } = await searchCity(city);

    lastCoords = coords;
    lastWeather = weather;

    updateWeatherUI();

  } catch (error) {

    showError();

  } finally {

    hideLoading();

  }

});


/*City Suggestions */
export function renderCitySuggestions(cities) {

  const dropdown = document.querySelector(".search_dropdown");

  dropdown.innerHTML = "";

  if (!cities.length) {
    dropdown.classList.add("hidden");
    return;
  }

  dropdown.classList.remove("hidden");

  cities.forEach(city => {

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = `${city.name}, ${city.country}`;

    dropdown.appendChild(button);

  });

}

let timeout;

input.addEventListener("input", () => {

  clearTimeout(timeout);

  timeout = setTimeout(async () => {

    const city = input.value.trim();

    if (city.length < 2) {
      renderCitySuggestions([]);
      return;
    }

    try {

      const cities = await getCoordinates(city);

      renderCitySuggestions(cities);

    } catch { }

  }, 200);

});

import {
  renderCurrentWeather,
  renderDailyForecast,
} from "./ui.js";


/* Saved Units */
import { units, saveUnits } from "./units.js";

function applySavedUnits() {

  document.querySelectorAll("[data-unit]").forEach(button => {

    const unit = button.dataset.unit;

    if (
      unit === units.temperature ||
      unit === units.wind ||
      unit === units.precipitation
    ) {
      button.classList.add("is_active");
    } else {
      button.classList.remove("is_active");
    }

  });

}

applySavedUnits();

let lastCoords = null;
let lastWeather = null;


function updateWeatherUI() {
  if (!lastWeather || !lastCoords) return;

  renderCurrentWeather(lastCoords, lastWeather);
  renderDailyForecast(lastWeather);

  hourlyGrouped = groupHourlyByDay(lastWeather.hourly);

  const days = sortDays(hourlyGrouped);

  if (!selectedDay || !hourlyGrouped[selectedDay]) {
    selectedDay = days[0];
  }

  renderHourlyDropdown(days, selectedDay, handleDayChange);

  const currentIndex = days.indexOf(selectedDay);
  const nextDay = days[currentIndex + 1];

  renderHourlyForecastByDay(
    hourlyGrouped[selectedDay],
    hourlyGrouped[nextDay] || []
  );
}

function handleDayChange(day) {
  selectedDay = day;

  const days = sortDays(hourlyGrouped);
  const currentIndex = days.indexOf(day);

  const nextDay = days[currentIndex + 1];

  renderHourlyDropdown(days, selectedDay, handleDayChange);

  renderHourlyForecastByDay(
    hourlyGrouped[selectedDay],
    hourlyGrouped[nextDay] || []
  );
}


/* Botões units */
document.querySelectorAll("[data-unit]").forEach(button => {

  button.addEventListener("click", () => {

    const unit = button.dataset.unit;

    const container = button.closest("div");

    if (container.classList.contains("dropdown_menu_units_temperature")) {
      units.temperature = unit;
    }

    if (container.classList.contains("dropdown_menu_units_windSpeed")) {
      units.wind = unit;
    }

    if (container.classList.contains("dropdown_menu_units_precipitation")) {
      units.precipitation = unit;
    }

    saveUnits();

    updateWeatherUI();

  });

});

/*Loader */
const errorState = document.querySelector(".error_state");
const minLeft = document.querySelector(".minLeft");
const hourlyForecast = document.querySelector(".hourlyForecast");
const tempCard = document.querySelector(".temp");
const retryButton = document.querySelector(".retry_button");
const header = document.querySelector("header");
const search = document.querySelector(".search");

function showLoading() {
  tempCard.classList.add("is_loading");
}

function hideLoading() {
  tempCard.classList.remove("is_loading");
}

function showError() {

  errorState.classList.remove("hidden");

  minLeft.classList.add("hidden");
  hourlyForecast.classList.add("hidden");
  header.classList.add("hidden");
  search.classList.add("hidden");

}

function hideError() {

  errorState.classList.add("hidden");

  minLeft.classList.remove("hidden");
  hourlyForecast.classList.remove("hidden");
  header.classList.remove("hidden");
  search.classList.remove("hidden");
}

retryButton.addEventListener("click", async () => {

  if (!lastCoords) {


    hideError();

    return;
  }

  hideError();
  showLoading();

  try {

    const weather = await getWeatherByCoords(lastCoords);

    lastWeather = weather;

    updateWeatherUI();

  } catch (error) {

    showError();

  } finally {

    hideLoading();

  }

});
