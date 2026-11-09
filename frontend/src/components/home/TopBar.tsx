import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { notifications } from '@/components/notifications/notifications.data';
import { colors } from '@/theme/colors';

export function TopBar() {
  const unreadCount = notifications.filter((item) => item.unread).length;

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

        <Pressable onPress={() => router.push('/p10')} hitSlop={8}>
          <Ionicons name="notifications-outline" size={24} color={colors.white} />

          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>
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
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '800',
  },
});
