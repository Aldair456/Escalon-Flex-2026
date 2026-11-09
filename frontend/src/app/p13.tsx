import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnalysisStepRow } from '@/components/profile-analysis/AnalysisStepRow';
import { analysisSteps } from '@/components/profile-analysis/analysisSteps.data';
import { AnalyzingRing } from '@/components/profile-analysis/AnalyzingRing';
import { colors } from '@/theme/colors';

export default function P13() {
  return (
    <Pressable style={styles.container} onPress={() => router.push('/p3')}>
      <SafeAreaView edges={['top']} style={styles.topBar} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        scrollEnabled={false}
        pointerEvents="none">
        <View style={styles.ringWrapper}>
          <AnalyzingRing progress={0.82} />
        </View>

        <Text style={styles.heading}>Estamos analizando tu perfil...</Text>
        <Text style={styles.subheading}>Esto toma unos segundos, no cierres la app.</Text>

        <View style={styles.steps}>
          {analysisSteps.map((step) => (
            <AnalysisStepRow key={step.id} step={step} />
          ))}
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEFA',
  },
  topBar: {
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  ringWrapper: {
    marginTop: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  steps: {
    width: '100%',
  },
});
