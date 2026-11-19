import { MOCK_CITIES, MOCK_FORECASTS } from "./mock";

// true  = uses the fake data from mock.ts (works offline)
// false = uses the real Open-Meteo API (free, no key needed)
export const USE_MOCK = true;

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export type City = {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
};

export type ForecastResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

export type CurrentWeather = {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

export type DailyForecast = {
  date: string;
  weatherCode: number;
  max: number;
  min: number;
  rainChance: number;
};

export type Forecast = {
  current: CurrentWeather;
  days: DailyForecast[];
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(status: number): string {
  if (status === 400) return "Cidade inválida.";
  if (status === 429) return "Muitas requisições. Tente de novo em instantes.";
  return `Erro ao acessar a previsão do tempo (código ${status}).`;
}

export async function searchCities(query: string): Promise<City[]> {
  console.log("Buscando cidades:", query);

  if (USE_MOCK) {
    await wait(400);
    const text = query.toLowerCase();
    return MOCK_CITIES.filter((city) => city.name.toLowerCase().includes(text));
  }

  const response = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=20&language=pt&format=json`,
  );
  if (!response.ok) throw new Error(errorMessage(response.status));
  const data = await response.json();
  return data.results ?? [];
}

// TODO Questão 07: fill "days" using data.daily.
function toForecast(data: ForecastResponse): Forecast {
  return {
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
    },
    days: [],
  };
}

export async function fetchForecast(city: City): Promise<Forecast> {
  console.log("Carregando previsão de", city.name);

  if (USE_MOCK) {
    await wait(600);
    const data = MOCK_FORECASTS[city.id];
    if (!data) throw new Error("Previsão indisponível para esta cidade.");
    return toForecast(data);
  }

  const params = [
    `latitude=${city.latitude}`,
    `longitude=${city.longitude}`,
    "current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    "timezone=auto",
    "forecast_days=7",
  ].join("&");

  const response = await fetch(`${FORECAST_URL}?${params}`);
  if (!response.ok) throw new Error(errorMessage(response.status));
  return toForecast(await response.json());
}
