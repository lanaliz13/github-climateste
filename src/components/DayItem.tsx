import { View, Text, StyleSheet } from "react-native";
import type { DailyForecast } from "../api";
import {
  formatDate,
  formatTemperature,
  weatherInfo,
  type TemperatureUnit,
} from "../utils";
import { colors, radius, shadow } from "../theme";

type Props = {
  day: DailyForecast;
  unit: TemperatureUnit;
  isToday: boolean;
  weekMin: number;
  weekMax: number;
};

// TODO Questão 08: implement this component.
export default function DayItem({
  day,
  unit,
  isToday,
  weekMin,
  weekMax,
}: Props) {
  return null;
}

const styles = StyleSheet.create({});
