import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { planOptions, planSummary } from '@/components/credit-plan/plans.data';
import { PlanOptionCard } from '@/components/credit-plan/PlanOptionCard';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P4() {
  const [selectedPlan, setSelectedPlan] = useState('p150');

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Construye crédito" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Elige tu reto</Text>
        <Text style={styles.subheading}>Calculado según lo que recibes cada mes en tu Yape.</Text>

        {planOptions.map((plan) => (
          <PlanOptionCard
            key={plan.id}
            amount={plan.amount}
            note={plan.note}
            recommended={plan.recommended}
            selected={selectedPlan === plan.id}
            onPress={() => setSelectedPlan(plan.id)}
          />
        ))}

        <Text style={styles.sectionLabel}>Datos sobre el reto</Text>
        <View style={styles.summaryCard}>
          {planSummary.map((row) => (
            <SummaryRow key={row.id} label={row.label} value={row.value} />
          ))}
        </View>

        <InfoNote lead="Es tu ahorro:" text="el dinero es 100% tuyo y lo recibes completo al final del reto." />
      </ScrollView>

      <ContinueButton label="Empezar mi reto" />
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
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subheading: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  summaryCard: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
});
