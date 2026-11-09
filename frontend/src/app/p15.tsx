import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P15() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Tu resultado" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/illustrations/route-c-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.eyebrow}>Por ahora...</Text>
        <Text style={styles.heading}>Empecemos con un plan de ahorro</Text>
        <Text style={styles.paragraph}>
          Por ahora no te conviene asumir una deuda. Arma metas flexibles de ahorro, le hacemos
          seguimiento, y más adelante te volvemos a evaluar.
        </Text>

        <View style={styles.noteWrapper}>
          <InfoNote
            lead="Importante:"
            text="Ahorrar no genera historial crediticio formal, pero te prepara para cuando sí califiques."
          />
        </View>
      </ScrollView>

      <ContinueButton label="Armar mi plan de ahorro" onPress={() => router.push('/p18')} />
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
    height: 203,
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
