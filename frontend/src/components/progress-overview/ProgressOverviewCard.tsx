import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

import { ProgressRing } from './ProgressRing';

type ProgressOverviewCardProps = {
  progress: number;
  completed: number;
  total: number;
  levelLabel: string;
  savedAmount: string;
};

export function ProgressOverviewCard({
  progress,
  completed,
  total,
  levelLabel,
  savedAmount,
}: ProgressOverviewCardProps) {
  return (
    <View style={styles.container}>
      <ProgressRing
        progress={progress}
        label={`${Math.round(progress * 100)}%`}
        sublabel={`${completed} de ${total} cuotas`}
      />

      <View style={styles.info}>
        <Text style={styles.eyebrow}>Tu nivel</Text>
        <Text style={styles.level}>{levelLabel}</Text>
        <Text style={styles.saved}>
          Ahorrado: <Text style={styles.savedAmount}>{savedAmount}</Text>
        </Text>
        <Text style={styles.link}>Ver qué desbloqueo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.primary,
    borderRadius: radii.card,
    margin: 20,
    padding: 20,
  },
  info: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  level: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2,
    marginBottom: 10,
  },
  saved: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 10,
  },
  savedAmount: {
    fontWeight: '800',
    color: colors.white,
  },
  link: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    textDecorationLine: 'underline',
  },
});
