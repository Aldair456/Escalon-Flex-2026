import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConsentHeader } from '@/components/credit-consent/ConsentHeader';
import { LawNoticeCard } from '@/components/credit-consent/LawNoticeCard';
import { ToggleRow } from '@/components/credit-consent/ToggleRow';
import { dataUsageItems, visibilityItems } from '@/components/credit-consent/consent.data';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { colors } from '@/theme/colors';
import { layout } from '@/theme/layout';
import { radii } from '@/theme/radii';

export default function P2() {
  const [dataUsage, setDataUsage] = useState<Record<string, boolean>>(
    Object.fromEntries(dataUsageItems.map((item) => [item.id, item.defaultOn])),
  );
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(visibilityItems.map((item) => [item.id, item.defaultOn])),
  );

  return (
    <View style={styles.container}>
      <ConsentHeader title="Tú decides qué compartir" step="Paso 2 de 3" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <LawNoticeCard badge="Ley N° 29733">
          Usamos tus datos <Text style={styles.bold}>solo para armar tu reto</Text>. No los
          compartimos con otros bancos y puedes cambiar esto cuando quieras.
        </LawNoticeCard>

        <Text style={styles.sectionTitle}>Qué datos usamos</Text>
        <View style={styles.card}>
          {dataUsageItems.map((item, index) => (
            <ToggleRow
              key={item.id}
              title={item.title}
              description={item.description}
              value={dataUsage[item.id]}
              onValueChange={(value) => setDataUsage((current) => ({ ...current, [item.id]: value }))}
              showBorder={index < dataUsageItems.length - 1}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quién lo ve</Text>
        <View style={styles.card}>
          {visibilityItems.map((item, index) => (
            <ToggleRow
              key={item.id}
              title={item.title}
              description={item.description}
              value={visibility[item.id]}
              onValueChange={(value) => setVisibility((current) => ({ ...current, [item.id]: value }))}
              disabled={item.locked}
              showBorder={index < visibilityItems.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      <ContinueButton label="Acepto y continúo" />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
});
