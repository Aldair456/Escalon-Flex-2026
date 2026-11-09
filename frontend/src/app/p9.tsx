import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConfettiBackground } from '@/components/payment-receipt/ConfettiBackground';
import { ReceiptTopBar } from '@/components/payment-receipt/ReceiptTopBar';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { getSavingsPlan } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export default function P9() {
  const plan = getSavingsPlan();
  const goalAmount = plan?.goalAmount ?? 300;
  const totalAportes = plan?.estimatedAportes ?? 6;

  return (
    <View style={styles.container}>
      <ConfettiBackground />

      <ReceiptTopBar showIcon={false} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>¡Felicidades! Completaste tu reto</Text>

          <Text style={styles.paragraph}>
            Tus <Text style={styles.bold}>S/ {goalAmount}</Text> ya están en tu Yape. Hiciste{' '}
            <Text style={styles.bold}>
              {totalAportes} de {totalAportes} aportes
            </Text>{' '}
            a tiempo.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Tu resultado</Text>
          <SummaryRow label="Nivel" value="Hábito de ahorro consolidado" highlight />
          <SummaryRow label="Puntualidad" value="100%" />
          <SummaryRow label="Monto liberado" value={`S/ ${goalAmount}.00`} />
          <SummaryRow label="Perfil de ahorro actualizado" value="Sí ✓" highlight />
          <SummaryRow label="Bono por completar tu reto" value="+S/ 5" highlight />
          <SummaryRow label="Vale de descuento" value="10% en Yape Promos" highlight />

          <InfoNote text="Con tu autorización, estas señales podrían considerarse en una futura evaluación del BCP. La aprobación de crédito no está garantizada." />
        </View>

        <View style={styles.actions}>
          <ContinueButton label="Volver a Yape" onPress={() => router.push('/p24')} />
          <ContinueButton
            label="Ver mis cuotas completas"
            variant="secondary"
            onPress={() => router.push('/p26')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 28,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
    marginTop: 12,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  actions: {
    marginTop: 24,
  },
});
