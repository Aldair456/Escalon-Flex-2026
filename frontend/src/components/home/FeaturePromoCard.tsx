import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type FeaturePromoCardProps = {
  badge: string;
  eyebrow: string;
  heading: string;
  disclaimer: string;
};

export function FeaturePromoCard({ badge, eyebrow, heading, disclaimer }: FeaturePromoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>

        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.disclaimer}>{disclaimer}</Text>
      </View>

      <View style={styles.iconBox}>
        <Image
          source={require('../../../assets/illustrations/credit-steps.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F2FC',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  content: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  eyebrow: {
    fontSize: 14,
    color: colors.text,
  },
  heading: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  disclaimer: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 12,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
