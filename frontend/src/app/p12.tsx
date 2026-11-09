import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CreditCardPreview } from '@/components/card-offer/CreditCardPreview';
import { ConsentHeader } from '@/components/credit-consent/ConsentHeader';
import { ToggleRow } from '@/components/credit-consent/ToggleRow';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

const benefits = ['Sin membresía', 'Compras en cuotas', 'Se reporta a la SBS: empieza tu historial'];

export default function P12() {
  const [useSavings, setUseSavings] = useState(false);

  return (
    <View style={styles.container}>
      <ConsentHeader title="¡Tienes una tarjeta preaprobada!" />

      <View style={styles.cardWrapper}>
        <CreditCardPreview maskedNumber="4821" holderName="VALERIA" />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.lineLabel}>Tu línea de crédito</Text>
        <Text style={styles.lineAmount}>S/ 1,000</Text>

        <View style={styles.benefits}>
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Ionicons name="checkmark" size={18} color={colors.accent} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.toggleCard}>
          <ToggleRow
            title="Usa tu ahorro como respaldo"
            description="Reserva tus S/ 300 y sube tu línea"
            value={useSavings}
            onValueChange={setUseSavings}
            showBorder={false}
          />
        </View>
      </ScrollView>

      <ContinueButton label="Pedir mi tarjeta" />

      <Pressable style={styles.conditionsLink} onPress={() => router.push('/p18')}>
        <Text style={styles.conditionsText}>Ver condiciones</Text>
      </Pressable>
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
  content: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginTop: 16,
    marginHorizontal: 40,
    marginBottom: 20,
    zIndex: 1,
  },
  lineLabel: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  lineAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 20,
  },
  benefits: {
    gap: 12,
    marginBottom: 20,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitText: {
    fontSize: 15,
    color: colors.text,
  },
  toggleCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  conditionsLink: {
    alignItems: 'center',
    marginBottom: 20,
  },
  conditionsText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
