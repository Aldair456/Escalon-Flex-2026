import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export default function CreditNotAvailableScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="close" size={26} color={colors.white} />
        </Pressable>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="wallet-outline" size={44} color={colors.white} />
          <View style={styles.badge}>
            <Ionicons name="alert" size={13} color={colors.white} />
          </View>
        </View>

        <Text style={styles.heading}>Por el momento, no podemos ofrecerte un crédito</Text>
        <Text style={styles.paragraph}>
          ¡No te desanimes!, construye un historial de ahorro y prepárate para una futura evaluación.
          Esperamos contar contigo más adelante.
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/p1')}>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NUEVO</Text>
          </View>
          <Text style={styles.primaryLabel}>Construye tu perfil financiero</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryLabel}>Conoce cómo funciona</Text>
        </Pressable>

        <Pressable style={styles.homeLink} onPress={() => router.replace('/')}>
          <Text style={styles.homeLinkText}>Ir a inicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  badge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: colors.text,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newBadgeText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttons: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  primaryLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.card,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  homeLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  homeLinkText: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
