import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConfettiBackground } from '@/components/payment-receipt/ConfettiBackground';
import { ReceiptTopBar } from '@/components/payment-receipt/ReceiptTopBar';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export default function P9() {
  const progress = getSavingsProgress();
  const fullyCompleted = progress.paidCount >= progress.totalAportes;
  const onTimeCount = progress.paidCount - progress.missedCount;
  const punctuality = Math.round((Math.max(0, onTimeCount) / progress.totalAportes) * 100);

  return (
    <View style={styles.container}>
      <ConfettiBackground />

      <ReceiptTopBar showIcon={false} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {fullyCompleted ? '¡Felicidades! Completaste tu reto' : 'Llegaste al final de tu plan'}
          </Text>

          <Text style={styles.paragraph}>
            Tus <Text style={styles.bold}>S/ {progress.paidAmount}</Text> ya están en tu Yape. Hiciste{' '}
            <Text style={styles.bold}>
              {progress.paidCount} de {progress.totalAportes} aportes
            </Text>
            {progress.missedCount > 0 ? `, con ${progress.missedCount} sin pagar.` : ' a tiempo.'}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Tu resultado</Text>
          <SummaryRow
            label="Nivel"
            value={fullyCompleted ? 'Hábito de ahorro consolidado' : 'En construcción'}
            highlight
          />
          <SummaryRow label="Puntualidad" value={`${punctuality}%`} />
          <SummaryRow label="Monto liberado" value={`S/ ${progress.paidAmount}.00`} />
          <SummaryRow label="Perfil de ahorro actualizado" value="Sí ✓" highlight />
          {fullyCompleted && (
            <>
              <SummaryRow label="Bono por completar tu reto" value="+S/ 5" highlight />
              <SummaryRow label="Vale de descuento" value="10% en Yape Promos" highlight />
            </>
          )}

          <InfoNote text="Con tu autorización, estas señales podrían considerarse en una futura evaluación del BCP. La aprobación de crédito no está garantizada." />
        </View>

        <View style={styles.actions}>
          <ContinueButton label="Volver a Yape" onPress={() => router.push('/p24')} />
          <ContinueButton
            label="Ver mis aportes completos"
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
