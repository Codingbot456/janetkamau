// FoundationScreen.js  (src/components/screens/Foundation/FoundationScreen.js)
import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import PageBanner from '../about/banner/PageBanner';
import SideRow from '../agenda/side/SideRow';
import { Section, SectionTitle, Button, useSafeNavigate } from '../../common/ui/ui';
import { FOUNDATION_PAGE as P, FOUNDATION_PHOTOS } from './content/foundationContent';
import { globalStyles as g, colors, fonts, fontSizes, spacing } from '../../../styles/globalStyles';

// Individual Photo Item with Web Fallback & Zero Border-Radius
const GalleryItem = ({ photo }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <View style={s.galleryCard}>
      {photo.image && !imgError ? (
        <Image 
          source={photo.image} 
          style={s.galleryImg} 
          resizeMode="cover" 
          onError={() => setImgError(true)} 
        />
      ) : (
        <View style={[s.galleryImg, s.galleryFallback]}>
          <MaterialCommunityIcons name="heart-handshake" size={48} color={colors.white} />
        </View>
      )}
      <View style={s.captionBox}>
        <Text style={s.captionText} numberOfLines={2}>{photo.caption}</Text>
      </View>
    </View>
  );
};

const FoundationScreen = () => {
  const go = useSafeNavigate();

  return (
    <PageLayout>
      <PageBanner label={P.label} title={P.title} crumbs={[{ label: 'Home', route: 'Home' }, { label: 'Foundation' }]} />

      {/* Branded Foundation Header Badge */}
      <Section>
        <View style={s.logoBanner}>
          <View style={s.logoIconBadge}>
            <MaterialCommunityIcons name="hand-heart" size={54} color={colors.white} />
          </View>
          <Text style={s.logoTitle}>{P.title.toUpperCase()}</Text>
          <Text style={s.logoSubtitle}>COMMUNITY DEVELOPMENT & EMPOWERMENT</Text>
        </View>

        {/* Message from the Founder */}
        <View style={s.message}>
          <View style={g.accentBar} />
          <Text style={[g.h2, { marginBottom: spacing[5] }]}>{P.messageTitle}</Text>

          <View style={s.quoteBox}>
            <Text style={s.quote}>“{P.quote}”</Text>
          </View>

          {P.paragraphs.map((t, i) => (
            <Text key={i} style={[g.text, s.para]}>
              {t}
            </Text>
          ))}

          <View style={{ marginTop: spacing[4] }}>
            <Text style={s.sigName}>{P.signature.names}</Text>
            <Text style={s.sigRole}>{P.signature.role}</Text>
          </View>

          <View style={{ marginTop: spacing[6] }}>
            <Button label={P.ctaLabel} onPress={() => go('Contact')} />
          </View>
        </View>
      </Section>

      {/* Photo Gallery Grid */}
      <Section alt>
        <SectionTitle title={P.galleryTitle} intro="Capturing moments of impact across education, healthcare, and infrastructure:" />
        <View style={s.galleryGrid}>
          {FOUNDATION_PHOTOS.map((item) => (
            <View key={item.id} style={s.gridCol}>
              <GalleryItem photo={item} />
            </View>
          ))}
        </View>
      </Section>

      {/* Social Media Connection Callout */}
      <Section>
        <View style={s.socialCallout}>
          <MaterialCommunityIcons name="facebook" size={40} color={colors.green} style={{ marginBottom: 12 }} />
          <Text style={[g.h3, { color: colors.ink, marginBottom: 8 }]}>Follow Our Foundation Updates</Text>
          <Text style={[g.textMuted, { textAlign: 'center', maxWidth: 600, lineHeight: 22 }]}>
            Stay connected on Facebook and Instagram to see live photos, upcoming community outreach drives, and bursary application notices.
          </Text>
        </View>
      </Section>

      <SideRow />
    </PageLayout>
  );
};

const s = StyleSheet.create({
  // Branded Header
  logoBanner: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    backgroundColor: colors.green,
    padding: spacing[8],
    alignItems: 'center',
    marginBottom: spacing[10],
    borderRadius: 0, // Sharp square edges
  },
  logoIconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  logoTitle: {
    fontFamily: fonts.navBold,
    fontSize: fontSizes['2xl'],
    color: colors.white,
    letterSpacing: 2,
    textAlign: 'center',
  },
  logoSubtitle: {
    fontFamily: fonts.navSemiBold,
    fontSize: fontSizes.xs,
    color: '#E0E0E0',
    letterSpacing: 3,
    marginTop: 4,
    textAlign: 'center',
  },

  // Message Block
  message: { width: '100%', maxWidth: 820, alignSelf: 'center' },
  quoteBox: { borderLeftWidth: 4, borderLeftColor: colors.green, paddingLeft: spacing[5], marginBottom: spacing[6] },
  quote: { fontFamily: fonts.bodyLight, fontStyle: 'italic', fontSize: fontSizes['2xl'], lineHeight: 34, color: colors.ink },
  para: { fontSize: fontSizes.lg, lineHeight: 30, marginBottom: spacing[5] },
  sigName: { fontFamily: fonts.navBold, fontSize: fontSizes.xl, letterSpacing: 1, textTransform: 'uppercase', color: colors.ink },
  sigRole: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.muted },

  // Custom Gallery Grid (No Border Radius)
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  gridCol: {
    width: '33.333%',
    minWidth: 280,
    padding: 12,
  },
  galleryCard: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    borderRadius: 0,
    overflow: 'hidden',
  },
  galleryImg: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 0,
  },
  galleryFallback: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionBox: {
    padding: spacing[4],
    backgroundColor: colors.white,
  },
  captionText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.ink,
    lineHeight: 20,
  },

  // Social Callout
  socialCallout: {
    backgroundColor: '#F5F7F5',
    padding: spacing[8],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 0,
  },
});

export default FoundationScreen;