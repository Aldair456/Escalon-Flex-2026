import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { getSavingsPlan } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { layout } from '@/theme/layout';

export default function P20() {
  const plan = getSavingsPlan();
  const approvedAmount = plan?.goalAmount ?? 300;

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Tu monto aprobado" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Según tu comportamiento en Yape</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Yape decidió prestarte</Text>
          <Text style={styles.amount}>S/ {approvedAmount}</Text>
          <Text style={styles.amountNote}>Monto estimado para tu reto Construye crédito</Text>
        </View>

        <Image
          source={require('../../assets/illustrations/locked-money-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.paragraph}>
          Analizamos tus movimientos y tu comportamiento de pago en Yape para calcular este monto.
          Es un cálculo estimado y puede variar según la evaluación final.
        </Text>

        <View style={styles.noteWrapper}>
          <InfoNote
            lead="Importante:"
            text="Este dinero queda bloqueado. No podrás retirarlo ni usarlo — se libera completo recién cuando termines de pagar todas tus cuotas."
          />
        </View>
      </ScrollView>

      <ContinueButton label="Elegir mi plan de pagos" onPress={() => router.push('/p4')} />
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
    ...layout.screenContent,
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 12,
  },
  amountCard: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  amount: {
    fontSize: 44,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  amountNote: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
  mascot: {
    width: 170,
    height: 173,
    marginTop: 12,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  noteWrapper: {
    width: '100%',
  },
});
