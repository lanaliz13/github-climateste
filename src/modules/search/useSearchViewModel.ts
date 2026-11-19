import { useEffect, useState } from "react";
import { searchCities, type City } from "../../api";

const DEBOUNCE_MS = 500;

export function useSearchViewModel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const text = query.trim();
    if (text.length < 2) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const cities = await searchCities(text);
        setResults(cities);
        setError(null);
        setHasSearched(true);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
  }, [query]);

  return { query, setQuery, results, loading, error, hasSearched };
}
