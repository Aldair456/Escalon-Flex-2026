import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

type StreakCardProps = {
  streak: number;
  nextDueDate?: string;
  onPress?: () => void;
};

export function StreakCard({ streak, nextDueDate, onPress }: StreakCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress} disabled={!onPress}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Ionicons name="flame" size={28} color="#F97316" />
        </View>

        <View style={styles.divider} />

        <Text style={styles.streakText}>
          <Text style={styles.streakNumber}>{streak}</Text> pagos seguidos a tiempo
        </Text>

        {onPress && <Ionicons name="chevron-forward" size={20} color={colors.primary} />}
      </View>

      {nextDueDate && (
        <View style={styles.warningStrip}>
          <Text style={styles.warningText}>¡No rompas tu racha! Tu próxima cuota es el {nextDueDate}.</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radii.card,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  streakText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  warningStrip: {
    backgroundColor: '#FFEDD5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C2410C',
  },
});
