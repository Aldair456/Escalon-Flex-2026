import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const faqEntries = [
  {
    id: 'obtener',
    question: '¿Cómo obtengo mi crédito?',
    answer: 'Tú decides el monto, la fecha de pago y en cuántas cuotas pagar.',
  },
  {
    id: 'pagar',
    question: '¿Cómo pago mi crédito?',
    answer: 'Lo cobraremos de tu saldo en Yape. Si no, puedes pagarlo en una agencia BCP.',
  },
];

export default function P0() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView edges={['top']} style={styles.hero}>
          <View style={styles.headerRow}>
            <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <Text style={styles.headerTitle}>Créditos Yape</Text>
          </View>

          <View style={styles.heroBody}>
            <View style={styles.heroText}>
              <Text style={styles.heading}>Por ahora no tienes una campaña de crédito.</Text>
              <Text style={styles.subheading}>¡Te mantendremos al tanto!</Text>
            </View>

            <Image
              source={require('../../assets/illustrations/credit-campaign-search.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonsRow}>
            <Pressable style={styles.infoButton}>
              <Text style={styles.infoButtonText}>Más información</Text>
            </Pressable>

            <Pressable style={styles.secondaryPill} onPress={() => router.push('/p1')}>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>Nuevo</Text>
              </View>
              <Text style={styles.secondaryPillText}>Construye tu perfil financiero</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resuelve tus dudas</Text>

          {faqEntries.map((item, index) => (
            <View key={item.id}>
              <View style={styles.faqRow}>
                <View style={styles.faqIcon}>
                  <Text style={styles.faqIconText}>S/</Text>
                </View>
                <View style={styles.faqBody}>
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
              </View>
              {index < faqEntries.length - 1 && <View style={styles.faqDivider} />}
            </View>
          ))}

          <Pressable style={styles.seeMore}>
            <Text style={styles.seeMoreText}>Ver más</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.accent} />
          </Pressable>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  heroBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroText: {
    flex: 1,
    paddingRight: 12,
  },
  heading: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 10,
  },
  subheading: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  infoButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...shadows.button,
  },
  infoButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  secondaryPill: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...shadows.button,
  },
  secondaryPillText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: colors.badge,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newBadgeText: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  illustration: {
    width: 110,
    height: 110,
  },
  card: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 12,
    ...shadows.card,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  faqRow: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  faqIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  faqIconText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  faqBody: {
    flex: 1,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 19,
  },
  faqDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  seeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  seeMoreText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 15,
  },
});
