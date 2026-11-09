import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import type { Transaction } from './transactions.data';

type TransactionItemProps = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isNegative = transaction.amount < 0;
  const formattedAmount = `${isNegative ? '- ' : ''}S/ ${Math.abs(transaction.amount).toFixed(2)}`;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.subtitle}>{transaction.subtitle}</Text>
      </View>

      <Text style={[styles.amount, isNegative ? styles.negative : styles.positive]}>
        {formattedAmount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  negative: {
    color: '#DC2626',
  },
  positive: {
    color: colors.text,
  },
});
