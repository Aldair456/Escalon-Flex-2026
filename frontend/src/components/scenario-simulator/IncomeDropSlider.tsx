import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type IncomeDropSliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function IncomeDropSlider({ value, min, max, onChange }: IncomeDropSliderProps) {
  return (
    <View>
      <Text style={styles.value}>{Math.round(value * 100)}% menos</Text>

      <Slider
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={0.01}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.accent}
        onValueChange={onChange}
      />

      <View style={styles.range}>
        <Text style={styles.rangeLabel}>{Math.round(min * 100)}%</Text>
        <Text style={styles.rangeLabel}>{Math.round(max * 100)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  rangeLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
