import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

import type { NotificationEntry } from './notifications.data';

type NotificationItemProps = {
  notification: NotificationEntry;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const { title, description, timestamp, unread, icon, iconColor, iconBackground } = notification;

  return (
    <View style={[styles.container, unread && styles.containerUnread]}>
      {unread && <View style={styles.unreadDot} />}

      <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={26} color={iconColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 16,
    ...shadows.card,
  },
  containerUnread: {
    backgroundColor: '#F8F3FC',
  },
  unreadDot: {
    position: 'absolute',
    left: -4,
    top: '50%',
    marginTop: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: radii.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
});
