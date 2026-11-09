import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

export function TopBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={28} color={colors.white} />

      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hola, Lucia</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Gratis</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Ionicons name="headset-outline" size={24} color={colors.white} />
        <Ionicons name="notifications-outline" size={24} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greetingText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.badge,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
