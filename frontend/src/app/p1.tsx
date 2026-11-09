import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { GoalOptionCard } from '@/components/credit-goal/GoalOptionCard';
import { creditGoalOptions, creditUsageOptions } from '@/components/credit-goal/goals.data';
import { StepProgress } from '@/components/credit-goal/StepProgress';
import { UsageChip } from '@/components/credit-goal/UsageChip';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P1() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedUsages, setSelectedUsages] = useState<string[]>([]);

  const toggleUsage = (id: string) => {
    setSelectedUsages((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Construye crédito" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <StepProgress current={1} total={3} />
        <Text style={styles.heading}>¿Para qué quieres construir tu crédito?</Text>

        {creditGoalOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            label={option.label}
            icon={option.icon}
            selected={selectedGoal === option.id}
            onPress={() => setSelectedGoal(option.id)}
          />
        ))}

        <Text style={styles.subheading}>¿Para qué lo usarías?</Text>

        <View style={styles.chips}>
          {creditUsageOptions.map((option) => (
            <UsageChip
              key={option.id}
              label={option.label}
              selected={selectedUsages.includes(option.id)}
              onPress={() => toggleUsage(option.id)}
            />
          ))}
        </View>

        <Image
          source={require('../../assets/illustrations/credit-goal-mascot-sitting.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </ScrollView>

      <ContinueButton label="Continuar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: layout.screenContent,
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 8,
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mascot: {
    width: 240,
    height: 232,
    alignSelf: 'center',
    marginTop: 24,
  },
});
