import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

type ConsentHeaderProps = {
  title: string;
  step: string;
};

export function ConsentHeader({ title, step }: ConsentHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.step}>{step}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  step: {
    color: colors.white,
    fontSize: 14,
  },
});
