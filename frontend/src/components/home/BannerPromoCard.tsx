import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type BannerPromoCardProps = {
  badge: string;
  title: string;
  description: string;
  background: string;
};

export function BannerPromoCard({ badge, title, description, background }: BannerPromoCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: background }]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    borderRadius: radii.card,
    padding: 14,
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: colors.white,
    fontSize: 12,
    marginTop: 2,
  },
});
