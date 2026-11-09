import { Image, StyleSheet, type ImageSourcePropType } from 'react-native';

import { radii } from '@/theme/radii';

type ImagePromoCardProps = {
  image: ImageSourcePropType;
};

export function ImagePromoCard({ image }: ImagePromoCardProps) {
  return <Image source={image} style={styles.card} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    borderRadius: radii.card,
  },
});
