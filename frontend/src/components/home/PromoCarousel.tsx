import { ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@/theme/colors';

import { BannerPromoCard } from './BannerPromoCard';
import { FeaturePromoCard } from './FeaturePromoCard';
import { ImagePromoCard } from './ImagePromoCard';
import { promos } from './promos.data';

export function PromoCarousel() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {promos.map((promo) => {
          if (promo.variant === 'feature') {
            return (
              <FeaturePromoCard
                key={promo.id}
                badge={promo.badge}
                eyebrow={promo.eyebrow}
                heading={promo.heading}
                disclaimer={promo.disclaimer}
              />
            );
          }

          if (promo.variant === 'image') {
            return <ImagePromoCard key={promo.id} image={promo.image} />;
          }

          return (
            <BannerPromoCard
              key={promo.id}
              badge={promo.badge}
              title={promo.title}
              description={promo.description}
              background={promo.background}
            />
          );
        })}
      </ScrollView>

      <View style={styles.dots}>
        {promos.map((promo, index) => (
          <View key={promo.id} style={[styles.dot, index === 0 && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dot,
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 16,
  },
});
