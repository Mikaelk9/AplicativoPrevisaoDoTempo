import { renderCurrentWeather } from "./ui.js";

export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=4&language=en&format=json`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results) {
    throw new Error("City not found");
  }

  return data.results.map(city => ({
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country
  }));
}

export async function getWeather(lat, lon) {
  const url =
`https://api.open-meteo.com/v1/forecast?
latitude=${lat}&longitude=${lon}
&current_weather=true
&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation
&timezone=auto`;

  const response = await fetch(url);
  return await response.json();
}

export async function searchCity(city) {

  try {

    const cities = await getCoordinates(city);

    const coords = cities[0]; 

    const weather = await getWeather(
      coords.latitude,
      coords.longitude
    );
    
    renderCurrentWeather(coords, weather);

  } catch (error) {

    console.error(error.message);

  }

}
