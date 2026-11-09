import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type SummaryRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
};

export function SummaryRow({ label, value, highlight, note }: SummaryRowProps) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
      </View>
      {note && <Text style={styles.note}>{note}</Text>}
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
  note: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: -4,
    marginBottom: 6,
  },
});
