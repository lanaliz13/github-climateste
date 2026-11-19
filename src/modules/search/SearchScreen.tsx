import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import type { City } from "../../api";
import CityCard from "../../components/CityCard";
import EmptyState from "../../components/EmptyState";
import { colors, radius, shadow } from "../../theme";
import { useSearchViewModel } from "./useSearchViewModel";

type Props = {
  onSelect: (city: City) => void;
  isFavorite: (city: City) => boolean;
  onToggleFavorite: (city: City) => void;
};

function SearchIcon() {
  return (
    <View style={styles.icon}>
      <View style={styles.iconLens} />
      <View style={styles.iconHandle} />
    </View>
  );
}

export default function SearchScreen({
  onSelect,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const { query, setQuery, results, loading, error, hasSearched } =
    useSearchViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PREVISÃO DO TEMPO</Text>
        <Text style={styles.title}>Clima Agora</Text>
        <Text style={styles.subtitle}>
          Busque uma cidade e veja a previsão dos próximos 7 dias.
        </Text>
      </View>

      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          placeholder="Digite uma cidade"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
        {loading ? (
          <ActivityIndicator color={colors.primary} style={styles.spinner} />
        ) : null}
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CityCard
            city={item}
            favorite={isFavorite(item)}
            onPress={() => onSelect(item)}
            onToggleFavorite={() => onToggleFavorite(item)}
          />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? undefined : hasSearched ? (
            <EmptyState
              icon="🗺️"
              title="Nenhuma cidade encontrada."
              hint="Confira se o nome está escrito certo."
            />
          ) : (
            <EmptyState
              icon="🌦️"
              title="Para onde você quer olhar o céu?"
              hint="Digite pelo menos 2 letras para buscar."
            />
          )
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow,
  },
  input: { flex: 1, alignSelf: "stretch", fontSize: 16, color: colors.text },
  spinner: { marginLeft: 4 },
  icon: { width: 18, height: 18 },
  iconLens: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.textMuted,
  },
  iconHandle: {
    position: "absolute",
    left: 12,
    top: 10,
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: colors.textMuted,
    transform: [{ rotate: "-45deg" }],
  },
  errorBox: {
    padding: 12,
    marginBottom: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerSoft,
  },
  errorText: { color: colors.danger, fontSize: 14, fontWeight: "500" },
  list: { paddingBottom: 32 },
});
