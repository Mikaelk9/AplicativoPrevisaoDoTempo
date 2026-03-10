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
      const button = dropdown.querySelector('.dropdown__toggle');
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

/*dropdown_hoyrlyForecast*/
const dropdown_hoyrlyForecast = document.querySelector('.dropdown_hoyrlyForecast');
const button_hourlyForecast = dropdown_hoyrlyForecast.querySelector('.dropdown_hoyrlyForecast_button');

button_hourlyForecast.addEventListener('click', () => {
  const isOpen = dropdown_hoyrlyForecast.classList.toggle('open');
  button_hourlyForecast.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.dropdown_hoyrlyForecast').forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.button_hourlyForecast');
      button.setAttribute('aria-expanded', false);
    }
  });
});

/*dropdown_hoyrlyForecast active*/

const days = document.querySelectorAll('.dropdown_hoyrlyForecast_menu button');

days.forEach(day => {
  day.addEventListener('click', () => {

    days.forEach(d => d.classList.remove('is_active'));

    day.classList.add('is_active');

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

const form = document.querySelector(".search_form");
const inputSearch = document.querySelector("#search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = inputSearch.value.trim();

  if (!city) return;

  searchCity(city);
})

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


