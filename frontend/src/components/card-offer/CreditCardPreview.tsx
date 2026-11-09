import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type CreditCardPreviewProps = {
  maskedNumber: string;
  holderName: string;
};

export function CreditCardPreview({ maskedNumber, holderName }: CreditCardPreviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomRight} />

      <Text style={styles.label}>Tarjeta de crédito</Text>

      <View style={styles.chip} />

      <View style={styles.footer}>
        <Text style={styles.number}>•••• {maskedNumber}</Text>
        <Text style={styles.holder}>{holderName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A0B3D',
    borderRadius: radii.card,
    padding: 22,
    height: 230,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  circleTopRight: {
    position: 'absolute',
    top: -36,
    right: -36,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primary,
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: -50,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1F6F78',
  },
  label: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  chip: {
    width: 44,
    height: 32,
    borderRadius: 7,
    backgroundColor: '#D4AF5A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
  },
  holder: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
