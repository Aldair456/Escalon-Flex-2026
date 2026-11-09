import { ScrollView, StyleSheet, View } from 'react-native';
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
});
