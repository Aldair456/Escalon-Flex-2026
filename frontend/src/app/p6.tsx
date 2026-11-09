import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConfettiBackground } from '@/components/payment-receipt/ConfettiBackground';
import { DateTimeRow } from '@/components/payment-receipt/DateTimeRow';
import { ReceiptTopBar } from '@/components/payment-receipt/ReceiptTopBar';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export default function P6() {
  const { cuota } = useLocalSearchParams<{ cuota?: string }>();
  const progress = getSavingsProgress();
  const cuotaNumber = Number(cuota) || progress.paidCount || 1;
  const total = progress.totalAportes;
  const scheduleEnded = cuotaNumber >= total;
  const fullyCompleted = progress.paidCount >= total;
  const remaining = Math.max(0, total - progress.paidCount);
  const paidSoFar = progress.paidAmount;
  const thisInstallment = progress.installments.find((item) => item.number === cuotaNumber);
  const nextInstallment = progress.installments.find((item) => item.number === cuotaNumber + 1);
  const operationNumber = String(4812300 + cuotaNumber * 7);

  return (
    <View style={styles.container}>
      <ConfettiBackground />

      <ReceiptTopBar showIcon={false} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>¡Registraste tu aporte!</Text>

            <Pressable style={styles.shareButton}>
              <Ionicons name="share-social-outline" size={16} color={colors.accent} />
              <Text style={styles.shareText}>COMPARTIR</Text>
            </Pressable>
          </View>

          <Text style={styles.amount}>
            <Text style={styles.currency}>S/ </Text>
            {progress.aporteAmount}
          </Text>

          <DateTimeRow date={thisInstallment?.date ?? '—'} time="11:31 a. m." />

          {fullyCompleted ? (
            <InfoNote
              lead="¡Completaste tu reto!"
              text={`Ya hiciste tus ${total} aportes. Revisa tu resultado final.`}
            />
          ) : scheduleEnded ? (
            <InfoNote
              lead="Llegaste al final de tu plan"
              text={`Pagaste ${progress.paidCount} de ${total} aportes (S/ ${paidSoFar} de S/ ${progress.goalAmount}). Revisa tu resultado final.`}
            />
          ) : thisInstallment?.rescheduled ? (
            <InfoNote
              lead="Aporte reprogramado"
              text={`Este aporte se registró con una nueva fecha. Te faltan ${remaining} aportes para completar tu meta. Ya ahorraste S/ ${paidSoFar} de tu meta.`}
            />
          ) : (
            <InfoNote
              lead="¡Sigue así!"
              text={`Te faltan ${remaining} aportes para completar tu meta. Ya ahorraste S/ ${paidSoFar} de tu meta.`}
            />
          )}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Datos del aporte</Text>
          <SummaryRow label="Aporte" value={`${cuotaNumber} de ${total}`} />
          <SummaryRow label="Destino" value="Mi reto Construye tu ahorro" />
          <SummaryRow label="Nro. de operación" value={operationNumber} />
          <SummaryRow label="Próximo aporte" value={nextInstallment?.date ?? '—'} />

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Indicaciones</Text>
          <Text style={styles.indication}>• Ten saldo en tu Yape antes de las 8:30 p.m. del día 5.</Text>
          <Text style={styles.indication}>
            • Si te atrasas, no pierdes tu dinero, pero tu nivel puede bajar.
          </Text>
        </View>

        {cuotaNumber === 5 && (
          <Pressable style={styles.referralCard} onPress={() => router.push('/p23')}>
            <View style={[styles.referralIcon, styles.warningIcon]}>
              <Ionicons name="warning" size={22} color="#DC2626" />
            </View>

            <View style={styles.referralText}>
              <Text style={styles.referralTitle}>Antes de seguir, mira esto</Text>
              <Text style={styles.referralSubtitle}>Cuidado con el &ldquo;gota a gota&rdquo;</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </Pressable>
        )}

        {cuotaNumber === 6 && (
          <Pressable style={styles.referralCard} onPress={() => router.push('/p22')}>
            <View style={styles.referralIcon}>
              <Ionicons name="trending-up" size={22} color={colors.primary} />
            </View>

            <View style={styles.referralText}>
              <Text style={styles.referralTitle}>Tu constancia subió</Text>
              <Text style={styles.referralSubtitle}>Mira cuánto mejoró</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </Pressable>
        )}

        <View style={styles.buttonWrapper}>
          <ContinueButton
            label={scheduleEnded ? 'Ver mi resultado' : 'Ver mis aportes'}
            onPress={() => router.push(scheduleEnded ? '/p9' : '/p7')}
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
    marginTop: 16,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
  },
  amount: {
    fontSize: 44,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  currency: {
    fontSize: 20,
    fontWeight: '700',
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
    marginBottom: 8,
  },
  indication: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
    marginBottom: 6,
  },
  buttonWrapper: {
    marginTop: 24,
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  referralIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIcon: {
    backgroundColor: '#FEE2E2',
  },
  referralText: {
    flex: 1,
  },
  referralTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  referralSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
