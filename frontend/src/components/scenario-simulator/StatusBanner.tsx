import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

export type BannerStatus = 'ok' | 'tight' | 'risk';

type StatusBannerProps = {
  status: BannerStatus;
  title: string;
  message: string;
};

const STATUS_STYLES: Record<BannerStatus, { background: string; accent: string; icon: keyof typeof Ionicons.glyphMap }> = {
  ok: { background: '#E6F7F4', accent: colors.accent, icon: 'checkmark-circle' },
  tight: { background: '#FEF3C7', accent: '#B45309', icon: 'alert-circle' },
  risk: { background: '#FEE2E2', accent: '#DC2626', icon: 'warning' },
};

export function StatusBanner({ status, title, message }: StatusBannerProps) {
  const style = STATUS_STYLES[status];

  return (
    <View style={[styles.container, { backgroundColor: style.background }]}>
      <Ionicons name={style.icon} size={22} color={style.accent} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: style.accent }]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: radii.card,
    padding: 16,
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
});
