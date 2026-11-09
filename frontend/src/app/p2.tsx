import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConsentHeader } from '@/components/credit-consent/ConsentHeader';
import { LawNoticeCard } from '@/components/credit-consent/LawNoticeCard';
import { dataUsageItems, visibilityItems } from '@/components/credit-consent/consent.data';
import { ToggleSection } from '@/components/credit-consent/ToggleSection';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';

export default function P2() {
  const [dataUsage, setDataUsage] = useState<Record<string, boolean>>(
    Object.fromEntries(dataUsageItems.map((item) => [item.id, item.defaultOn])),
  );
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(visibilityItems.map((item) => [item.id, item.defaultOn])),
  );

  return (
    <View style={styles.container}>
      <ConsentHeader title="Tú decides qué compartir" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <LawNoticeCard badge="Ley N° 29733">
          Usamos tus datos <Text style={styles.bold}>solo para armar tu reto</Text>. No los
          compartimos con otros bancos y puedes cambiar esto cuando quieras.
        </LawNoticeCard>

        <ToggleSection
          title="Qué datos usamos"
          items={dataUsageItems}
          values={dataUsage}
          onToggle={(id, value) => setDataUsage((current) => ({ ...current, [id]: value }))}
        />

        <ToggleSection
          title="Quién lo ve"
          items={visibilityItems}
          values={visibility}
          onToggle={(id, value) => setVisibility((current) => ({ ...current, [id]: value }))}
        />
      </ScrollView>

      <ContinueButton label="Acepto y continúo" onPress={() => router.push('/p18')} />
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
  bold: {
    fontWeight: '800',
  },
});
