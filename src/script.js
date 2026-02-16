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