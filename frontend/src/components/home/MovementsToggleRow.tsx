import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type MovementsToggleRowProps = {
  visible: boolean;
  onToggle: () => void;
};

export function MovementsToggleRow({ visible, onToggle }: MovementsToggleRowProps) {
  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <View style={styles.left}>
        <Ionicons name="document-text-outline" size={20} color={colors.primary} />
        <Text style={styles.label}>{visible ? 'Ocultar movimientos' : 'Mostrar movimientos'}</Text>
      </View>

      <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
