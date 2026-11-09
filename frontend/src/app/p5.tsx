import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SuccessBadge } from '@/components/credit-confirmation/SuccessBadge';
import { StatsSummary } from '@/components/credit-confirmation/StatsSummary';
import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { MascotCallout } from '@/components/credit-plan/MascotCallout';
import { getSavingsPlan } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P5() {
  const plan = getSavingsPlan();

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Construye tu ahorro" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <SuccessBadge />

        <Text style={styles.heading}>¡Tu reto está listo!</Text>
        <Text style={styles.subheading}>Ya comenzaste a construir tu historial de ahorro.</Text>

        <StatsSummary
          amount={plan ? `S/ ${plan.aporteAmount}` : 'S/ 50'}
          installments={plan ? String(plan.estimatedAportes) : '6'}
          level="Inicial"
        />

        <MascotCallout
          title="¡Genial!"
          description="Tú tienes el control: puedes cambiar el monto, la fecha o la frecuencia de tus aportes cuando quieras, sin penalidades."
        />
      </ScrollView>

      <ContinueButton label="Ir a mi reto" onPress={() => router.push('/p7')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: layout.screenContent,
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
  },
  subheading: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
});
