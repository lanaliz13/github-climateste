import { View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

type Props = {
  icon: string;
  title: string;
  hint?: string;
};

export default function EmptyState({ icon, title, hint }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
  },
  icon: { fontSize: 32, marginBottom: 4 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: "center",
  },
});
