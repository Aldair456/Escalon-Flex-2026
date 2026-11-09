import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type SummaryRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function SummaryRow({ label, value, highlight }: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  valueHighlight: {
    color: colors.primary,
  },
});
