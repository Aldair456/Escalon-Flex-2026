import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceSection } from '@/components/home/BalanceSection';
import { BottomActionBar } from '@/components/home/BottomActionBar';
import { PromoCarousel } from '@/components/home/PromoCarousel';
import { QuickActionsGrid } from '@/components/home/QuickActionsGrid';
import { SearchBar } from '@/components/home/SearchBar';
import { TopBar } from '@/components/home/TopBar';
import { colors } from '@/theme/colors';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView edges={['top']} style={styles.purpleSection}>
          <TopBar />
          <SearchBar />
          <QuickActionsGrid />
          <PromoCarousel />
        </SafeAreaView>

        <View style={styles.whiteSection}>
          <BalanceSection />
        </View>
      </ScrollView>

      <BottomActionBar />

      <Pressable style={styles.devButton} onPress={() => router.push('/p1')}>
        <Text style={styles.devButtonText}>P1</Text>
      </Pressable>

      <Pressable style={[styles.devButton, styles.devButtonP2]} onPress={() => router.push('/p2')}>
        <Text style={styles.devButtonText}>P2</Text>
      </Pressable>

      <Pressable style={[styles.devButton, styles.devButtonP3]} onPress={() => router.push('/p3')}>
        <Text style={styles.devButtonText}>P3</Text>
      </Pressable>

      <Pressable style={[styles.devButton, styles.devButtonP4]} onPress={() => router.push('/p4')}>
        <Text style={styles.devButtonText}>P4</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  purpleSection: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  whiteSection: {
    paddingBottom: 20,
  },
  devButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: colors.text,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 50,
  },
  devButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  devButtonP2: {
    top: 88,
  },
  devButtonP3: {
    top: 126,
  },
  devButtonP4: {
    top: 164,
  },
});
