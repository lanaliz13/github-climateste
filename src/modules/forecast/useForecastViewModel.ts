import { useEffect, useState } from "react";
import { fetchForecast, type City, type Forecast } from "../../api";

export function useForecastViewModel(city: City) {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setForecast(await fetchForecast(city));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [city.id]);

  const days = forecast ? forecast.days : [];
  const weekMin = Math.min(...days.map((day) => day.min));
  const weekMax = Math.max(...days.map((day) => day.max));

  return { forecast, loading, error, weekMin, weekMax, retry: load };
}
