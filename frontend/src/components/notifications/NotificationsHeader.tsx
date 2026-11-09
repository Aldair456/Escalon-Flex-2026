import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

export function NotificationsHeader() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Pressable onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="arrow-back" size={26} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>Notificaciones</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
  },
});
