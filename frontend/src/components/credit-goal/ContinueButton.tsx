import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

type ContinueButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: keyof typeof Ionicons.glyphMap;
  showArrow?: boolean;
};

export function ContinueButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  showArrow,
}: ContinueButtonProps) {
  const isSecondary = variant === 'secondary';
  const contentColor = isSecondary ? colors.primary : colors.white;

  return (
    <Pressable
      style={[styles.button, isSecondary ? styles.buttonSecondary : styles.buttonPrimary]}
      onPress={onPress}>
      {icon && <Ionicons name={icon} size={18} color={contentColor} />}
      <Text style={[styles.label, isSecondary && styles.labelSecondary]}>{label}</Text>
      {showArrow && <Ionicons name="arrow-forward" size={18} color={contentColor} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: radii.card,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: colors.accent,
    ...shadows.button,
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  label: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  labelSecondary: {
    color: colors.primary,
  },
});
