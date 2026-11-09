import { useState } from 'react';
import { View } from 'react-native';

import { BalanceCard } from './BalanceCard';
import { MovementsToggleRow } from './MovementsToggleRow';
import { TransactionHistory } from './TransactionHistory';

export function BalanceSection() {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [movementsVisible, setMovementsVisible] = useState(false);

  return (
    <View>
      <BalanceCard
        visible={balanceVisible}
        amount="S/ 0.33"
        onToggle={() => setBalanceVisible((v) => !v)}
      />

      <MovementsToggleRow visible={movementsVisible} onToggle={() => setMovementsVisible((v) => !v)} />

      {movementsVisible && <TransactionHistory />}
    </View>
  );
}
