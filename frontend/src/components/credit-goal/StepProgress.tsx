import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type StepProgressProps = {
  current: number;
  total: number;
};

export function StepProgress({ current, total }: StepProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Paso {current} de {total}
      </Text>

      <View style={styles.track}>
        {Array.from({ length: total }).map((_, index) => (
          <View key={index} style={[styles.segment, index < current && styles.segmentActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  track: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
});
