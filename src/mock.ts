// Fake data so the app works WITHOUT internet (USE_MOCK = true in api.ts).
// The forecasts below are made up. Same format as the real Open-Meteo API.
import type { City, ForecastResponse } from "./api";

export const MOCK_CITIES: City[] = [
  {
    id: 1,
    name: "Fortaleza",
    admin1: "Ceará",
    country: "Brasil",
    latitude: -3.71722,
    longitude: -38.54306,
  },
  {
    id: 2,
    name: "Iguatu",
    admin1: "Ceará",
    country: "Brasil",
    latitude: -6.35944,
    longitude: -39.29861,
  },
  {
    id: 3,
    name: "Cedro",
    admin1: "Ceará",
    country: "Brasil",
    latitude: -6.60028,
    longitude: -39.06222,
  },
  {
    id: 4,
    name: "Cedro",
    admin1: "Pernambuco",
    country: "Brasil",
    latitude: -7.71806,
    longitude: -39.23861,
  },
  {
    id: 5,
    name: "Crato",
    admin1: "Ceará",
    country: "Brasil",
    latitude: -7.23417,
    longitude: -39.40944,
  },
  {
    id: 6,
    name: "Juazeiro do Norte",
    admin1: "Ceará",
    country: "Brasil",
    latitude: -7.21306,
    longitude: -39.31528,
  },
  {
    id: 7,
    name: "Gramado",
    admin1: "Rio Grande do Sul",
    country: "Brasil",
    latitude: -29.37889,
    longitude: -50.87389,
  },

  {
    id: 8,
    name: "Atlântida",
    country: "Cidade lendária",
    latitude: 0,
    longitude: -30,
  },
];

const WEEK = [
  "2026-11-19",
  "2026-11-20",
  "2026-11-21",
  "2026-11-22",
  "2026-11-23",
  "2026-11-24",
  "2026-11-25",
];

export const MOCK_FORECASTS: Record<number, ForecastResponse> = {
  // Fortaleza
  1: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 30.4,
      apparent_temperature: 33.6,
      relative_humidity_2m: 62,
      wind_speed_10m: 22.3,
      weather_code: 2,
    },
    daily: {
      time: WEEK,
      weather_code: [2, 1, 1, 3, 80, 2, 0],
      temperature_2m_max: [31.2, 31.0, 30.8, 30.1, 29.4, 30.6, 31.5],
      temperature_2m_min: [25.1, 25.4, 25.0, 24.8, 24.2, 24.9, 25.3],
      precipitation_probability_max: [10, 5, 5, 20, 65, 15, 0],
    },
  },
  // Iguatu
  2: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 35.8,
      apparent_temperature: 36.9,
      relative_humidity_2m: 28,
      wind_speed_10m: 14.0,
      weather_code: 0,
    },
    daily: {
      time: WEEK,
      weather_code: [0, 0, 1, 2, 0, 1, 3],
      temperature_2m_max: [37.4, 37.9, 36.8, 35.5, 37.1, 36.2, 34.9],
      temperature_2m_min: [23.2, 23.6, 23.9, 23.4, 22.8, 23.1, 23.7],
      precipitation_probability_max: [0, 0, 0, 5, 0, 0, 10],
    },
  },
  // Cedro (CE)
  3: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 34.6,
      apparent_temperature: 35.2,
      relative_humidity_2m: 31,
      wind_speed_10m: 16.5,
      weather_code: 1,
    },
    daily: {
      time: WEEK,
      weather_code: [1, 0, 0, 2, 95, 61, 2],
      temperature_2m_max: [36.1, 36.8, 36.5, 34.2, 32.0, 31.4, 34.7],
      temperature_2m_min: [22.9, 23.0, 23.4, 23.1, 22.4, 22.0, 22.6],
      precipitation_probability_max: [0, 0, 0, 15, 70, 55, 10],
    },
  },
  // Cedro (PE)
  4: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 33.1,
      apparent_temperature: 33.8,
      relative_humidity_2m: 35,
      wind_speed_10m: 12.2,
      weather_code: 3,
    },
    daily: {
      time: WEEK,
      weather_code: [3, 2, 1, 1, 0, 0, 2],
      temperature_2m_max: [34.0, 34.8, 35.3, 35.9, 36.2, 35.7, 34.4],
      temperature_2m_min: [21.8, 21.5, 21.9, 22.3, 22.6, 22.1, 21.7],
      precipitation_probability_max: [20, 10, 5, 0, 0, 0, 5],
    },
  },
  // Crato
  5: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 31.9,
      apparent_temperature: 32.4,
      relative_humidity_2m: 40,
      wind_speed_10m: 10.8,
      weather_code: 61,
    },
    daily: {
      time: WEEK,
      weather_code: [61, 80, 3, 2, 2, 1, 1],
      temperature_2m_max: [32.5, 31.1, 32.8, 33.6, 34.0, 34.4, 34.9],
      temperature_2m_min: [21.4, 21.0, 21.2, 21.7, 21.9, 22.2, 22.0],
      precipitation_probability_max: [75, 60, 25, 10, 10, 5, 5],
    },
  },
  // Juazeiro do Norte
  6: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 33.4,
      apparent_temperature: 34.1,
      relative_humidity_2m: 33,
      wind_speed_10m: 13.7,
      weather_code: 2,
    },
    daily: {
      time: WEEK,
      weather_code: [2, 3, 80, 2, 1, 0, 0],
      temperature_2m_max: [34.6, 33.2, 31.8, 33.5, 34.7, 35.3, 35.8],
      temperature_2m_min: [22.7, 22.4, 21.9, 22.1, 22.5, 22.8, 23.0],
      precipitation_probability_max: [10, 25, 60, 15, 5, 0, 0],
    },
  },
  // Gramado
  7: {
    current: {
      time: "2026-11-19T14:30",
      temperature_2m: 14.2,
      apparent_temperature: 12.6,
      relative_humidity_2m: 81,
      wind_speed_10m: 9.4,
      weather_code: 45,
    },
    daily: {
      time: WEEK,
      weather_code: [45, 3, 61, 63, 3, 2, 1],
      temperature_2m_max: [18.4, 17.2, 15.1, 13.6, 16.0, 19.3, 21.7],
      temperature_2m_min: [10.2, 11.0, 10.4, 8.9, 7.6, 9.8, 11.5],
      precipitation_probability_max: [15, 30, 80, 90, 35, 10, 5],
    },
  },
};
