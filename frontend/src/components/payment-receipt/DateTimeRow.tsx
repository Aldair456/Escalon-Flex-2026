import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type DateTimeRowProps = {
  date: string;
  time: string;
};

export function DateTimeRow({ date, time }: DateTimeRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
        <Text style={styles.text}>{date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Ionicons name="time-outline" size={16} color={colors.textMuted} />
        <Text style={styles.text}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: colors.border,
  },
  text: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
