import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { City } from "./src/api";
import SearchScreen from "./src/modules/search/SearchScreen";
import FavoritesScreen from "./src/modules/favorites/FavoritesScreen";
import ForecastScreen from "./src/modules/forecast/ForecastScreen";
import TabBar, { type Tab } from "./src/components/TabBar";
import { colors } from "./src/theme";

export default function App() {
  const [tab, setTab] = useState<Tab>("search");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [favorites, setFavorites] = useState<City[]>([]);

  function isFavorite(city: City) {
    return favorites.some((c) => c.id === city.id);
  }
  //Questão 3
  function toggleFavorite(city: City) {
    setFavorites((prevFavorites) => {
      const index = prevFavorites.findIndex((c) => c.id === city.id);
      if(index >= 0) {
        return prevFavorites.filter((c) => c.id !== city.id);
      } else {
        return [...prevFavorites, city];
      } 
    });
  }

  const showSearch = !selectedCity && tab === "search";
  const showFavorites = !selectedCity && tab === "favorites";

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.screen, !showSearch && styles.hidden]}>
        <SearchScreen
          onSelect={setSelectedCity}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </View>
      <View style={[styles.screen, !showFavorites && styles.hidden]}>
        <FavoritesScreen
          favorites={favorites}
          onSelect={setSelectedCity}
          onRemove={toggleFavorite}
        />
      </View>

      {selectedCity ? (
        <ForecastScreen
          city={selectedCity}
          favorite={isFavorite(selectedCity)}
          onToggleFavorite={() => toggleFavorite(selectedCity)}
          onBack={() => setSelectedCity(null)}
        />
      ) : (
        <TabBar
          current={tab}
          onChange={setTab}
          favoritesCount={favorites.length}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 48 },
  screen: { flex: 1 },
  hidden: { display: "none" },
});
