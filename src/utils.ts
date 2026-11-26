export type TemperatureUnit = "C" | "F";

export type WeatherInfo = {
  label: string;
  emoji: string;
};

// Converts a temperature in Celsius to the chosen unit and rounds it.
// Expected examples: (30.4, "C") -> "30°" | (30.4, "F") -> "87°" | (0, "F") -> "32°"
export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
): string {
  //Questão 6
  const value = unit === "F" ? (celsius * 9)/ 5 + 32 : celsius; //
  return `${Math.round(value)}°`;
}

const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

// Formats an ISO date ("2026-11-19" or "2026-11-19T14:30") as weekday + day/month.
// Expected examples: "2026-11-19" -> "qui, 19/11" | "2026-12-31" -> "qui, 31/12"
export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = WEEKDAYS[date.getDay()];
  return `${weekday}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
}

// Turns a weather code from the API into a label and an emoji (table in orientacoes.md).
// TODO Questão 09: implement this function.
export function weatherInfo(code: number): WeatherInfo {
  return { label: "Indefinido", emoji: "🌡️" };
}
