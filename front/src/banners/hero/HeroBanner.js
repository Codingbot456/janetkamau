// HeroBanner.js - dark hero: rotating quote + signature (left), photo (right)
// Small screens keep the SAME side-by-side layout: small quote on the left,
// photo on the right, in a short dark band. Nothing stacks.
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { globalStyles as g, colors, fonts, spacing, layout } from '../../styles/globalStyles';

// Optional imports
import { SITE as SITE_IMPORT } from '../../components/navigation/childNav/webNav/siteConfig';
import { SLIDES as SLIDES_IMPORT } from '../../components/navigation/layout/web/siteContent';

// Updated fallbacks tailored for Hon. Daniel Kimari
const SITE = SITE_IMPORT || { firstName: 'Daniel', lastName: 'Kimari' };
const SLIDES = SLIDES_IMPORT || [
  { text: 'Empowering communities through', bold: 'transformative leadership.' },
  { text: 'Championing youth, development, and', bold: 'economic progress.' },
  { text: 'Building a stronger future with', bold: 'vision and integrity.' },
];

// Default photo reference
const DEFAULT_PHOTO = require('../../assets/images/daniel.png');

// Sizes for each screen class: phone < 600 <= tablet < 1000 <= desktop
const SIZES = {
  phone:   { height: 230, quote: 15, line: 22, sigMark: 26, sigText: 9,  sigSpacing: 4, sigTop: 22, padV: 20, dot: 8,  pad: spacing[4] },
  tablet:  { height: 340, quote: 26, line: 36, sigMark: 34, sigText: 11, sigSpacing: 6, sigTop: 36, padV: 32, dot: 10, pad: spacing[6] },
  desktop: { height: 560, quote: 40, line: 52, sigMark: 40, sigText: 12, sigSpacing: 7, sigTop: 52, padV: 48, dot: 11, pad: spacing[6] },
};

const HeroBanner = ({ photo = DEFAULT_PHOTO }) => {
  const { width } = useWindowDimensions();
  const [i, setI] = useState(0);

  const size = width < layout.tablet ? SIZES.phone : width < layout.desktop ? SIZES.tablet : SIZES.desktop;
  const quote = { fontSize: size.quote, lineHeight: size.line };

  useEffect(() => {
    if (SLIDES.length < 2) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[i] || SLIDES[0];

  return (
    <View style={s.hero}>
      <View style={[s.inner, { minHeight: size.height, paddingHorizontal: size.pad }]}>
        {/* Left: quote + signature */}
        <View style={[s.left, { paddingVertical: size.padV }]}>
          <Text style={[g.heroQuote, quote]} accessibilityLiveRegion="polite">{slide.text}</Text>
          <Text style={[g.heroQuote, g.heroQuoteBold, quote]}>{slide.bold}</Text>

          <View style={[s.sig, { marginTop: size.sigTop }]}>
            <Text style={[s.sigMark, { fontSize: size.sigMark, lineHeight: size.sigMark + 6 }]}>{SITE.firstName}</Text>
            <Text style={[s.sigText, { fontSize: size.sigText, letterSpacing: size.sigSpacing }]}>
              {SITE.lastName ? SITE.lastName.split('').join(' ') : 'K I M A R I'}
            </Text>
          </View>

          {SLIDES.length > 1 && (
            <View style={s.dots}>
              {SLIDES.map((_, n) => (
                <Pressable
                  key={n}
                  onPress={() => setI(n)}
                  accessibilityLabel={`Show quote ${n + 1}`}
                  hitSlop={10}
                  style={[s.dot, { width: size.dot, height: size.dot, borderRadius: size.dot / 2 }, n === i && s.dotActive]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Right: photo, sitting on the bottom edge of the band */}
        <View style={s.right}>
          {photo ? (
            <Image source={photo} style={[s.photo, { height: size.height, minHeight: size.height }]} resizeMode="contain" />
          ) : (
            <View style={[s.placeholder, { height: size.height * 0.8 }]}>
              <Text style={s.placeholderText}>{SITE.firstName}'s photo goes here</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  hero: { backgroundColor: colors.dark, overflow: 'hidden' },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    flexDirection: 'row',          // always side by side, also on phones
    alignItems: 'stretch',
  },
  left: { flex: 1.15, justifyContent: 'center', paddingRight: spacing[2] },
  sig: { flexDirection: 'row', alignItems: 'flex-end' },
  sigMark: { fontFamily: fonts.bodyLight, fontStyle: 'italic', color: colors.green, marginRight: 8 },
  sigText: { fontFamily: fonts.navBold, color: colors.green, marginBottom: 4 },
  dots: { flexDirection: 'row', marginTop: spacing[5] },
  dot: { borderWidth: 1, borderColor: colors.white, marginRight: 8 },
  dotActive: { backgroundColor: colors.white },
  right: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  photo: { width: '100%' },
  placeholder: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#2A2A2E',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    justify: 'center',
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 12, color: '#8A8A8F', textAlign: 'center', paddingHorizontal: 8 },
});

export default HeroBanner;