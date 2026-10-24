// PageBanner.js  -> save as: src/components/screens/About/banner/PageBanner.js
// Dark title band at the top of inner pages: small green label, big title, breadcrumb.
// Optional `image` shows a photo behind the text with a dark overlay, e.g.
//   <PageBanner title="Agenda" image={require('../../../../../assets/banner.jpg')} ... />
import React from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, spacing } from '../../../../styles/globalStyles';
import { Container, useSafeNavigate } from '../../../common/ui/ui';

// crumbs: [{ label: 'Home', route: 'Home' }, { label: 'About Me' }]   (the last one has no route)
const PageBanner = ({ label, title, crumbs = [], image }) => {
  const go = useSafeNavigate();

  const content = (
    <Container>
      {label ? <Text style={b.label}>{label}</Text> : null}
      <Text style={b.title} accessibilityRole="header">{title}</Text>
      <View style={b.crumbs}>
        {crumbs.map((c, i) => (
          <View key={c.label} style={b.crumb}>
            {c.route ? (
              <Pressable onPress={() => go(c.route)} accessibilityRole="link">
                <Text style={b.link}>{c.label}</Text>
              </Pressable>
            ) : (
              <Text style={b.current}>{c.label}</Text>
            )}
            {i < crumbs.length - 1 && <Text style={b.sep}>/</Text>}
          </View>
        ))}
      </View>
    </Container>
  );

  if (image) {
    return (
      <ImageBackground source={image} style={b.banner} resizeMode="cover">
        <View style={b.overlay} />
        {content}
      </ImageBackground>
    );
  }
  return <View style={b.banner}>{content}</View>;
};

const b = StyleSheet.create({
  banner: { backgroundColor: colors.dark, paddingVertical: 64, justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(11,11,13,0.75)' },
  label: { fontFamily: fonts.navBold, fontSize: fontSizes.base, letterSpacing: 3, textTransform: 'uppercase', color: colors.green, marginBottom: spacing[2] },
  title: { fontFamily: fonts.bodyLight, fontSize: 48, lineHeight: 58, color: colors.white },
  crumbs: { flexDirection: 'row', marginTop: spacing[4] },
  crumb: { flexDirection: 'row', alignItems: 'center' },
  link: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.base, letterSpacing: 1, textTransform: 'uppercase', color: '#B9B9BE' },
  current: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.base, letterSpacing: 1, textTransform: 'uppercase', color: colors.green },
  sep: { color: '#6B6B70', marginHorizontal: 10 },
});

export default PageBanner;