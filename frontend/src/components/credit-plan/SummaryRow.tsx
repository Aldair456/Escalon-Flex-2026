import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type SummaryRowProps = {
  label: string;
  value: string;
};

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
});
