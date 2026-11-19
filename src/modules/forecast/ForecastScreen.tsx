import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import type { City } from "../../api";
import DayItem from "../../components/DayItem";
import {
  formatDate,
  formatTemperature,
  weatherInfo,
  type TemperatureUnit,
} from "../../utils";
import { colors, radius, shadow } from "../../theme";
import { useForecastViewModel } from "./useForecastViewModel";

type Props = {
  city: City;
  favorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function PillButton({
  label,
  onPress,
  active = false,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pill,
        active && styles.pillActive,
        pressed && styles.pillPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function ForecastScreen({
  city,
  favorite,
  onToggleFavorite,
  onBack,
}: Props) {
  const { forecast, loading, error, weekMin, weekMax, retry } =
    useForecastViewModel(city);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando previsão...</Text>
      </View>
    );
  }

  if (error || !forecast) {
    return (
      <View style={styles.center}>
        <View style={styles.errorIcon}>
          <Text style={styles.errorIconText}>!</Text>
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.row}>
          <PillButton label="← Voltar" onPress={onBack} />
          <PillButton label="Tentar de novo" onPress={retry} />
        </View>
      </View>
    );
  }

  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const info = weatherInfo(forecast.current.weatherCode);
  const place = [city.admin1, city.country].filter(Boolean).join(" · ");

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <PillButton label="← Voltar" onPress={onBack} />
        <PillButton
          label={favorite ? "★ Favorita" : "☆ Favoritar"}
          onPress={onToggleFavorite}
          active={favorite}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.banner}>
            <View style={[styles.bubble, styles.bubbleLarge]} />
            <View style={[styles.bubble, styles.bubbleSmall]} />
            <Text style={styles.heroEmoji}>{info.emoji}</Text>
          </View>

          <View style={styles.heroBody}>
            <Text style={styles.cityName}>{city.name}</Text>
            {place ? <Text style={styles.place}>{place}</Text> : null}
            <Text style={styles.temperature}>
              {formatTemperature(forecast.current.temperature, unit)}
              <Text style={styles.temperatureUnit}>{unit}</Text>
            </Text>
            <Text style={styles.condition}>{info.label}</Text>
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                📅 {formatDate(forecast.current.time)}
              </Text>
            </View>
          </View>

          <View style={styles.stats}>
            <Stat
              label="Sensação"
              value={formatTemperature(forecast.current.feelsLike, unit)}
            />
            <View style={styles.statDivider} />
            <Stat label="Umidade" value={`${forecast.current.humidity}%`} />
            <View style={styles.statDivider} />
            <Stat
              label="Vento"
              value={`${Math.round(forecast.current.windSpeed)} km/h`}
            />
          </View>
        </View>

        <View style={styles.unitRow}>
          <Text style={styles.unitLabel}>Mostrar em °F</Text>
          <Switch
            value={unit === "F"}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>

        <Text style={styles.section}>Próximos {forecast.days.length} dias</Text>
        <Text style={styles.muted}>Mínima e máxima de cada dia</Text>

        {forecast.days.map((day, index) => (
          <DayItem
            key={day.date}
            day={day}
            unit={unit}
            isToday={index === 0}
            weekMin={weekMin}
            weekMax={weekMax}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 24,
  },
  row: { flexDirection: "row", gap: 10 },
  loadingText: { color: colors.textSecondary, fontSize: 15 },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dangerSoft,
  },
  errorIconText: { color: colors.danger, fontSize: 30, fontWeight: "800" },
  error: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pillActive: { borderColor: colors.star, backgroundColor: colors.starSoft },
  pillPressed: { backgroundColor: colors.primarySoft },
  pillText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
  pillTextActive: { color: "#B45309" },
  list: { paddingBottom: 32 },
  heroCard: {
    marginBottom: 16,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow,
  },
  banner: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderTopLeftRadius: radius.xl - 1,
    borderTopRightRadius: radius.xl - 1,
    backgroundColor: colors.primary,
  },
  bubble: {
    position: "absolute",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  bubbleLarge: { width: 180, height: 180, top: -80, right: -40 },
  bubbleSmall: { width: 96, height: 96, bottom: -48, left: 28 },
  heroEmoji: { fontSize: 56 },
  heroBody: { alignItems: "center", padding: 20 },
  cityName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  place: { fontSize: 14, color: colors.textMuted, marginTop: 2 },
  temperature: {
    fontSize: 64,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -2,
    marginTop: 8,
  },
  temperatureUnit: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0,
  },
  condition: { fontSize: 17, fontWeight: "600", color: colors.textSecondary },
  chip: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  chipText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  stats: {
    flexDirection: "row",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: 20, fontWeight: "800", color: colors.text },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  unitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  unitLabel: { fontSize: 15, fontWeight: "600", color: colors.text },
  section: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  muted: { color: colors.textMuted, fontSize: 14, marginBottom: 12 },
});
