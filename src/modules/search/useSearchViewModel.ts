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
    //Questão 1
    //criação de um timer para debouncing, que aguarda 500ms antes
    // de realizar a busca e clearTimeout para limpar o timer caso o usuário continue digitando
    const timer = setTimeout(async () => { //para mudar o estado de loading para true, e depois de 500ms, realiza a busca
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
    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, loading, error, hasSearched };
}
