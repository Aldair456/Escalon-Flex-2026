import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const CHECKLIST = [
  'Montos pequeños y flexibles',
  'Plazos que se ajustan a ti',
  'Tasas claras y sin sorpresas',
];

export default function P30() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.logo}>yape</Text>
        <View style={styles.headerSpacer} />
      </SafeAreaView>

      <View style={styles.content}>
        <Text style={styles.heading}>Simulador de microcrédito</Text>
        <Text style={styles.subheading}>Conoce una opción de crédito según tu perfil y simula tus pagos.</Text>

        <Image
          source={require('../../assets/illustrations/credit-simulator-mascot.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <View style={styles.card}>
          {CHECKLIST.map((item) => (
            <View key={item} style={styles.checklistRow}>
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={14} color={colors.white} />
              </View>
              <Text style={styles.checklistText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => router.push('/p31')}>
        <Text style={styles.buttonText}>Simular crédito</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  logo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    fontStyle: 'italic',
    color: colors.white,
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  mascot: {
    width: 220,
    height: 191,
    marginBottom: 8,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 20,
    gap: 16,
    ...shadows.card,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.accent,
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
