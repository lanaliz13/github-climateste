import type { ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

export type Tab = "search" | "favorites";

type Props = {
  current: Tab;
  onChange: (tab: Tab) => void;
  favoritesCount: number;
};

function SearchGlyph({ color }: { color: string }) {
  return (
    <View style={styles.glyph}>
      <View style={[styles.lens, { borderColor: color }]} />
      <View style={[styles.handle, { backgroundColor: color }]} />
    </View>
  );
}

function StarGlyph({ color, filled }: { color: string; filled: boolean }) {
  return <Text style={[styles.star, { color }]}>{filled ? "★" : "☆"}</Text>;
}

function TabButton({
  label,
  active,
  badge,
  onPress,
  renderIcon,
}: {
  label: string;
  active: boolean;
  badge?: number;
  onPress: () => void;
  renderIcon: (color: string) => ReactNode;
}) {
  const color = active ? colors.primary : colors.textMuted;

  return (
    <Pressable
      style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
      onPress={onPress}
    >
      <View style={[styles.iconPill, active && styles.iconPillActive]}>
        {renderIcon(color)}
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.label, { color }, active && styles.labelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function TabBar({ current, onChange, favoritesCount }: Props) {
  return (
    <View style={styles.bar}>
      <TabButton
        label="Buscar"
        active={current === "search"}
        onPress={() => onChange("search")}
        renderIcon={(color) => <SearchGlyph color={color} />}
      />
      <TabButton
        label="Favoritas"
        active={current === "favorites"}
        badge={favoritesCount}
        onPress={() => onChange("favorites")}
        renderIcon={(color) => (
          <StarGlyph color={color} filled={current === "favorites"} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: { flex: 1, alignItems: "center", gap: 4 },
  tabPressed: { opacity: 0.6 },
  iconPill: {
    width: 64,
    height: 32,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPillActive: { backgroundColor: colors.primarySoft },
  label: { fontSize: 12, fontWeight: "500" },
  labelActive: { fontWeight: "700" },
  glyph: { width: 20, height: 20 },
  lens: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2.2,
  },
  handle: {
    position: "absolute",
    left: 13.5,
    top: 11.5,
    width: 2.4,
    height: 8,
    borderRadius: 1.2,
    transform: [{ rotate: "-45deg" }],
  },
  star: { fontSize: 22, lineHeight: 26 },
  badge: {
    position: "absolute",
    top: -2,
    right: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: colors.danger,
  },
  badgeText: { color: colors.onPrimary, fontSize: 10, fontWeight: "800" },
});
