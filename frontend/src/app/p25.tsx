import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { UsageChip } from '@/components/credit-goal/UsageChip';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { AmountSlider } from '@/components/loan-request/AmountSlider';
import { Calendar } from '@/components/savings-plan/Calendar';
import { frequencyOptions } from '@/components/savings-plan/frequency.data';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

const MIN_GOAL_AMOUNT = 100;
const MAX_GOAL_AMOUNT = 500;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Valores actuales del plan guardado (mock, hasta que haya backend de planes).
const CURRENT_PLAN = {
  goalAmount: 300,
  targetDate: new Date(Date.now() + 90 * MS_PER_DAY),
  frequencyId: 'mensual',
};

function formatDate(date: Date) {
  return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function P25() {
  const [goalAmount, setGoalAmount] = useState(CURRENT_PLAN.goalAmount);
  const [targetDate, setTargetDate] = useState<Date | null>(CURRENT_PLAN.targetDate);
  const [frequencyId, setFrequencyId] = useState(CURRENT_PLAN.frequencyId);
  const [paused, setPaused] = useState(false);
  const [customDays, setCustomDays] = useState('');

  const isCustomFrequency = frequencyId === 'otro';
  const parsedCustomDays = Number(customDays);
  const frequency = isCustomFrequency
    ? {
        id: 'otro',
        label: customDays ? `Cada ${customDays} días` : 'Elige cada cuántos días',
        days: parsedCustomDays > 0 ? parsedCustomDays : 30,
      }
    : (frequencyOptions.find((option) => option.id === frequencyId) ?? frequencyOptions[2]);

  const { periods, suggestedAporte } = useMemo(() => {
    if (!targetDate) return { periods: null, suggestedAporte: null };

    const diffDays = Math.round((targetDate.getTime() - Date.now()) / MS_PER_DAY);
    const periodCount = Math.max(1, Math.round(diffDays / frequency.days));
    return { periods: periodCount, suggestedAporte: Math.ceil(goalAmount / periodCount) };
  }, [targetDate, frequency, goalAmount]);

  const [aporteAmount, setAporteAmount] = useState(50);
  const [aporteTouched, setAporteTouched] = useState(false);

  useEffect(() => {
    if (!aporteTouched && suggestedAporte) {
      setAporteAmount(Math.min(goalAmount, suggestedAporte));
    }
  }, [suggestedAporte, aporteTouched, goalAmount]);

  useEffect(() => {
    setAporteAmount((current) => Math.min(current, goalAmount));
  }, [goalAmount]);

  const estimatedAportes = Math.max(1, Math.ceil(goalAmount / aporteAmount));

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Editar mi plan" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Ajusta tu plan cuando quieras</Text>
        <Text style={styles.subheading}>
          Nada de esto se penaliza. Puedes cambiar el monto, la fecha o pausar este mes.
        </Text>

        <Text style={styles.fieldLabel}>¿Cuánto quieres ahorrar en total?</Text>
        <AmountSlider
          value={goalAmount}
          min={MIN_GOAL_AMOUNT}
          max={MAX_GOAL_AMOUNT}
          step={10}
          onChange={setGoalAmount}
        />

        <Text style={styles.fieldLabel}>¿Para cuándo quieres lograrlo?</Text>
        <Calendar value={targetDate} onChange={setTargetDate} />

        <Text style={styles.fieldLabel}>¿Cada cuánto puedes aportar?</Text>
        <View style={styles.frequencyRow}>
          {frequencyOptions.map((option) => (
            <UsageChip
              key={option.id}
              label={option.label}
              selected={frequencyId === option.id}
              onPress={() => setFrequencyId(option.id)}
            />
          ))}
          <UsageChip label="Otro" selected={isCustomFrequency} onPress={() => setFrequencyId('otro')} />
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

        <Text style={styles.fieldLabel}>¿Cuánto vas a aportar cada vez?</Text>
        {suggestedAporte && !aporteTouched && (
          <Text style={styles.suggestionHint}>Sugerido: S/ {suggestedAporte} ({periods} aportes)</Text>
        )}
        <AmountSlider
          value={aporteAmount}
          min={10}
          max={goalAmount}
          step={10}
          onChange={(nextValue) => {
            setAporteAmount(nextValue);
            setAporteTouched(true);
          }}
        />

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Tu plan actualizado</Text>
        <SummaryRow label="Meta total" value={`S/ ${goalAmount}`} highlight />
        <SummaryRow label="Fecha objetivo" value={targetDate ? formatDate(targetDate) : 'Elige una fecha'} />
        <SummaryRow label="Frecuencia" value={frequency.label} />
        <SummaryRow label="Aporte por vez" value={`S/ ${aporteAmount} (${estimatedAportes} aportes)`} highlight />
        <SummaryRow label="Estado" value={paused ? 'Pausado este mes' : 'Activo'} />

        <View style={styles.noteWrapper}>
          <InfoNote
            lead="Importante:"
            text="Pausar no borra tu historial de aportes anteriores, solo detiene el siguiente cobro hasta que lo reactives."
          />
        </View>
      </ScrollView>

      <ContinueButton
        label={paused ? 'Reactivar este mes' : 'Pausar este mes'}
        variant="secondary"
        onPress={() => setPaused((current) => !current)}
      />
      <ContinueButton label="Guardar cambios" />
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
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 16,
  },
  suggestionHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  frequencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  customDaysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
  },
  customDaysLabel: {
    fontSize: 14,
    color: colors.text,
  },
  customDaysInput: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 50,
    textAlign: 'right',
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  noteWrapper: {
    width: '100%',
  },
});
