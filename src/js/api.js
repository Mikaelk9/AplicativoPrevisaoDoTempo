export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results) {
    throw new Error("City not found");
  }

  return {
    name: data.results[0].name,
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
    country: data.results[0].country
  };
}

export async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const response = await fetch(url);
  return await response.json();
}