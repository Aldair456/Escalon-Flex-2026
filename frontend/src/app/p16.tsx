import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P16() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Tu resultado" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/illustrations/route-b-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.eyebrow}>Vamos paso a paso</Text>
        <Text style={styles.heading}>Construye tu historial con cuotas pequeñas</Text>
        <Text style={styles.paragraph}>
          Puedes pagar cuotas pequeñas, pero por ahora no calificas para libre disponibilidad.
          Tus fondos quedan retenidos y se liberan al final del reto.
        </Text>

        <View style={styles.noteWrapper}>
          <InfoNote
            lead="¿Cómo funciona?"
            text="BCP te presta el monto, pero queda bloqueado. Pagas tus cuotas puntualmente, eso sí se reporta a la SBS, y al terminar el dinero se libera completo para ti."
          />
        </View>
      </ScrollView>

      <ContinueButton label="Empezar mi reto" onPress={() => router.push('/p1')} />
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
  mascot: {
    width: 220,
    height: 178,
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 6,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  noteWrapper: {
    width: '100%',
  },
});
