// PhotoGallery.js  (src/components/common/ui/PhotoGallery.js)
// Photo grid with captions + a full-screen viewer (previous / next / close). Used by Gallery and Foundation.
// photos: [{ id, caption, category?, image? }]   image = require('...') or { uri: 'https://...' }
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Modal, StyleSheet } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Grid, PhotoPlaceholder, useCols }  from './ui/ui';


import { globalStyles as g, colors, fonts, fontSizes, spacing } from '../../styles/globalStyles';



const Pic = ({ photo, style }) =>
  photo.image
    ? <Image source={photo.image} style={[{ width: '100%', aspectRatio: 4 / 3 }, style]} resizeMode="cover" accessibilityLabel={photo.caption} />
    : <PhotoPlaceholder label={photo.caption} style={[{ aspectRatio: 4 / 3 }, style]} />;

const PhotoGallery = ({ photos, desktopCols = 3, tabletCols = 2 }) => {
  const cols = useCols(desktopCols, tabletCols);
  const [open, setOpen] = useState(null); // index of the photo being viewed
  useEffect(() => setOpen(null), [photos.length]);

  const current = open === null ? null : photos[open];
  const prev = () => setOpen((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setOpen((i) => (i + 1) % photos.length);

  return (
    <>
      <Grid
        items={photos}
        cols={cols}
        render={(p) => {
          const i = photos.findIndex((x) => x.id === p.id);
          return (
            <Pressable onPress={() => setOpen(i)} accessibilityRole="button" accessibilityLabel={`Open photo: ${p.caption}`}>
              {({ hovered }) => (
                <View style={[g.card, hovered && { borderColor: colors.green }]}>
                  <Pic photo={p} style={{ borderRadius: 0, borderWidth: 0 }} />
                  <View style={g.cardBody}>
                    {p.category ? <Text style={s.cat}>{p.category}</Text> : null}
                    <Text style={s.caption} numberOfLines={3}>{p.caption}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          );
        }}
      />

      <Modal visible={!!current} transparent animationType="fade" onRequestClose={() => setOpen(null)}>
        <View style={s.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(null)} accessibilityLabel="Close viewer" />
          {current && (
            <View style={s.viewer}>
              <Pic photo={current} style={{ borderRadius: 8 }} />
              <Text style={s.viewCaption}>{current.caption}</Text>
              <Text style={s.count}>{open + 1} / {photos.length}</Text>
              <View style={s.controls}>
                <Pressable onPress={prev} style={s.ctrl} accessibilityLabel="Previous photo"><Icon name="chevron-left" size={30} color="#fff" /></Pressable>
                <Pressable onPress={() => setOpen(null)} style={s.ctrl} accessibilityLabel="Close"><Icon name="close" size={26} color="#fff" /></Pressable>
                <Pressable onPress={next} style={s.ctrl} accessibilityLabel="Next photo"><Icon name="chevron-right" size={30} color="#fff" /></Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

const s = StyleSheet.create({
  cat: { fontFamily: fonts.navBold, fontSize: fontSizes.sm, letterSpacing: 1, textTransform: 'uppercase', color: colors.green, marginBottom: 4 },
  caption: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 21, color: colors.ink },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center', padding: spacing[5] },
  viewer: { width: '100%', maxWidth: 900 },
  viewCaption: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 24, color: '#fff', marginTop: spacing[4], textAlign: 'center' },
  count: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, letterSpacing: 1, color: '#B9B9BE', marginTop: spacing[2], textAlign: 'center' },
  controls: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing[4] },
  ctrl: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: '#4A4A50', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
});

export default PhotoGallery;