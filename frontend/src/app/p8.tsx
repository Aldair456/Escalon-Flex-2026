import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { FaqItem } from '@/components/progress-overview/FaqItem';
import { faqEntries } from '@/components/progress-overview/faq.data';
import { ProgressOverviewCard } from '@/components/progress-overview/ProgressOverviewCard';
import { StreakCard } from '@/components/progress-overview/StreakCard';
import { getSavingsProgress } from '@/state/savingsPlan';
import { colors } from '@/theme/colors';

export default function P8() {
  const progress = getSavingsProgress();

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Mi avance" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <ProgressOverviewCard
          progress={progress.paidCount / progress.totalAportes}
          completed={progress.paidCount}
          total={progress.totalAportes}
          levelLabel={progress.levelLabel}
          savedAmount={`S/ ${progress.paidAmount}`}
        />

        <Pressable style={styles.editPlanLink} onPress={() => router.push('/p27')}>
          <Text style={styles.editPlanLinkText}>Editar mi plan de ahorro</Text>
        </Pressable>

        <StreakCard streak={progress.paidCount} nextDueDate={progress.nextInstallment?.date} />

        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Preguntas frecuentes</Text>

          {faqEntries.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              defaultOpen={item.defaultOpen}
            />
          ))}
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
  content: {
    paddingBottom: 20,
  },
  editPlanLink: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editPlanLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  faqSection: {
    paddingHorizontal: 20,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
});
