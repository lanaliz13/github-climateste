import { Pressable, View, Text, StyleSheet } from "react-native";
import type { City } from "../api";
import { colors, radius, shadow } from "../theme";

type Props = {
  city: City;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function CityCard({
  city,
  favorite,
  onPress,
  onToggleFavorite,
}: Props) {
  const place = [city.admin1, city.country].filter(Boolean).join(" · ");

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.pin}>
        <Text style={styles.pinText}>📍</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {city.name}
        </Text>
        {place ? (
          <Text style={styles.place} numberOfLines={1}>
            {place}
          </Text>
        ) : null}
      </View>
      <Pressable
        hitSlop={10}
        onPress={onToggleFavorite}
        style={({ pressed }) => [
          styles.starButton,
          favorite && styles.starButtonActive,
          pressed && styles.starButtonPressed,
        ]}
      >
        <Text style={[styles.star, favorite && styles.starActive]}>
          {favorite ? "★" : "☆"}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    marginBottom: 10,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  cardPressed: { transform: [{ scale: 0.98 }], borderColor: colors.primary },
  pin: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  pinText: { fontSize: 22 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  place: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  starButtonActive: {
    borderColor: colors.star,
    backgroundColor: colors.starSoft,
  },
  starButtonPressed: { transform: [{ scale: 0.9 }] },
  star: { fontSize: 20, lineHeight: 24, color: colors.placeholder },
  starActive: { color: colors.star },
});
