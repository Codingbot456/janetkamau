// GalleryScreen.js (src/components/screens/Gallery/GalleryScreen.js)
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import PageBanner from '../about/banner/PageBanner';
import SideRow from '../agenda/side/SideRow';
import { Section } from '../../common/ui/ui';
import { GALLERY_PAGE as P, GALLERY_CATEGORIES, GALLERY_PHOTOS } from './content/galleryContent';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout } from '../../../styles/globalStyles';

// Sharp Filter Chip
const Chip = ({ label, active, onPress }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected: active }}
    style={({ hovered }) => [s.chip, active && s.chipActive, hovered && !active && { borderColor: colors.green }]}
  >
    <Text style={[s.chipText, active && { color: colors.white }]}>{label}</Text>
  </Pressable>
);

// Gallery Card Component
const GalleryCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  const openSocialPost = () => {
    if (item.postUrl) {
      Linking.openURL(item.postUrl);
    }
  };

  return (
    <Pressable onPress={openSocialPost} accessibilityRole="link" accessibilityLabel={item.caption}>
      {({ hovered }) => (
        <View style={[s.card, hovered && { borderColor: colors.green }]}>
          <View style={s.imageWrap}>
            {item.image && !imgError ? (
              <Image
                source={item.image}
                style={s.image}
                resizeMode="cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <View style={[s.image, s.fallback]}>
                <MaterialCommunityIcons name="facebook" size={48} color={colors.white} />
              </View>
            )}
            
            {/* Top Right Social Media Badge */}
            <View style={s.socialBadge}>
              <MaterialCommunityIcons name="facebook" size={16} color={colors.white} />
            </View>
          </View>

          <View style={s.captionContainer}>
            <View style={s.metaRow}>
              <Text style={s.categoryTag}>{item.category}</Text>
              <Text style={s.viewPostText}>View Post →</Text>
            </View>
            <Text style={s.captionText} numberOfLines={3}>
              {item.caption}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const GalleryScreen = () => {
  const { width } = useWindowDimensions();
  const [cat, setCat] = useState('All');

  const photos = useMemo(
    () => (cat === 'All' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === cat)),
    [cat]
  );

  // Responsive Grid Column Count
  // 1 column on Mobile (< 600px), 2 on Tablet (< 900px), 3 on Desktop
  const cols = width < 600 ? 1 : width < 900 ? 2 : 3;

  return (
    <PageLayout>
      <PageBanner label={P.label} title={P.title} crumbs={[{ label: 'Home', route: 'Home' }, { label: P.title }]} />

      <Section>
        {/* Category Filter Title & Horizontally Scrollable Filter Chips */}
        <View style={s.filterContainer}>
          <Text style={s.filterLabel}>{P.filterLabel}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={s.chipsScroll}
          >
            <Chip label={P.allLabel} active={cat === 'All'} onPress={() => setCat('All')} />
            {GALLERY_CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={cat === c} onPress={() => setCat(c)} />
            ))}
          </ScrollView>
        </View>

        {/* Responsive Grid Layout */}
        {photos.length ? (
          <View style={s.grid}>
            {photos.map((p) => (
              <View key={p.id} style={{ width: `${100 / cols}%`, padding: 8 }}>
                <GalleryCard item={p} />
              </View>
            ))}
          </View>
        ) : (
          <View style={s.emptyBox}>
            <Text style={g.text}>No photos found in this category.</Text>
          </View>
        )}
      </Section>

      <SideRow />
    </PageLayout>
  );
};

const s = StyleSheet.create({
  // Filter Header & Scrollable Row
  filterContainer: { marginBottom: spacing[6] },
  filterLabel: { fontFamily: fonts.navBold, fontSize: fontSizes.lg, letterSpacing: 1, textTransform: 'uppercase', color: colors.ink, marginBottom: spacing[3] },
  chipsScroll: { flexDirection: 'row', alignItems: 'center', paddingRight: 20 },
  chip: { borderWidth: 1, borderColor: colors.line, borderRadius: 0, paddingVertical: 10, paddingHorizontal: 18, marginRight: 8, backgroundColor: colors.white },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, letterSpacing: 1, textTransform: 'uppercase', color: colors.ink },

  // Responsive Grid Alignment
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  card: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 0, overflow: 'hidden', width: '100%' },
  imageWrap: { position: 'relative', width: '100%', aspectRatio: 4 / 3 },
  image: { width: '100%', height: '100%', borderRadius: 0 },
  fallback: { backgroundColor: colors.green, justifyContent: 'center', alignItems: 'center' },

  socialBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.green,
    padding: 6,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  captionContainer: { padding: spacing[4] },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  categoryTag: { fontFamily: fonts.navBold, fontSize: fontSizes.xs, letterSpacing: 1, textTransform: 'uppercase', color: colors.green },
  viewPostText: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.xs, color: colors.muted },
  captionText: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.ink, lineHeight: 20 },

  emptyBox: { padding: spacing[6], backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 0 },
});

export default GalleryScreen;