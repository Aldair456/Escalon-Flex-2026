import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type StatsSummaryProps = {
  amount: string;
  installments: string;
  level: string;
};

export function StatsSummary({ amount, installments, level }: StatsSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={require('../../../assets/illustrations/coin-stack.png')}
          style={styles.coinIcon}
          resizeMode="contain"
        />
        <Text style={styles.value}>{amount}</Text>
        <Text style={styles.label}>Al mes</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.column}>
        <Ionicons name="calendar-outline" size={28} color={colors.primary} />
        <Text style={styles.value}>{installments}</Text>
        <Text style={styles.label}>Aportes</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.column}>
        <Ionicons name="bar-chart-outline" size={28} color={colors.primary} />
        <Text style={styles.value}>{level}</Text>
        <Text style={styles.label}>Tu nivel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    paddingVertical: 18,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  coinIcon: {
    width: 28,
    height: 28,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: colors.border,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
