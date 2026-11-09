import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';

type UsageChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function UsageChip({ label, selected, onPress, icon }: UsageChipProps) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      {icon && (
        <Ionicons name={icon} size={14} color={selected ? colors.white : colors.primary} style={styles.icon} />
      )}
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    ...shadows.card,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    shadowOpacity: 0.12,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  labelSelected: {
    color: colors.white,
  },
});
