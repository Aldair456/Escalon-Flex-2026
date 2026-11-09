import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

type GoalOptionCardProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

export function GoalOptionCard({ label, icon, selected, onPress }: GoalOptionCardProps) {
  return (
    <Pressable style={[styles.container, selected && styles.containerSelected]} onPress={onPress}>
      <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
        <Ionicons name={icon} size={20} color={colors.white} />
      </View>

      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: radii.card,
    padding: 14,
    marginBottom: 12,
    ...shadows.card,
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F6F1FA',
    shadowOpacity: 0.1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  labelSelected: {
    fontWeight: '700',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});
