import React from 'react';
import { View, Text, Pressable, Linking, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { Button, useSafeNavigate } from '../../common/ui/ui';
import { Photo, Band, TextLink } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, spacing, layout } from '../../../styles/globalStyles';
import { MEDIA } from './content/mediaContent';

// Opens an external link. Does nothing until a real url is added in mediaContent.js.
const open = (url) => { if (url) Linking.openURL(url); };

const Video = ({ url, fallbackUrl }) => {
  if (url && Platform.OS === 'web') {
    return (
      <View style={s.video}>
        {React.createElement('iframe', {
          title: 'Interview', src: url, style: { border: 0, width: '100%', height: '100%' },
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture', allowFullScreen: true, loading: 'lazy',
        })}
      </View>
    );
  }
  return (
    <Pressable style={[s.video, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => open(url || fallbackUrl)} accessibilityRole="button" accessibilityLabel="Play video">
      <View style={s.play}><Icon name="play-arrow" size={44} color={colors.white} /></View>
    </Pressable>
  );
};

// One press / podcast row: small photo on the left, text on the right
const FeatureRow = ({ item, compact, phone, linkColor, titleStyle, textStyle, divider, dividerColor }) => (
  <View style={[s.row, { flexDirection: phone ? 'column' : 'row' }, divider && { borderTopWidth: 1, borderTopColor: dividerColor }]}>
    <View style={{ width: phone ? 140 : 200, marginRight: phone ? 0 : spacing[8], marginBottom: phone ? spacing[5] : 0 }}>
      <Photo image={item.image} label={item.title} ratio={3 / 4} radius={0} />
    </View>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={titleStyle}>{item.title}</Text>
      <Text style={[textStyle, { marginVertical: spacing[4] }]}>{item.text}</Text>
      <TextLink label={item.link.label} color={linkColor} onPress={() => open(item.link.url)} />
    </View>
  </View>
);

const MediaScreen = () => {
  const go = useSafeNavigate();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { hero, recommends, press, podcasts, video } = MEDIA;

  const h1 = phone ? { fontSize: 28, lineHeight: 40 } : compact ? { fontSize: 36, lineHeight: 50 } : { fontSize: 40, lineHeight: 56 };
  const h2 = phone ? { fontSize: 26, lineHeight: 38 } : compact ? { fontSize: 32, lineHeight: 46 } : { fontSize: 38, lineHeight: 54 };
  const body = { fontSize: phone ? 14 : 15, lineHeight: phone ? 22 : 24 };
  const rowTitle = { fontFamily: fonts.headingRegular, fontSize: phone ? 22 : 26, lineHeight: phone ? 32 : 36 };
  const rowText = { fontFamily: fonts.body, fontSize: 14, lineHeight: 22 };

  return (
    <PageLayout>
      {/* Hero */}
      <Band pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1, paddingRight: compact ? 0 : spacing[10] }}>
            <Text style={[s.heroTitle, h1]} accessibilityRole="header">
              <Text style={{ color: colors.teal }}>{hero.titleTeal} </Text>
              <Text style={{ color: colors.black }}>{hero.titleDark}</Text>
            </Text>
            {hero.lines.map((l, i) => <Text key={i} style={[g.text, { marginTop: spacing[4], fontFamily: i === 0 ? fonts.bodySemiBold : fonts.body }, body]}>{l}</Text>)}
            <View style={{ marginTop: spacing[8], alignSelf: 'flex-start' }}><Button label={hero.button.label} onPress={() => go(hero.button.route)} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 0.9, width: compact ? '100%' : undefined, marginTop: compact ? spacing[8] : 0, alignItems: compact ? 'stretch' : 'flex-end' }}>
            <View style={{ width: '100%', maxWidth: 520 }}><Photo image={hero.image} label="Jackline Ndiru in a TV studio" ratio={4 / 5} radius={0} /></View>
          </View>
        </View>
      </Band>

      {/* Recommends (teal) */}
      <Band bg={colors.teal} pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, alignItems: 'center' }}>
            <View style={{ width: '100%', maxWidth: 420 }}><Photo image={recommends.image} label="Jackline Ndiru" ratio={4 / 5} radius={0} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 1, marginTop: compact ? spacing[8] : 0, paddingLeft: compact ? 0 : spacing[10] }}>
            <Text style={[s.whiteTitle, h2]}>
              {recommends.titleA}
              <Text style={s.highlight}>{recommends.highlight}</Text>
              {recommends.titleB}
            </Text>
            <Text style={[s.whiteBody, { marginVertical: spacing[5] }, body]}>{recommends.text}</Text>
            <View style={{ alignSelf: 'flex-start' }}><Button label={recommends.button.label} onPress={() => go(recommends.button.route)} /></View>
          </View>
        </View>
      </Band>

      {/* Press & articles: featured */}
      <View style={{ backgroundColor: colors.black, paddingTop: spacing[12] }}>
        <View style={g.container}><Text style={g.eyebrow}>{press.eyebrow}</Text></View>
        <View style={s.fullRule} />
      </View>
      <Band bg={colors.black} pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1.2, paddingRight: compact ? 0 : spacing[10] }}>
            <Text style={s.source}>{press.featured.source}</Text>
            <Text style={[s.featTitle, phone && { fontSize: 26, lineHeight: 38 }]}>
              <Text style={{ color: colors.teal }}>{press.featured.titleTeal}</Text>
              <Text style={{ color: colors.pink }}>{press.featured.titlePink}</Text>
            </Text>
            <Text style={[s.whiteBody, { marginVertical: spacing[6] }, body]}>{press.featured.text}</Text>
            <TextLink label={press.featured.link.label} color={colors.white} onPress={() => open(press.featured.link.url)} />
          </View>
          <View style={{ flex: compact ? undefined : 0.8, width: compact ? '100%' : undefined, marginTop: compact ? spacing[8] : 0, alignItems: 'center' }}>
            <View style={{ width: '100%', maxWidth: 380, backgroundColor: colors.pink, padding: spacing[5] }}>
              <Photo image={press.featured.image} label="Jackline Ndiru" ratio={4 / 5} radius={0} />
            </View>
          </View>
        </View>
      </Band>

      {/* Article list */}
      <Band bg={colors.white} pad={spacing[12]}>
        <View style={{ width: '100%', maxWidth: 900, alignSelf: 'center' }}>
          {press.articles.map((a, i) => (
            <FeatureRow key={a.id} item={a} phone={phone} divider={i > 0} dividerColor="#999999"
              linkColor={colors.black} titleStyle={[rowTitle, { color: colors.heading }]} textStyle={[rowText, { color: colors.muted }]} />
          ))}
        </View>
      </Band>

      {/* Podcasts (yellow) */}
      <Band bg={colors.yellow} pad={spacing[12]}>
        <View style={{ width: '100%', maxWidth: 900, alignSelf: 'center' }}>
          {podcasts.items.map((p, i) => (
            <FeatureRow key={p.id} item={p} phone={phone} divider={i > 0} dividerColor="rgba(0,0,0,0.25)"
              linkColor={colors.black} titleStyle={[rowTitle, { color: colors.black }]} textStyle={[rowText, { color: colors.black }]} />
          ))}
        </View>
      </Band>

      {/* Video feature */}
      <Band bg={colors.black}>
        <Text style={[s.videoTitle, phone && { fontSize: 24, lineHeight: 36 }]}>
          {video.titleA}{video.titleB}
          <Text style={s.underlined}>{video.highlight}</Text>
        </Text>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'center', justifyContent: 'space-between', marginVertical: spacing[8] }}>
          <Text style={[s.whiteBody, { maxWidth: 520 }, body]}>{video.text}</Text>
          <View style={{ marginTop: compact ? spacing[5] : 0 }}><Button label={video.button.label} onPress={() => open(video.button.url || video.embedUrl)} /></View>
        </View>
        <View style={{ width: '100%', maxWidth: 1000, alignSelf: 'center' }}>
          <Video url={video.embedUrl} fallbackUrl={video.button.url} />
        </View>
      </Band>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  heroTitle: { fontFamily: fonts.headingRegular },
  whiteTitle: { fontFamily: fonts.headingRegular, color: colors.white },
  whiteBody: { fontFamily: fonts.bodySemiBold, color: colors.white },
  highlight: { backgroundColor: colors.yellow, color: colors.black },
  underlined: { textDecorationLine: 'underline', textDecorationColor: colors.yellow, color: colors.white },

  fullRule: { height: 1, backgroundColor: '#555555', marginTop: spacing[5] },
  source: { fontFamily: fonts.headingBold, fontSize: 40, color: colors.white, marginBottom: spacing[6] },
  featTitle: { fontFamily: fonts.headingRegular, fontSize: 34, lineHeight: 50 },

  row: { paddingVertical: spacing[8] },

  videoTitle: { fontFamily: fonts.headingRegular, fontSize: 32, lineHeight: 46, color: colors.white, maxWidth: 820 },
  video: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#1A1A1A', overflow: 'hidden' },
  play: { width: 84, height: 60, borderRadius: 14, backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center' },
});

export default MediaScreen;