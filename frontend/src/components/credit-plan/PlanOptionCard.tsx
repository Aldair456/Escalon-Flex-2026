import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type PlanOptionCardProps = {
  amount: string;
  frequency: string;
  note: string;
  recommended?: boolean;
  selected: boolean;
  onPress: () => void;
};

export function PlanOptionCard({
  amount,
  frequency,
  note,
  recommended,
  selected,
  onPress,
}: PlanOptionCardProps) {
  return (
    <Pressable style={[styles.container, selected && styles.containerSelected]} onPress={onPress}>
      <Image
        source={require('../../../assets/illustrations/coin-stack.png')}
        style={styles.coin}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.amount}>
          {amount} <Text style={styles.amountSuffix}>{frequency}</Text>
        </Text>
        <Text style={[styles.note, recommended && styles.noteRecommended]}>{note}</Text>
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 16,
    marginBottom: 12,
  },
  containerSelected: {
    borderColor: colors.primary,
  },
  coin: {
    width: 36,
    height: 36,
  },
  content: {
    flex: 1,
  },
  amount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  amountSuffix: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  note: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  noteRecommended: {
    color: colors.accent,
    fontWeight: '700',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});
