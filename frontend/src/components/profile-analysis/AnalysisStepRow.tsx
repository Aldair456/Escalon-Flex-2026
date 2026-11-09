import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

import type { AnalysisStep } from './analysisSteps.data';

type AnalysisStepRowProps = {
  step: AnalysisStep;
};

export function AnalysisStepRow({ step }: AnalysisStepRowProps) {
  const done = step.status === 'done';

  return (
    <View style={styles.container}>
      <View style={[styles.statusCircle, done && styles.statusCircleDone]}>
        {done ? (
          <Ionicons name="checkmark" size={18} color={colors.white} />
        ) : (
          <ActivityIndicator size="small" color={colors.textMuted} />
        )}
      </View>

      <Text style={styles.label}>{step.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 16,
    marginBottom: 12,
    ...shadows.card,
  },
  statusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCircleDone: {
    backgroundColor: colors.accent,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
