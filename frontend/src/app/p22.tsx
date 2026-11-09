import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LevelLadder } from '@/components/credit-level/LevelLadder';
import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoNote } from '@/components/credit-plan/InfoNote';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { layout } from '@/theme/layout';

export default function P22() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Notificación" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={40} color={colors.accent} />
        </View>

        <Text style={styles.heading}>¡Subiste de nivel!</Text>
        <Text style={styles.paragraph}>
          Hiciste tu aporte 4 de 6 a tiempo. Esto suma a tu constancia de ahorro en Escalón Flex.
        </Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Tu nivel Escalón</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreOld}>0</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.textMuted} />
            <Text style={styles.scoreNew}>32</Text>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreBadgeText}>+32</Text>
            </View>
          </View>
          <Text style={styles.scoreDisclaimer}>Simulación, no es un puntaje crediticio real.</Text>
        </View>

        {/* <Image
          source={require('../../assets/illustrations/thumbsup-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        /> */}

        <LevelLadder title="Tu nivel Escalón" />

        <InfoNote
          lead="¿Sabías qué?"
          text="Cada aporte puntual suma a tu constancia de ahorro. Con tu autorización, esto podría considerarse en una futura evaluación del BCP."
        />
      </ScrollView>

      <ContinueButton label="Entendido" onPress={() => router.back()} />
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
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  scoreCard: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    paddingVertical: 20,
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 6,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreOld: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  scoreNew: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  scoreBadge: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreBadgeText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
  },
  scoreDisclaimer: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 8,
  },
  mascot: {
    width: 150,
    height: 128,
    marginBottom: 12,
  },
});
