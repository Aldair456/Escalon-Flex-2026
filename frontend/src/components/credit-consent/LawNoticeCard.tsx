import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type LawNoticeCardProps = {
  badge: string;
  children: ReactNode;
};

export function LawNoticeCard({ badge, children }: LawNoticeCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3EEFA',
    borderRadius: radii.card,
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.text,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
