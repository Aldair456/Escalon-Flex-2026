import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InstallmentTimelineRow } from '@/components/payment-schedule/InstallmentTimelineRow';
import { Calendar } from '@/components/savings-plan/Calendar';
import {
  getSavingsPlan,
  getSavingsProgress,
  markNextInstallmentMissed,
  markNextInstallmentPaid,
  rescheduleInstallment,
} from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export default function P7() {
  const existingPlan = getSavingsPlan();
  const [showReschedule, setShowReschedule] = useState(false);
  const [, forceRefresh] = useState(0);

  if (!existingPlan) {
    return (
      <View style={styles.container}>
        <View style={styles.purpleSection}>
          <SafeAreaView edges={['top']} style={styles.headerRow}>
            <Pressable onPress={() => router.back()} hitSlop={8}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>
            <Text style={styles.headerTitle}>Mis cuotas</Text>
            <View style={{ width: 28 }} />
          </SafeAreaView>
        </View>

        <View style={styles.lockedContent}>
          <View style={styles.lockedIconCircle}>
            <Ionicons name="lock-closed" size={32} color={colors.primary} />
          </View>
          <Text style={styles.lockedTitle}>Aún no tienes un plan de ahorro</Text>
          <Text style={styles.lockedText}>
            Crea tu plan para ver aquí tu cronograma de aportes y tu avance.
          </Text>
        </View>

        <ContinueButton label="Crear mi plan de ahorro" onPress={() => router.push('/p18')} />
      </View>
    );
  }

  const progress = getSavingsProgress();
  const fillPercent = Math.round((progress.paidCount / progress.totalAportes) * 100);

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
              {progress.goalAmount} pagados
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
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Cronograma de pagos</Text>

            <View style={styles.monthlyPill}>
              <Ionicons name="calendar-outline" size={14} color={colors.primary} />
              <Text style={styles.monthlyPillText}>
                S/ {progress.aporteAmount} · {progress.frequencyLabel}
              </Text>
            </View>
          </View>

          <Pressable style={styles.editPlanRow} onPress={() => router.push('/p27')}>
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={styles.editPlanText}>Editar fecha, monto o frecuencia</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </Pressable>

          {progress.installments.map((item, index) => (
            <View key={item.id}>
              <InstallmentTimelineRow
                number={item.number}
                date={item.date}
                status={item.status}
                isLast={index === progress.installments.length - 1}
                rescheduled={item.rescheduled}
                onPress={
                  item.status === 'pending'
                    ? undefined
                    : () => {
                        if (item.status === 'next') {
                          markNextInstallmentPaid();
                        }
                        router.push({ pathname: '/p6', params: { cuota: item.number } });
                      }
                }
              />

              {item.status === 'next' && (
                <View style={styles.rescheduleWrap}>
                  <Pressable
                    style={styles.rescheduleLink}
                    onPress={() => setShowReschedule((current) => !current)}>
                    <Ionicons name="calendar-outline" size={14} color={colors.primary} />
                    <Text style={styles.rescheduleLinkText}>
                      {item.rescheduled ? `Reprogramada: ${item.date}` : 'Reprogramar esta fecha'}
                    </Text>
                  </Pressable>

                  {showReschedule && (
                    <Calendar
                      value={null}
                      onChange={(date) => {
                        rescheduleInstallment(item.number, date);
                        setShowReschedule(false);
                      }}
                    />
                  )}

                  <Pressable
                    style={styles.missedLink}
                    onPress={() => {
                      markNextInstallmentMissed();
                      forceRefresh((tick) => tick + 1);
                    }}>
                    <Ionicons name="close-circle-outline" size={14} color="#DC2626" />
                    <Text style={styles.missedLinkText}>No pude pagar esta cuota</Text>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <ContinueButton
        label="Regresar a Yape"
        icon="home-outline"
        showArrow
        onPress={() => router.push('/')}
      />
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
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  monthlyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3EEFA',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  monthlyPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
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
  lockedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  lockedIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F3EEFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  lockedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  rescheduleWrap: {
    marginLeft: 44,
    marginBottom: 10,
  },
  rescheduleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  rescheduleLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  missedLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  missedLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
});
