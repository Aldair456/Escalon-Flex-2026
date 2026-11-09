import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuildCreditHeader } from '@/components/credit-goal/BuildCreditHeader';
import { ContinueButton } from '@/components/credit-goal/ContinueButton';
import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';
import { layout } from '@/theme/layout';

const VIDEO_URL = 'https://www.tiktok.com/search?q=gota%20a%20gota%20prestamos';

export default function P23() {
  return (
    <View style={styles.container}>
      <BuildCreditHeader title="Notificación" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.paymentPill}>
          <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
          <Text style={styles.paymentPillText}>Pagaste S/ 50 · Cuota 4 de 6</Text>
        </View>

        <View style={styles.speechRow}>
          <Image
            source={require('../../assets/illustrations/shield-mascot.png')}
            style={styles.mascot}
            resizeMode="contain"
          />

          <View style={styles.bubble}>
            <View style={styles.bubblePointer} />
            <Text style={styles.bubbleText}>
              El &ldquo;gota a gota&rdquo; cobra hasta{' '}
              <Text style={styles.bubbleHighlight}>20% de interés AL DÍA</Text>, no está regulado, y si
              te atrasas usa <Text style={styles.bubbleHighlight}>cobros agresivos</Text>. Con nosotros,
              no.
            </Text>
          </View>
        </View>

        <Pressable style={styles.videoCard} onPress={() => Linking.openURL(VIDEO_URL)}>
          <Image
            source={require('../../assets/promos/gota-a-gota-video-thumb.png')}
            style={styles.videoThumb}
            resizeMode="cover"
          />
          <View style={styles.playButton}>
            <Ionicons name="play" size={22} color={colors.white} />
          </View>
        </Pressable>
        <Text style={styles.videoCaption}>📹 Lección: Cuidado con el Gota a Gota · Toca para ver</Text>
      </ScrollView>

      <ContinueButton label="Seguir construyendo mi historial" onPress={() => router.back()} />
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
  content: {
    ...layout.screenContent,
    alignItems: 'center',
  },
  paymentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  paymentPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  speechRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mascot: {
    width: 110,
    height: 120,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#F3EEFA',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginLeft: 14,
  },
  bubblePointer: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -8,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#F3EEFA',
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 20,
  },
  bubbleHighlight: {
    color: '#DC2626',
    fontWeight: '800',
  },
  videoCard: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radii.card,
    overflow: 'hidden',
    marginTop: 4,
    backgroundColor: colors.border,
  },
  videoThumb: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -28,
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCaption: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
  },
});
