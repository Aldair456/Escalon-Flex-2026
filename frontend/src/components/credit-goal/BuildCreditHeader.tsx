import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

type BuildCreditHeaderProps = {
  title: string;
};

export function BuildCreditHeader({ title }: BuildCreditHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Pressable style={styles.sideButton} onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.sideButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  sideButton: {
    width: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
