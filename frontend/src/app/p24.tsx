import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/credit-plan/InfoNote';
import { SummaryRow } from '@/components/credit-plan/SummaryRow';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { layout } from '@/theme/layout';

export default function P24() {
  const progress = getSavingsProgress();
  const fullyCompleted = progress.paidCount >= progress.totalAportes;
  const bonus = fullyCompleted ? 5 : 0;
  const total = progress.paidAmount + bonus;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Resumen y condiciones</Text>

        <Pressable onPress={() => router.push('/')} hitSlop={8}>
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heroLabel}>Tu aval disponible</Text>
        <Text style={styles.heroAmount}>S/ {total.toFixed(2)}</Text>
        <Text style={styles.heroNote}>Disponible para cubrir emergencias</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalle de tu aval</Text>

          <SummaryRow label="Monto liberado" value={`S/ ${progress.paidAmount.toFixed(2)}`} />
          {fullyCompleted && (
            <SummaryRow label="Bono por completar tu reto" value={`+S/ ${bonus.toFixed(2)}`} />
          )}
          <SummaryRow label="Total disponible" value={`S/ ${total.toFixed(2)}`} highlight />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalle de disponibilidad</Text>

          <SummaryRow label="Disponible desde" value="Hoy" />
          <SummaryRow label="Forma de acceso" value="Retiro directo a tu Yape" />
          <SummaryRow label="Uso recomendado" value="Emergencias" />
        </View>

        <InfoNote
          lead="Importante:"
          text="Puedes usar este monto cuando lo necesites, sin pedir un préstamo nuevo ni afectar tu historial."
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  scroll: {
    flex: 1,
  },
  content: layout.screenContent,
  heroLabel: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  heroAmount: {
    fontSize: 44,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  heroNote: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
});
