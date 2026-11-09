import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { UsageChip } from '@/components/credit-goal/UsageChip';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { IncomeDropSlider } from '@/components/scenario-simulator/IncomeDropSlider';
import {
  BASE_MONTHLY_INCOME,
  CURRENT_INSTALLMENT,
  FIXED_EXPENSES,
  MAX_INCOME_DROP,
  MIN_INCOME_DROP,
  scenarioOptions,
} from '@/components/scenario-simulator/scenarios.data';
import { StatusBanner, type BannerStatus } from '@/components/scenario-simulator/StatusBanner';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P17() {
  const [incomeDrop, setIncomeDrop] = useState(0);

  const { simulatedIncome, residualCapacity, status, banner } = useMemo(() => {
    const income = BASE_MONTHLY_INCOME * (1 - incomeDrop);
    const residual = income - FIXED_EXPENSES - CURRENT_INSTALLMENT;

    let currentStatus: BannerStatus = 'ok';
    let title = 'Cómodo';
    let message = 'Con este escenario, tu cuota se paga sin apretar tu presupuesto.';

    if (residual < 0) {
      currentStatus = 'risk';
      title = 'Riesgo de atraso';
      message = 'En este escenario no te alcanzaría para la cuota. Te sugerimos un plazo más largo o un monto menor.';
    } else if (residual < 200) {
      currentStatus = 'tight';
      title = 'Ajustado';
      message = 'Te alcanzaría, pero con poco margen. Conviene tener un colchón para este escenario.';
    }

    return {
      simulatedIncome: income,
      residualCapacity: residual,
      status: currentStatus,
      banner: { title, message },
    };
  }, [incomeDrop]);

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Simulador" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>¿Qué pasa si ganas menos?</Text>
        <Text style={styles.subheading}>
          Mueve el slider o toca un atajo para probar distintos escenarios.
        </Text>

        <IncomeDropSlider
          value={incomeDrop}
          min={MIN_INCOME_DROP}
          max={MAX_INCOME_DROP}
          onChange={setIncomeDrop}
        />

        <View style={styles.chips}>
          {scenarioOptions.map((option) => (
            <UsageChip
              key={option.id}
              label={option.label}
              selected={incomeDrop === option.incomeDrop}
              onPress={() => setIncomeDrop(option.incomeDrop)}
            />
          ))}
        </View>

        <View style={styles.divider} />

        <SummaryRow label="Ingreso simulado" value={`S/ ${simulatedIncome.toFixed(2)}`} />
        <SummaryRow label="Tu cuota actual" value={`S/ ${CURRENT_INSTALLMENT.toFixed(2)}`} />
        <SummaryRow
          label="Capacidad residual"
          value={`S/ ${residualCapacity.toFixed(2)}`}
          highlight
        />

        <StatusBanner status={status} title={banner.title} message={banner.message} />
      </ScrollView>

      <ContinueButton label="Volver a mi crédito" />
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
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    lineHeight: 20,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
});
