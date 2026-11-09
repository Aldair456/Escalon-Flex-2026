import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFallbackAnalysis, getFinancialAnalysis, type FinancialAnalysis } from '@/api/aiAnalysis';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

export default function P29() {
  const [analysis, setAnalysis] = useState<FinancialAnalysis | null>(null);

  useEffect(() => {
    let cancelled = false;
    const progress = getSavingsProgress();

    getFinancialAnalysis(progress)
      .then((result) => {
        if (!cancelled) setAnalysis(result);
      })
      .catch((err) => {
        console.error('getFinancialAnalysis failed, using fallback:', err);
        if (!cancelled) setAnalysis(getFallbackAnalysis(progress));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.purpleSection}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={27} color={colors.white} />
          </Pressable>
        </SafeAreaView>

        <View style={styles.headingRow}>
          <Text style={styles.heading}>Análisis de tu perfil con IA</Text>
          <Ionicons name="sparkles" size={25} color={colors.white} />
        </View>
        <Text style={styles.subheading}>Basado en tus hábitos de ahorro y actividad en Yape.</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {!analysis && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Analizando tu comportamiento financiero...</Text>
          </View>
        )}

        {analysis && (
          <>
            {/* Mascota + burbuja */}
            <View style={styles.botRow}>
              <Image
                source={require('../../assets/illustrations/ai-robot-mascot.png')}
                style={styles.botAvatar}
                resizeMode="contain"
              />

              <View style={styles.botBubble}>
                <Text style={styles.botBubbleText}>{analysis.summary}</Text>
              </View>
            </View>

            {/* Lo que estás haciendo bien */}
            <View style={styles.card}>
              <View style={[styles.cardIcon, analysis.isPositive ? styles.cardIconGreen : styles.cardIconYellow]}>
                <Ionicons name={analysis.isPositive ? 'checkmark' : 'alert'} size={23} color={colors.white} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>
                  {analysis.isPositive ? 'Lo que estás haciendo bien' : 'Lo que podemos mejorar'}
                </Text>
                <Text style={styles.cardDescription}>{analysis.whatYoureDoingWell}</Text>
              </View>
            </View>

            {/* Nuestra recomendación */}
            <View style={styles.card}>
              <View style={[styles.cardIcon, styles.cardIconYellow]}>
                <Ionicons name="bulb" size={23} color={colors.white} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Nuestra recomendación</Text>
                <Text style={styles.cardDescription}>{analysis.recommendation}</Text>
              </View>
            </View>

            {/* Microcrédito */}
            <View style={styles.highlightCard}>
              <View style={styles.highlightIconWrap}>
                <FontAwesome5 name="coins" size={25} color={colors.white} />
                <Ionicons name="sparkles" size={16} color={colors.badge} style={styles.highlightSparkle} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.highlightTitle}>¿A qué podrías aspirar?</Text>
                <Text style={styles.cardDescription}>{analysis.microcreditText}</Text>
              </View>
            </View>

            {analysis.microcreditEligible && (
              <ContinueButton label="Compartir mi constancia con el BCP" />
            )}
            <ContinueButton label="Ver detalles del análisis" variant="secondary" />

            <View style={styles.disclaimerRow}>
              <Ionicons name="information-circle-outline" size={20} color={colors.textMuted} />
              <Text style={styles.disclaimerText}>
                Este análisis es orientativo y no representa una aprobación ni una oferta de crédito.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  purpleSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    paddingBottom: 10,
  },
  scroll: {
    flex: 1,
  },
  content: {
    ...layout.screenContent,
    marginTop: -8,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  heading: {
    fontSize: 27,
    fontWeight: '800',
    color: colors.white,
  },
  subheading: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 7,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 14,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 18,
    marginBottom: 22,
  },
  botAvatar: {
    width: 116,
    height: 104,
  },
  botBubble: {
    flex: 1,
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    padding: 18,
  },
  botBubbleText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 23,
  },
  card: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 18,
    marginBottom: 18,
    ...shadows.card,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconGreen: {
    backgroundColor: '#22C55E',
  },
  cardIconYellow: {
    backgroundColor: '#F2C94C',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  highlightCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    padding: 20,
    marginBottom: 26,
  },
  highlightIconWrap: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightSparkle: {
    position: 'absolute',
    top: -7,
    right: -7,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 5,
  },
  disclaimerRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 10,
    marginBottom: 22,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
