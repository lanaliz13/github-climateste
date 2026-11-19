import { View, Text, FlatList, StyleSheet } from "react-native";
import type { City } from "../../api";
import CityCard from "../../components/CityCard";
import EmptyState from "../../components/EmptyState";
import { colors } from "../../theme";
import { useFavoritesViewModel } from "./useFavoritesViewModel";

type Props = {
  favorites: City[];
  onSelect: (city: City) => void;
  onRemove: (city: City) => void;
};

export default function FavoritesScreen({
  favorites,
  onSelect,
  onRemove,
}: Props) {
  const { confirmRemove } = useFavoritesViewModel(onRemove);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>SUAS CIDADES</Text>
        <Text style={styles.title}>Favoritas</Text>
        <Text style={styles.subtitle}>
          Toque em uma cidade para ver a previsão.
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CityCard
            city={item}
            favorite
            onPress={() => onSelect(item)}
            onToggleFavorite={() => confirmRemove(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="☆"
            title="Nenhuma cidade favorita ainda."
            hint="Na busca, toque na ☆ de uma cidade para guardá-la aqui."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginTop: 8, marginBottom: 20 },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 6,
  },
  list: { paddingBottom: 32 },
});
