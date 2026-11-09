import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { UsageChip } from '@/components/credit-goal/UsageChip';
import { MascotCallout } from '@/components/credit-plan/MascotCallout';
import { Calendar } from '@/components/savings-plan/Calendar';
import { SavingsStepHeader } from '@/components/savings-plan/SavingsStepHeader';
import { setSavingsPlan } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const MIN_GOAL_AMOUNT = 100;
const MAX_GOAL_AMOUNT = 500;
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const GOAL_PRESETS = [100, 200, 300, 500];
const DATE_PRESETS = [
  { id: '1m', label: '1 mes', months: 1 },
  { id: '2m', label: '2 meses', months: 2 },
  { id: '3m', label: '3 meses', months: 3 },
];
const FREQUENCY_CARDS = [
  { id: 'semanal', label: 'Semanal', subtitle: 'Cada 7 días', days: 7, icon: 'calendar-outline' as const },
  { id: 'quincenal', label: 'Quincenal', subtitle: 'Cada 15 días', days: 15, icon: 'calendar-outline' as const },
  { id: 'mensual', label: 'Mensual', subtitle: 'Una vez al mes', days: 30, icon: 'calendar-outline' as const },
  { id: 'otro', label: 'Otro', subtitle: 'Elige tus días', days: 0, icon: 'options-outline' as const },
];

function formatDate(date: Date) {
  return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

export default function P18() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Paso 1: meta y fecha
  const [goalAmount, setGoalAmount] = useState(300);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState(String(300));

  const startEditingGoal = () => {
    setGoalInputValue(String(goalAmount));
    setIsEditingGoal(true);
  };

  const commitGoalInput = () => {
    const parsed = Number(goalInputValue.replace(/[^0-9]/g, ''));
    if (goalInputValue && !Number.isNaN(parsed)) {
      setGoalAmount(Math.min(MAX_GOAL_AMOUNT, Math.max(MIN_GOAL_AMOUNT, parsed)));
    }
    setIsEditingGoal(false);
  };

  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [datePresetId, setDatePresetId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const pickDatePreset = (presetId: string, months: number) => {
    setDatePresetId(presetId);
    setShowCalendar(false);
    setTargetDate(addMonths(new Date(), months));
  };

  const pickCustomDate = () => {
    setDatePresetId(null);
    setShowCalendar((current) => !current);
  };

  const planDurationLabel = datePresetId
    ? (DATE_PRESETS.find((preset) => preset.id === datePresetId)?.label ?? 'Por definir')
    : targetDate
      ? formatDate(targetDate)
      : 'Por definir';

  // Paso 2: frecuencia y aporte
  const [frequencyId, setFrequencyId] = useState('semanal');
  const [customDays, setCustomDays] = useState('');

  const isCustomFrequency = frequencyId === 'otro';
  const parsedCustomDays = Number(customDays);
  const frequencyDays = isCustomFrequency
    ? (parsedCustomDays > 0 ? parsedCustomDays : 30)
    : (FREQUENCY_CARDS.find((option) => option.id === frequencyId)?.days ?? 30);
  const frequencyLabel = isCustomFrequency
    ? (customDays ? `Cada ${customDays} días` : 'Elige tus días')
    : (FREQUENCY_CARDS.find((option) => option.id === frequencyId)?.label ?? 'Semanal');

  const suggestedAporte = useMemo(() => {
    if (!targetDate) return null;
    const diffDays = Math.round((targetDate.getTime() - Date.now()) / MS_PER_DAY);
    const periodCount = Math.max(1, Math.round(diffDays / frequencyDays));
    return Math.ceil(goalAmount / periodCount);
  }, [targetDate, frequencyDays, goalAmount]);

  const [aporteAmount, setAporteAmount] = useState(25);
  const [aporteTouched, setAporteTouched] = useState(false);
  const [isEditingAporte, setIsEditingAporte] = useState(false);
  const [aporteInputValue, setAporteInputValue] = useState(String(25));

  // Si cambia la meta, la fecha o la frecuencia, el aporte vuelve a sugerirse en vez de quedar congelado.
  useEffect(() => {
    setAporteTouched(false);
  }, [goalAmount, targetDate, frequencyDays]);

  const effectiveAporte = !aporteTouched && suggestedAporte ? suggestedAporte : aporteAmount;
  const estimatedAportes = Math.max(1, Math.ceil(goalAmount / effectiveAporte));

  const startEditingAporte = () => {
    setAporteInputValue(String(effectiveAporte));
    setIsEditingAporte(true);
  };

  const commitAporteInput = () => {
    const parsed = Number(aporteInputValue.replace(/[^0-9]/g, ''));
    if (aporteInputValue && !Number.isNaN(parsed) && parsed > 0) {
      setAporteAmount(Math.min(goalAmount, parsed));
      setAporteTouched(true);
    }
    setIsEditingAporte(false);
  };

  return (
    <View style={styles.container}>
      <SavingsStepHeader
        title="Ahorro"
        step={step}
        totalSteps={2}
        onBack={step === 2 ? () => setStep(1) : undefined}
      />

      {step === 1 ? (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          <View style={styles.heroRow}>
            <View style={styles.heroText}>
              <Text style={styles.heading}>Arma tu plan{'\n'}de ahorro</Text>
              <Text style={styles.subheading}>Define tu meta y cuándo quieres lograrla.</Text>
            </View>

            <Image
              source={require('../../assets/illustrations/savings-goal-mascot.png')}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          {/* Meta de ahorro */}
          <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <View style={styles.goalIconWrap}>
                <MaterialCommunityIcons name="bullseye-arrow" size={29} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>¿Cuánto quieres ahorrar?</Text>
            </View>

            <View style={styles.amountPill}>
              <View style={styles.amountPillSide} />
              {isEditingGoal ? (
                <TextInput
                  style={styles.amountPillInput}
                  value={goalInputValue}
                  onChangeText={(text) => setGoalInputValue(text.replace(/[^0-9]/g, ''))}
                  onBlur={commitGoalInput}
                  onSubmitEditing={commitGoalInput}
                  keyboardType="number-pad"
                  autoFocus
                  maxLength={5}
                />
              ) : (
                <Text style={styles.amountPillText}>S/ {goalAmount}</Text>
              )}
              <Pressable
                style={[styles.amountPillSide, styles.amountPillEditSide]}
                onPress={isEditingGoal ? commitGoalInput : startEditingGoal}
                hitSlop={10}>
                <Feather name={isEditingGoal ? 'check' : 'edit-3'} size={22} color={colors.primary} />
              </Pressable>
            </View>

            <View style={styles.chipRow}>
              {GOAL_PRESETS.map((preset) => (
                <UsageChip
                  key={preset}
                  label={`S/ ${preset}`}
                  selected={!isEditingGoal && goalAmount === preset}
                  onPress={() => {
                    setGoalAmount(preset);
                    setIsEditingGoal(false);
                  }}
                />
              ))}
            </View>
          </View>

          {/* Fecha objetivo */}
          <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="calendar-outline" size={27} color={colors.primary} />
              <Text style={styles.cardTitle}>¿Cuándo quieres lograrlo?</Text>
            </View>
            <Text style={styles.cardSubtitle}>Elige un plazo o una fecha objetivo.</Text>

            <View style={styles.chipRow}>
              {DATE_PRESETS.map((preset) => (
                <UsageChip
                  key={preset.id}
                  label={preset.label}
                  icon="calendar-outline"
                  selected={datePresetId === preset.id}
                  onPress={() => pickDatePreset(preset.id, preset.months)}
                />
              ))}
            </View>

            <Pressable style={styles.exactDateRow} onPress={pickCustomDate}>
              <Ionicons name="calendar-outline" size={21} color={colors.primary} />
              <Text style={styles.exactDateText}>
                {datePresetId === null && targetDate ? formatDate(targetDate) : 'Elegir fecha exacta'}
              </Text>
              <Ionicons name="chevron-forward" size={21} color={colors.primary} />
            </Pressable>

            {showCalendar && (
              <View style={styles.sliderWrapper}>
                <Calendar
                  value={targetDate}
                  onChange={(date) => {
                    setTargetDate(date);
                    setDatePresetId(null);
                  }}
                />
              </View>
            )}
          </View>

          {/* Banner motivacional */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="rocket-outline" size={26} color={colors.white} />
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>¡Tú pones el ritmo!</Text>
              <Text style={styles.bannerSubtitle}>
                Ahorra tu propio dinero y construye un mejor perfil financiero.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          <Text style={styles.heading2}>¿Cómo prefieres ahorrar?</Text>
          <Text style={styles.subheading}>Elige la frecuencia y el monto de tu aporte.</Text>

          {/* Frecuencia */}
          <View style={styles.sectionTitleRow}>
            <Ionicons name="layers-outline" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Frecuencia de aporte</Text>
          </View>

          <View style={styles.frequencyGrid}>
            {FREQUENCY_CARDS.map((option) => {
              const selected = frequencyId === option.id;
              return (
                <Pressable
                  key={option.id}
                  style={[styles.freqCard, selected && styles.freqCardSelected]}
                  onPress={() => setFrequencyId(option.id)}>
                  {selected && (
                    <View style={styles.freqCheckBadge}>
                      <Ionicons name="checkmark" size={13} color={colors.white} />
                    </View>
                  )}
                  <Ionicons name={option.icon} size={20} color={colors.primary} />
                  <Text style={styles.freqCardTitle}>{option.label}</Text>
                  <Text style={styles.freqCardSubtitle}>{option.subtitle}</Text>
                </Pressable>
              );
            })}
          </View>

          {isCustomFrequency && (
            <View style={styles.customDaysRow}>
              <Text style={styles.customDaysLabel}>Cada cuántos días</Text>
              <TextInput
                style={styles.customDaysInput}
                value={customDays}
                onChangeText={(text) => setCustomDays(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="Ej. 20"
                placeholderTextColor={colors.textMuted}
                maxLength={3}
              />
            </View>
          )}

          {/* Aporte por vez */}
          <View style={styles.sectionTitleRow}>
            <FontAwesome5 name="coins" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>¿Cuánto aportarás cada vez?</Text>
          </View>

          <View style={styles.aportePill}>
            <View style={styles.aporteTextBlock}>
              {!aporteTouched && suggestedAporte && (
                <View style={styles.suggestedBadge}>
                  <Ionicons name="sparkles" size={12} color={colors.primary} />
                  <Text style={styles.suggestedBadgeText}>Aporte sugerido</Text>
                </View>
              )}

              <View style={styles.aporteAmountRow}>
                {isEditingAporte ? (
                  <TextInput
                    style={styles.aporteAmountInput}
                    value={aporteInputValue}
                    onChangeText={(text) => setAporteInputValue(text.replace(/[^0-9]/g, ''))}
                    onBlur={commitAporteInput}
                    onSubmitEditing={commitAporteInput}
                    keyboardType="number-pad"
                    autoFocus
                    maxLength={5}
                  />
                ) : (
                  <Text style={styles.aporteAmountText}>S/ {effectiveAporte}</Text>
                )}
                <Pressable
                  onPress={isEditingAporte ? commitAporteInput : startEditingAporte}
                  hitSlop={10}
                  style={styles.aporteEditButton}>
                  <Feather name={isEditingAporte ? 'check' : 'edit-3'} size={20} color={colors.primary} />
                </Pressable>
              </View>
            </View>

            <FontAwesome5 name="coins" size={46} color={colors.badge} />
          </View>

          {/* Resumen */}
          <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="clipboard-outline" size={25} color={colors.primary} />
              <Text style={styles.cardTitle}>Resumen de tu plan</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Meta total</Text>
              <Text style={styles.summaryValue}>S/ {goalAmount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Plazo</Text>
              <Text style={styles.summaryValue}>{planDurationLabel}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frecuencia</Text>
              <Text style={styles.summaryValue}>{frequencyLabel}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>Aporte por vez</Text>
              <Text style={styles.summaryValue}>
                S/ {effectiveAporte} × {estimatedAportes} aportes
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <ContinueButton
        label={step === 1 ? 'Continuar' : 'Crear mi plan de ahorro'}
        onPress={step === 1 ? () => setStep(2) : () => setShowConfirmModal(true)}
      />

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowConfirmModal(false)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <MascotCallout
              title="Tu ahorro, tu compromiso"
              description="Cada aporte que realices te ayudará a construir un perfil de comportamiento financiero que podría ser considerado en futuras evaluaciones crediticias."
            />

            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setSavingsPlan({
                  goalAmount,
                  targetDate,
                  datePresetId,
                  frequencyId,
                  customDays,
                  aporteAmount: effectiveAporte,
                  estimatedAportes,
                  frequencyLabel,
                  planDurationLabel,
                  paidCount: 0,
                });
                setShowConfirmModal(false);
                router.push('/p3');
              }}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </Pressable>
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
  scroll: {
    flex: 1,
  },
  content: layout.screenContent,
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  heroText: {
    flex: 1,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 17,
    color: colors.textMuted,
    marginTop: 10,
    marginBottom: 22,
  },
  mascot: {
    width: 160,
    height: 160,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 24,
    marginBottom: 20,
    ...shadows.card,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 8,
  },
  goalIconWrap: {
    position: 'relative',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 18,
  },
  amountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EEFA',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    marginTop: 16,
    marginBottom: 20,
  },
  amountPillSide: {
    flex: 1,
  },
  amountPillEditSide: {
    alignItems: 'flex-end',
  },
  amountPillText: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  },
  amountPillInput: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    minWidth: 100,
    padding: 0,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
  },
  sliderWrapper: {
    marginTop: 18,
  },
  exactDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: colors.background,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  exactDateText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    backgroundColor: '#E3F5F3',
    borderRadius: radii.card,
    padding: 20,
    marginBottom: 24,
  },
  bannerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 3,
  },
  bannerSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 18,
  },
  freqCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 18,
    position: 'relative',
    ...shadows.card,
  },
  freqCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F6F1FA',
    shadowOpacity: 0.1,
  },
  freqCheckBadge: {
    position: 'absolute',
    top: 13,
    right: 13,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freqCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: 11,
  },
  freqCardSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  customDaysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 18,
  },
  customDaysLabel: {
    fontSize: 15,
    color: colors.text,
  },
  customDaysInput: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 54,
    textAlign: 'right',
    padding: 0,
  },
  aportePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EEFA',
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
  },
  aporteTextBlock: {
    flex: 1,
  },
  suggestedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 9,
  },
  suggestedBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aporteAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  aporteAmountText: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.primary,
  },
  aporteAmountInput: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 78,
    padding: 0,
  },
  aporteEditButton: {
    paddingTop: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
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
    padding: 20,
    ...shadows.card,
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
});
