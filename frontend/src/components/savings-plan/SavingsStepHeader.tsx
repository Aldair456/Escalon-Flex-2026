import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

type SavingsStepHeaderProps = {
  title: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
};

export function SavingsStepHeader({ title, step, totalSteps, onBack }: SavingsStepHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.topRow}>
        <Pressable onPress={onBack ?? (() => router.back())} hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.stepLabel}>
          {step} de {totalSteps}
        </Text>
      </View>

      <View style={styles.track}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={[styles.segment, index < step && styles.segmentActive]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  stepLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 44,
    textAlign: 'right',
  },
  track: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
});
