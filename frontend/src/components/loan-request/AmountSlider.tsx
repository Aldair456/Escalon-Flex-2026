import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/theme/colors';

type AmountSliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function AmountSlider({ value, min, max, step = 50, onChange }: AmountSliderProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const commitInputValue = () => {
    const parsed = Number(inputValue.replace(/[^0-9]/g, ''));

    if (!inputValue || Number.isNaN(parsed)) {
      setInputValue(String(value));
      return;
    }

    const clamped = Math.min(max, Math.max(min, parsed));
    setInputValue(String(clamped));
    onChange(clamped);
  };

  return (
    <View>
      <View style={styles.amountRow}>
        <Text style={styles.currency}>S/</Text>
        <TextInput
          style={styles.amountInput}
          value={inputValue}
          onChangeText={setInputValue}
          onBlur={commitInputValue}
          onSubmitEditing={commitInputValue}
          keyboardType="number-pad"
          maxLength={6}
          returnKeyType="done"
        />
      </View>

      <Slider
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.accent}
        onValueChange={onChange}
      />

      <View style={styles.range}>
        <Text style={styles.rangeLabel}>S/ {min.toLocaleString('es-PE')}</Text>
        <Text style={styles.rangeLabel}>S/ {max.toLocaleString('es-PE')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
  },
  currency: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 90,
    textAlign: 'center',
    padding: 0,
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
