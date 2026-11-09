import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

type ReceiptTopBarProps = {
  showIcon?: boolean;
};

export function ReceiptTopBar({ showIcon = true }: ReceiptTopBarProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {showIcon ? (
        <View style={styles.iconBox}>
          <Image
            source={require('../../../assets/illustrations/coin-stack.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View />
      )}

      <Pressable style={styles.closeButton} onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="close" size={22} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radii.card,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
