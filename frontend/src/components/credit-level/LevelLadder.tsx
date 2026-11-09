import { Image, type ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type LevelLadderProps = {
  title: string;
  image?: ImageSourcePropType;
};

export function LevelLadder({ title, image }: LevelLadderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Image
        source={image ?? require('../../../assets/illustrations/level-ladder.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 18,
    marginTop: 16,
  },
  title: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 140,
  },
});
