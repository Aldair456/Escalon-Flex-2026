import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import { TransactionItem } from './TransactionItem';
import { transactions } from './transactions.data';

export function TransactionHistory() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Últimos movimientos</Text>
        <Text style={styles.link}>Ver todos</Text>
      </View>

      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
  },
});
