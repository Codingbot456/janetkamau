import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { useSafeNav } from '../../navigation/childNav/webNav/useSafeNav';
import { Photo } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout } from '../../../styles/globalStyles';
import { PORTFOLIO } from './content/portfolioContent';

// Plain page, like the model: solid header, centred title, grid of project tiles.
const PortfolioScreen = () => {
  const go = useSafeNav();
  const { width } = useWindowDimensions();
  const phone = width < layout.tablet;
  const tablet = width < layout.desktop;
  const { title, text, link, projects } = PORTFOLIO;

  const h1 = phone ? { fontSize: 40, lineHeight: 50 } : { fontSize: 56, lineHeight: 68 };
  const tileW = phone ? '50%' : tablet ? '33.333%' : '25%'; // 2 per row on phones, 3 on tablets, 4 on desktop

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={s.head}>
        <Text style={[s.title, h1]} accessibilityRole="header">{title}</Text>
        <Text style={s.text}>{text}</Text>
        <Pressable onPress={() => go(link.route, link.params)} accessibilityRole="link">
          <Text style={s.link}>{link.label}</Text>
        </Pressable>
      </View>

      <View style={[g.container, { paddingBottom: spacing[16] }]}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
          {projects.map((p) => (
            <View key={p.id} style={{ width: tileW, padding: 8 }}>
              <Pressable
                onPress={p.url ? () => Linking.openURL(p.url) : undefined}
                accessibilityRole={p.url ? 'link' : undefined}
                accessibilityLabel={`${p.title}, ${p.category}`}
                style={({ hovered }) => [s.tile, hovered && s.tileHover]}
              >
                <Photo image={p.image} label={p.title} ratio={1} radius={0} />
                <View style={s.caption}>
                  <Text style={s.captionTag}>{p.category}</Text>
                  <Text style={s.captionTitle}>{p.title}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  head: { alignItems: 'center', paddingHorizontal: spacing[6], paddingTop: spacing[16], paddingBottom: spacing[10] },
  title: { fontFamily: fonts.heading, color: colors.heading, textAlign: 'center' },
  text: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.ink, textAlign: 'center', marginTop: spacing[3] },
  link: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.heading, textDecorationLine: 'underline', textAlign: 'center', marginTop: spacing[5] },

  tile: { backgroundColor: colors.bar, opacity: 1 },
  tileHover: { opacity: 0.85 },
  caption: { paddingVertical: spacing[3], paddingHorizontal: spacing[3] },
  captionTag: { fontFamily: fonts.navMedium, fontSize: fontSizes.xs, color: colors.secondary },
  captionTitle: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 26, color: colors.heading },
});

export default PortfolioScreen;