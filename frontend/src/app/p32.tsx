import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loanTermOptions } from '@/components/loan-request/loanTerms.data';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

export default function P32() {
  const params = useLocalSearchParams<{ amount?: string; termId?: string }>();
  const amount = Number(params.amount) || 300;
  const term = loanTermOptions.find((option) => option.id === params.termId) ?? loanTermOptions[1];

  const { installment, total } = useMemo(() => {
    const factor = amount / 1000;
    const interestValue = term.baseInterest * factor;
    return {
      installment: term.baseInstallment * factor,
      total: amount + interestValue,
    };
  }, [amount, term]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Resultado de la simulación</Text>
        <View style={styles.headerSpacer} />
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Así sería tu microcrédito</Text>
            <Text style={styles.amountValue}>S/ {amount}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Plazo</Text>
            <Text style={styles.rowValue}>{term.label}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.rowIcon, styles.percentIcon]}>%</Text>
            <Text style={styles.rowLabel}>Tasa (mensual)</Text>
            <Text style={styles.rowValue}>{term.tea}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowIcon} />
            <Text style={styles.rowLabel}>TCEA (anual)</Text>
            <Text style={styles.rowValue}>≈ {term.tcea}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="cash-outline" size={20} color={colors.primary} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Cuota mensual</Text>
            <Text style={styles.rowValueBold}>S/ {installment.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Total a pagar</Text>
            <Text style={styles.rowValueBold}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.botRow}>
          <Image
            source={require('../../assets/illustrations/thumbsup-mascot.png')}
            style={styles.mascot}
            resizeMode="contain"
          />

          <View style={styles.bubble}>
            <Text style={styles.bubbleTitle}>¡Puedes acceder a este microcrédito!</Text>
            <Text style={styles.bubbleDescription}>
              Según tu perfil y constancia de ahorro en Escalón Flex.
            </Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          *Simulación educativa con tasas referenciales. No representa una aprobación ni una oferta de
          crédito real.
        </Text>
      </ScrollView>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Solicitar microcrédito</Text>
      </Pressable>

      <Pressable style={styles.secondaryLink} onPress={() => router.back()}>
        <Text style={styles.secondaryLinkText}>Volver a simular</Text>
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
  amountBox: {
    backgroundColor: '#F3EEFA',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'relative',
  },
  amountLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowIcon: {
    width: 24,
    marginRight: 12,
  },
  percentIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  rowValueBold: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    padding: 16,
    marginBottom: 14,
  },
  mascot: {
    width: 70,
    height: 80,
  },
  bubble: {
    flex: 1,
  },
  bubbleTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  bubbleDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 17,
    alignItems: 'center',
    ...shadows.button,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
  },
  secondaryLink: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  secondaryLinkText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
});
