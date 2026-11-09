import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { InfoCard } from '@/components/credit-level/InfoCard';
import { LevelLadder } from '@/components/credit-level/LevelLadder';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P3() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Construye tu perfil" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Así empiezas</Text>

        <InfoCard
          icon="shield-checkmark-outline"
          title="Sin historial de ahorro aún"
          description="Es el punto de partida para construir el tuyo"
        />

        <LevelLadder
          title="Tu nivel Escalón"
          image={require('../../assets/illustrations/level-ladder-inicial.png')}
        />

        <Text style={styles.paragraph}>
          Todavía no tienes historial de ahorro, y eso está bien. Vamos a construirlo juntos, a tu ritmo.
        </Text>

        <Text style={styles.link}>Ver detalle de mi perfil</Text>
      </ScrollView>

      <ContinueButton label="Ver mi reto" onPress={() => router.push('/p5')} />
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
  step: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
    marginTop: 16,
    lineHeight: 20,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
