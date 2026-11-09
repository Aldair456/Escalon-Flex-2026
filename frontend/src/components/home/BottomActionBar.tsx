import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

export function BottomActionBar() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.outlineButton}>
        <Ionicons name="qr-code-outline" size={18} color={colors.accent} />
        <Text style={styles.outlineButtonText}>Escanear QR</Text>
      </Pressable>

      <Pressable style={styles.filledButton}>
        <Ionicons name="paper-plane-outline" size={18} color={colors.white} />
        <Text style={styles.filledButtonText}>Yapear</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  outlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
  },
  outlineButtonText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 15,
  },
  filledButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
  },
  filledButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
