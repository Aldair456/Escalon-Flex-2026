import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/theme/colors';

type HabitsGaugeProps = {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy - r * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = startAngle - endAngle >= 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function HabitsGauge({ value, max, size = 160, strokeWidth = 16 }: HabitsGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const progress = Math.min(1, Math.max(0, value / max));
  const endAngle = 180 - progress * 180;

  const trackPath = describeArc(cx, cy, radius, 180, 0);
  const progressPath = describeArc(cx, cy, radius, 180, endAngle);

  return (
    <View style={[styles.container, { width: size, height: size / 2 + strokeWidth }]}>
      <Svg width={size} height={size / 2 + strokeWidth}>
        <Defs>
          <LinearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.accent} />
            <Stop offset="1" stopColor="#8CE0C9" />
          </LinearGradient>
        </Defs>

        <Path d={trackPath} stroke={colors.border} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        {progress > 0 && (
          <Path
            d={progressPath}
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>

      <View style={styles.labelContainer}>
        <Text style={styles.value}>
          {value}
          <Text style={styles.max}> / {max.toLocaleString('es-PE')}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 4,
    alignItems: 'center',
  },
  value: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  max: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
