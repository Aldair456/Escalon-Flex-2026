import { router, type Href } from 'expo-router';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type QuickActionItemProps = {
  label: string;
  image: ImageSourcePropType;
  route?: string;
  badge?: string;
};

export function QuickActionItem({ label, image, route, badge }: QuickActionItemProps) {
  return (
    <Pressable
      style={styles.container}
      disabled={!route}
      onPress={() => route && router.push(route as Href)}>
      <View style={styles.iconWrapper}>
        <Image source={image} style={styles.icon} resizeMode="cover" />

        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: radii.card,
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginBottom: 6,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: colors.badge,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.primaryDark,
    fontSize: 9,
    fontWeight: '800',
  },
  label: {
    color: colors.white,
    fontSize: 11,
    textAlign: 'center',
  },
});
