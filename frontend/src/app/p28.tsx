import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HabitsGauge } from '@/components/progress-overview/HabitsGauge';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

const HABITS_CHECKLIST = [
  { id: 'ahorro', label: 'Ahorro constante', done: true },
  { id: 'pagos', label: 'Pagos puntuales', done: true },
  { id: 'actividad', label: 'Actividad en Yape', done: true },
  { id: 'historial', label: 'Más historial', done: false },
];

const BEHAVIOR_STATS = [
  { id: 'ahorro', value: '92%', label: 'de cumplimiento', title: 'Ahorro' },
  { id: 'aportes', value: '10 de 12', label: '', title: 'Aportes a tiempo' },
  { id: 'reprogramaciones', value: '2', label: '', title: 'Reprogramaciones' },
];

const LEVELS = [
  { id: 1, label: 'Escalón 1', sublabel: 'Inicio', status: 'done' as const },
  { id: 2, label: 'Escalón 2', sublabel: 'Constancia', status: 'done' as const },
  { id: 3, label: 'Escalón 3', sublabel: 'Buen manejo', status: 'current' as const },
  { id: 4, label: 'Escalón 4', sublabel: 'Listo para reevaluación', status: 'locked' as const },
];

export default function P28() {
  return (
    <View style={styles.container}>
      <View style={styles.purpleSection}>
        <SafeAreaView edges={['top']} style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={25} color={colors.white} />
          </Pressable>
        </SafeAreaView>

        <Text style={styles.headerTitle}>Mi perfil financiero</Text>

        <View style={styles.profileRow}>
          <Image
            source={require('../../assets/illustrations/profile-avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
          />

          <View style={styles.profileText}>
            <Text style={styles.profileName}>Aldair Seminario</Text>

            <View style={styles.levelPill}>
              <Ionicons name="diamond" size={20} color={colors.badge} />
              <Text style={styles.levelPillText}>Escalón 3 · Constante</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Índice de hábitos */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Índice de hábitos financieros</Text>
            <Ionicons name="information-circle-outline" size={20} color={colors.textMuted} />
          </View>

          <View style={styles.gaugeRow}>
            <HabitsGauge value={720} max={1000} size={180} strokeWidth={18} />

            <View style={styles.checklist}>
              {HABITS_CHECKLIST.map((item) => (
                <View key={item.id} style={styles.checklistRow}>
                  {item.done ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                  ) : (
                    <View style={styles.checklistEmpty} />
                  )}
                  <Text style={[styles.checklistText, !item.done && styles.checklistTextMuted]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.growthPill}>
            <Text style={styles.growthPillText}>En crecimiento</Text>
            <Ionicons name="rocket" size={15} color={colors.accent} />
          </View>
        </View>

        {/* Comportamiento */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu comportamiento (últimos 6 meses)</Text>

          <View style={styles.behaviorRow}>
            {BEHAVIOR_STATS.map((stat) => (
              <View key={stat.id} style={styles.behaviorColumn}>
                {stat.id === 'ahorro' && (
                  <MaterialCommunityIcons name="piggy-bank-outline" size={28} color={colors.primary} />
                )}
                {stat.id === 'aportes' && <Ionicons name="calendar-outline" size={28} color={colors.primary} />}
                {stat.id === 'reprogramaciones' && (
                  <Ionicons name="swap-horizontal-outline" size={28} color={colors.primary} />
                )}
                <Text style={styles.behaviorValue}>{stat.value}</Text>
                <Text style={styles.behaviorTitle}>{stat.title}</Text>
                {!!stat.label && <Text style={styles.behaviorLabel}>{stat.label}</Text>}
              </View>
            ))}
          </View>
        </View>

        {/* Progreso Escalón Flex */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu progreso en Escalón Flex</Text>

          <View style={styles.stepperRow}>
            {LEVELS.map((level, index) => (
              <View key={level.id} style={styles.stepperItem}>
                <View style={styles.stepperNodeRow}>
                  <View
                    style={[
                      styles.stepperNode,
                      level.status === 'done' && styles.stepperNodeDone,
                      level.status === 'current' && styles.stepperNodeCurrent,
                      level.status === 'locked' && styles.stepperNodeLocked,
                    ]}>
                    {level.status === 'done' && <Ionicons name="checkmark" size={16} color={colors.white} />}
                    {level.status === 'current' && (
                      <View style={styles.stepperNodeCurrentDot} />
                    )}
                    {level.status === 'locked' && (
                      <Ionicons name="lock-closed" size={14} color={colors.textMuted} />
                    )}
                  </View>

                  {index < LEVELS.length - 1 && (
                    <View
                      style={[
                        styles.stepperLine,
                        level.status === 'done' && styles.stepperLineDone,
                      ]}
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.stepperLabel,
                    level.status === 'current' && styles.stepperLabelCurrent,
                  ]}>
                  {level.label}
                </Text>
                <Text style={styles.stepperSublabel}>{level.sublabel}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.aiButton} onPress={() => router.push('/p29')}>
          <Text style={styles.aiButtonText}>Ver análisis con IA</Text>
          <Ionicons name="sparkles" size={18} color={colors.white} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  purpleSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingBottom: 32,
  },
  headerRow: {
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 22,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {},
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 12,
  },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 9,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  levelPillText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 22,
    marginTop: -12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 20,
    marginBottom: 18,
    ...shadows.card,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  gaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  growthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#E3F5F3',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 14,
  },
  growthPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accent,
  },
  checklist: {
    flex: 1,
    gap: 12,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  checklistEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  checklistText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  checklistTextMuted: {
    color: colors.textMuted,
  },
  behaviorRow: {
    flexDirection: 'row',
  },
  behaviorColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  behaviorValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginTop: 5,
  },
  behaviorTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  behaviorLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  stepperRow: {
    flexDirection: 'row',
  },
  stepperItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepperNodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  stepperNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  stepperNodeDone: {
    backgroundColor: colors.accent,
  },
  stepperNodeCurrent: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: '#E3D6EE',
  },
  stepperNodeCurrentDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  stepperNodeLocked: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepperLine: {
    position: 'absolute',
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.border,
  },
  stepperLineDone: {
    backgroundColor: colors.accent,
  },
  stepperLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    marginTop: 9,
    textAlign: 'center',
  },
  stepperLabelCurrent: {
    color: colors.primary,
  },
  stepperSublabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: colors.primary,
    borderRadius: radii.card,
    paddingVertical: 18,
    ...shadows.button,
  },
  aiButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
  },
});
