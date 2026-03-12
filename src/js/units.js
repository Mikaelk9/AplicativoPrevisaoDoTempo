/* convertTemperature  */

export const units = {
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