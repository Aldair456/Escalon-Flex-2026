import { ScrollView, StyleSheet, View } from 'react-native';

import { NotificationItem } from '@/components/notifications/NotificationItem';
import { notifications } from '@/components/notifications/notifications.data';
import { NotificationsHeader } from '@/components/notifications/NotificationsHeader';

export default function P10() {
  return (
    <View style={styles.container}>
      <NotificationsHeader />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEFA',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
});
