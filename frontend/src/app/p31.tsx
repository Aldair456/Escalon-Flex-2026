import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loanTermOptions } from '@/components/loan-request/loanTerms.data';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500;
const STEP = 50;

export default function P31() {
  const [amount, setAmount] = useState(300);
  const [termId, setTermId] = useState('3');

  const term = loanTermOptions.find((option) => option.id === termId) ?? loanTermOptions[1];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Simular microcrédito</Text>
        <View style={styles.headerSpacer} />
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Monto */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="pricetag-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>¿Cuánto necesitas?</Text>
          </View>

          <View style={styles.amountRow}>
            <Pressable
              style={[styles.stepperButton, amount <= MIN_AMOUNT && styles.stepperButtonDisabled]}
              disabled={amount <= MIN_AMOUNT}
              onPress={() => setAmount((current) => Math.max(MIN_AMOUNT, current - STEP))}>
              <Ionicons name="remove" size={22} color={colors.primary} />
            </Pressable>

            <Text style={styles.amountText}>S/ {amount}</Text>

            <Pressable
              style={[styles.stepperButton, amount >= MAX_AMOUNT && styles.stepperButtonDisabled]}
              disabled={amount >= MAX_AMOUNT}
              onPress={() => setAmount((current) => Math.min(MAX_AMOUNT, current + STEP))}>
              <Ionicons name="add" size={22} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.availableRow}>
            <Text style={styles.availableText}>Monto disponible para ti</Text>
            <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
          </View>
          <Text style={styles.availableRange}>
            S/ {MIN_AMOUNT} – S/ {MAX_AMOUNT}
          </Text>
        </View>

        {/* Plazo */}
        <View style={styles.cardTitleRow}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <Text style={styles.cardTitle}>¿En cuánto tiempo lo pagarías?</Text>
        </View>

        <View style={styles.termRow}>
          {loanTermOptions.map((option) => {
            const selected = termId === option.id;
            return (
              <Pressable
                key={option.id}
                style={[styles.termChip, selected && styles.termChipSelected]}
                onPress={() => setTermId(option.id)}>
                <Text style={[styles.termChipText, selected && styles.termChipTextSelected]}>
                  {option.label}
                </Text>
                {selected && (
                  <View style={styles.termCheck}>
                    <Ionicons name="checkmark" size={12} color={colors.white} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Tasa estimada */}
        <View style={styles.rateCard}>
          <Ionicons name="time-outline" size={22} color={colors.primary} />
          <View style={styles.rateText}>
            <View style={styles.rateLabelRow}>
              <Text style={styles.rateLabel}>Tasa estimada</Text>
              <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
            </View>
            <Text style={styles.rateValue}>{term.tea} mensual</Text>
            <Text style={styles.rateSublabel}>(TCEA ≈ {term.tcea} anual)</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({ pathname: '/p32', params: { amount: String(amount), termId } })
        }>
        <Text style={styles.buttonText}>Ver simulación</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
  headerSpacer: {
    width: 24,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 20,
    marginBottom: 20,
    ...shadows.card,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 14,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonDisabled: {
    opacity: 0.4,
  },
  amountText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 110,
    textAlign: 'center',
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  availableText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  availableRange: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 2,
  },
  termRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  termChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 16,
    ...shadows.card,
  },
  termChipSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F6F1FA',
  },
  termChipText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  termChipTextSelected: {
    color: colors.primary,
  },
  termCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    padding: 18,
  },
  rateText: {
    flex: 1,
  },
  rateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  rateLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  rateValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  rateSublabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.card,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 17,
    alignItems: 'center',
    ...shadows.button,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
  },
});
