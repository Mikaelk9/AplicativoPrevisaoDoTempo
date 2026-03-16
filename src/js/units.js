const STORAGE_KEY = "weather_units";

function loadUnits() {

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }

}

export function saveUnits() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(units)
  );

}


/* convertTemperature  */
const savedUnits = loadUnits();

export const units = savedUnits || {
  temperature: "c",
  wind: "kmh",
  precipitation: "mm"
};

export function convertTemperature(temp) {

  if (units.temperature === "f") {
    return Math.round((temp * 9/5) + 32);
  }

  return Math.round(temp);
}

export function convertWind(speed) { 

  if (units.wind === "mph") {
    return Math.round(speed * 0.621371);
  }

  return Math.round(speed);
}

export function convertPrecipitation(mm) {

  if (units.precipitation === "inch") {
    return (mm / 25.4).toFixed(2);
  }

  return mm.toFixed(1);
}