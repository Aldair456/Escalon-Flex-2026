import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P14() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Tu resultado" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/illustrations/route-a-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.eyebrow}>¡Buenas noticias!</Text>
        <Text style={styles.heading}>Calificas para un microcrédito</Text>
        <Text style={styles.paragraph}>
          Tienes capacidad de pago suficiente, así que tienes dinero disponible desde el inicio, con
          cuotas personalizadas a tu ritmo.
        </Text>

        <View style={styles.noteWrapper}>
          <InfoNote
            lead="Dato extra:"
            text="Si tu crédito se reporta a la SBS, también empiezas a construir tu historial."
          />
        </View>
      </ScrollView>

      <ContinueButton label="Ver mi crédito" onPress={() => router.push('/p30')} />
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
    height: 205,
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
