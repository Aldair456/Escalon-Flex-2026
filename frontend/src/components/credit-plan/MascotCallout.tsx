import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { shadows } from '@/theme/shadows';

type MascotCalloutProps = {
  title: string;
  description: string;
};

export function MascotCallout({ title, description }: MascotCalloutProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/illustrations/mascot-wave.png')}
        style={styles.mascot}
        resizeMode="contain"
      />

      <View style={styles.tail} />

      <View style={styles.bubble}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  mascot: {
    width: 76,
    height: 93,
    zIndex: 1,
  },
  tail: {
    width: 14,
    height: 14,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    transform: [{ rotate: '45deg' }],
    marginLeft: -7,
    marginRight: -7,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radii.card,
    padding: 14,
    ...shadows.card,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
});
