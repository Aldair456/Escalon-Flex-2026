import { Image, StyleSheet, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { colors } from '@/theme/colors';

type AnalyzingRingProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
};

export function AnalyzingRing({ progress, size = 240, strokeWidth = 10 }: AnalyzingRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.ring}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#CFF1EC"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Image
        source={require('../../../assets/illustrations/analyzing-mascot.png')}
        style={styles.mascot}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  mascot: {
    width: '62%',
    height: '62%',
  },
});
