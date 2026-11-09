import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { UsageChip } from '@/components/credit-goal/UsageChip';
import { InstallmentTimelineRow } from '@/components/payment-schedule/InstallmentTimelineRow';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const WITHDRAW_REASONS = [
  { id: 'emergencia', label: 'Emergencia' },
  { id: 'estudios', label: 'Estudios' },
  { id: 'emprendimiento', label: 'Emprendimiento' },
  { id: 'otro', label: 'Otro' },
];

export default function P26() {
  const progress = getSavingsProgress();
  const fillPercent = Math.round((progress.paidCount / progress.totalAportes) * 100);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [withdrawn, setWithdrawn] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.purpleSection}>
        <SafeAreaView edges={['top']} style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Mis cuotas</Text>

          <Pressable onPress={() => router.push('/p28')} hitSlop={8}>
            <Ionicons name="person-circle-outline" size={28} color={colors.white} />
          </Pressable>
        </SafeAreaView>

        <View style={styles.bottomRow}>
          <View style={styles.progressBlock}>
            <Text style={styles.progressEyebrow}>Tu avance</Text>
            <Text style={styles.progressValue}>
              {progress.paidCount} de {progress.totalAportes} aportes
            </Text>

            <View style={styles.track}>
              <View style={[styles.fill, { width: `${fillPercent}%` }]} />
            </View>

            <Text style={styles.progressSaved}>
              <Text style={styles.progressSavedBold}>S/ {progress.paidAmount}</Text> de S/{' '}
              {progress.goalAmount} ahorrados
            </Text>
          </View>

          <Image
            source={require('../../assets/illustrations/thumbsup-mascot.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.completeBanner}>
          <Ionicons name="trophy-outline" size={22} color={colors.primary} />
          <Text style={styles.completeBannerText}>
            {progress.missedCount > 0
              ? `¡Completaste tu reto! Tuviste ${progress.missedCount} cuota(s) no pagada(s), pero tu ahorro ya está disponible.`
              : '¡Completaste tu reto! Tu ahorro ya está disponible.'}
          </Text>
        </View>

        <Pressable style={styles.simulatePill} onPress={() => router.push('/p30')}>
          <Ionicons name="calculator-outline" size={18} color={colors.primary} />
          <Text style={styles.simulatePillText}>Simular microcrédito</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cronograma de pagos</Text>

          <Pressable style={styles.editPlanRow} onPress={() => router.push('/p27')}>
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={styles.editPlanText}>Editar fecha, monto o frecuencia</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </Pressable>

          {progress.installments.map((item, index) => (
            <InstallmentTimelineRow
              key={item.id}
              number={item.number}
              date={item.status === 'paid' ? 'Pagada' : item.date}
              status={item.status}
              rescheduled={item.rescheduled}
              isLast={index === progress.installments.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      <ContinueButton
        label={`Retirar S/ ${progress.paidAmount}`}
        icon="wallet-outline"
        onPress={() => setShowWithdrawModal(true)}
      />

      <Modal
        visible={showWithdrawModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWithdrawModal(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => {
            setShowWithdrawModal(false);
            setWithdrawn(false);
          }}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            {withdrawn ? (
              <>
                <View style={styles.modalIconCircle}>
                  <Ionicons name="checkmark" size={26} color={colors.white} />
                </View>
                <Text style={styles.modalTitle}>¡Listo! Retiraste tu ahorro</Text>
                <Text style={styles.modalBody}>Tus S/ {progress.paidAmount} ya están en tu Yape.</Text>

                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    setShowWithdrawModal(false);
                    setWithdrawn(false);
                    router.push('/');
                  }}>
                  <Text style={styles.modalButtonText}>Ir a inicio</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>¿Seguro que quieres retirar?</Text>
                <Text style={styles.modalBody}>
                  Tu dinero es tuyo y puedes retirarlo cuando quieras. Pero si lo retiras ahora, esta
                  reserva no se reflejará como parte de tu historial de cumplimiento en una futura
                  evaluación del BCP.
                </Text>

                <Text style={styles.modalSectionLabel}>¿Para qué lo vas a usar?</Text>
                <View style={styles.reasonRow}>
                  {WITHDRAW_REASONS.map((reason) => (
                    <UsageChip
                      key={reason.id}
                      label={reason.label}
                      selected={selectedReason === reason.id}
                      onPress={() => setSelectedReason(reason.id)}
                    />
                  ))}
                </View>

                <Pressable style={styles.modalButton} onPress={() => setWithdrawn(true)}>
                  <Text style={styles.modalButtonText}>Retirar mi ahorro</Text>
                </Pressable>
                <Pressable style={styles.modalCancelButton} onPress={() => setShowWithdrawModal(false)}>
                  <Text style={styles.modalCancelText}>Mejor cancelar</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  purpleSection: {
    backgroundColor: colors.primary,
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  progressBlock: {
    flex: 1,
  },
  progressEyebrow: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2,
    marginBottom: 12,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  fill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  progressSaved: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 10,
  },
  progressSavedBold: {
    fontWeight: '800',
    color: colors.white,
  },
  mascot: {
    width: 160,
    height: 139,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    marginTop: -8,
  },
  completeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FDF4D8',
    borderRadius: radii.card,
    padding: 14,
    marginBottom: 16,
  },
  completeBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  simulatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  simulatePillText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  editPlanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  editPlanText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 22,
    alignItems: 'center',
    ...shadows.card,
  },
  modalIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  reasonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  modalButton: {
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    paddingVertical: 15,
    alignItems: 'center',
    ...shadows.button,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  modalCancelButton: {
    paddingVertical: 12,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
});
