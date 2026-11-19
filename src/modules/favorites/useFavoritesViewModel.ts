import type { City } from "../../api";

export function useFavoritesViewModel(onRemove: (city: City) => void) {
  // TODO Questão 10: ask for confirmation before removing.
  function confirmRemove(city: City) {
    onRemove(city);
  }

  return { confirmRemove };
}
