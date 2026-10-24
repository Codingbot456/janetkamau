import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { useSafeNav } from '../../navigation/childNav/webNav/useSafeNav';
import { Photo, Band, PillButton, TextLink, Stars, HeroBanner } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius } from '../../../styles/globalStyles';
import { ABOUT } from './content/aboutContent';

const AboutScreen = () => {
  const go = useSafeNav();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { hero, intro, groups, quote, work, cta } = ABOUT;

  const h1 = phone ? { fontSize: 34, lineHeight: 44 } : compact ? { fontSize: 44, lineHeight: 56 } : { fontSize: 52, lineHeight: 64 };
  const h2 = phone ? { fontSize: 28, lineHeight: 38 } : { fontSize: 38, lineHeight: 50 };
  const body = { fontSize: phone ? 14 : 16, lineHeight: phone ? 23 : 26 };
  const press = (b) => () => go(b.route, b.params);

  return (
    <PageLayout overlayHeader>
      {/* Hero */}
      <HeroBanner image={hero.image} minHeight={phone ? 420 : 460}>
        <View style={{ maxWidth: 680 }}>
          <Text style={[s.heroTitle, h1]} accessibilityRole="header">{hero.title}</Text>
          <Text style={[s.heroText, { marginVertical: spacing[5] }, body]}>{hero.text}</Text>
          <PillButton label={hero.button.label} onPress={press(hero.button)} />
        </View>
      </HeroBanner>

      {/* Who we are: photo left, text right, thin divider between */}
      <View style={s.introWrap}>
        <View style={[g.container, { flexDirection: compact ? 'column-reverse' : 'row', paddingHorizontal: 0 }]}>
          <View style={[s.introImage, compact && { borderRightWidth: 0, padding: spacing[6] }]}>
            <Photo image={intro.image} label="The DesignGENIUS team at work" ratio={4 / 3} />
          </View>
          <View style={[s.introText, compact && { padding: spacing[6] }]}>
            <Text style={g.eyebrow}>{intro.eyebrow}</Text>
            <Text style={[g.h2, { marginVertical: spacing[3] }, h2]}>{intro.title}</Text>
            {intro.paragraphs.map((p, i) => <Text key={i} style={[g.text, { marginBottom: spacing[4] }, body]}>{p}</Text>)}
            {intro.checks.map((c) => (
              <View key={c} style={s.checkRow}>
                <Icon name="arrow-circle-right" size={22} color={colors.heading} />
                <Text style={s.checkText}>{c}</Text>
              </View>
            ))}
            <View style={{ marginTop: spacing[6] }}><PillButton label={intro.button.label} onPress={press(intro.button)} /></View>
          </View>
        </View>
      </View>

      {/* Three service groups */}
      <Band pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', marginHorizontal: -8 }}>
          {groups.items.map((gr) => (
            <View key={gr.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
              <View style={s.groupCard}>
                <Icon name={gr.icon} size={44} color={colors.heading} />
                <Text style={s.groupTitle}>{gr.label}</Text>
                <Text style={s.groupText}>{gr.text}</Text>
                <View style={s.groupList}>
                  {gr.services.map((sv) => <Text key={sv} style={s.groupItem}>{sv}</Text>)}
                </View>
                <TextLink label={groups.linkLabel} onPress={press(gr)} />
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* Testimonial */}
      <View style={s.quoteBand}>
        <View style={[g.container, { alignItems: 'center' }]}>
          <Stars value={5} size={26} />
          <Text style={[s.quoteText, phone && { fontSize: 20, lineHeight: 32 }]}>{quote.text}</Text>
          <Text style={s.quoteName}>{quote.name}</Text>
          <Text style={s.quoteRole}>{quote.role}</Text>
        </View>
      </View>

      {/* Our work: three columns */}
      <View style={{ flexDirection: compact ? 'column' : 'row', backgroundColor: colors.white }}>
        {work.items.map((w, i) => (
          <View key={w.id} style={[s.workCol, !compact && i > 0 && { borderLeftWidth: 1, borderLeftColor: colors.line }, compact && i > 0 && { borderTopWidth: 1, borderTopColor: colors.line }]}>
            <View style={{ width: '100%', maxWidth: 420 }}><Photo image={w.image} label={w.title} ratio={4 / 3} /></View>
            <Text style={s.workTitle}>{w.title}</Text>
            <Text style={s.workText}>{w.text}</Text>
          </View>
        ))}
      </View>

      {/* Call to action */}
      <View style={s.ctaBand}>
        <View style={[g.container, { alignItems: 'center' }]}>
          <Text style={[s.ctaTitle, phone && { fontSize: 32, lineHeight: 42 }]}>{cta.title}</Text>
          <View style={{ marginTop: spacing[6] }}><PillButton label={cta.button.label} onPress={press(cta.button)} /></View>
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  heroTitle: { fontFamily: fonts.headingBold, color: colors.white },
  heroText: { fontFamily: fonts.body, color: colors.softOnDark },

  introWrap: { backgroundColor: colors.bar, borderBottomWidth: 1, borderBottomColor: colors.ruleGray },
  introImage: { flex: 1, padding: spacing[10], justifyContent: 'center', borderRightWidth: 1, borderRightColor: colors.ruleGray },
  introText: { flex: 1, padding: spacing[10], paddingBottom: spacing[12] },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[2] },
  checkText: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.ink, marginLeft: spacing[2] },

  groupCard: { flex: 1, alignItems: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.heading, borderRadius: borderRadius.md, padding: spacing[8] },
  groupTitle: { fontFamily: fonts.heading, fontSize: 26, color: colors.heading, marginVertical: spacing[3] },
  groupText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.ink, textAlign: 'center', marginBottom: spacing[4] },
  groupList: { marginBottom: spacing[5], alignItems: 'center' },
  groupItem: { fontFamily: fonts.navMedium, fontSize: fontSizes.sm, color: colors.secondary, paddingVertical: 3 },

  quoteBand: { backgroundColor: colors.navSolid, paddingVertical: spacing[20] },
  quoteText: { fontFamily: fonts.bodyMedium, fontSize: 26, lineHeight: 40, color: colors.white, textAlign: 'center', maxWidth: 860, marginVertical: spacing[6] },
  quoteName: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.white, marginTop: spacing[2] },
  quoteRole: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.mutedOnDark, marginTop: spacing[2] },

  workCol: { flex: 1, alignItems: 'center', padding: spacing[8], paddingBottom: spacing[10] },
  workTitle: { fontFamily: fonts.headingBold, fontSize: 30, lineHeight: 40, color: colors.heading, textAlign: 'center', marginTop: spacing[6], marginBottom: spacing[3] },
  workText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.ink, textAlign: 'center', maxWidth: 360 },

  ctaBand: { backgroundColor: colors.secondary, paddingVertical: spacing[20] },
  ctaTitle: { fontFamily: fonts.heading, fontSize: 46, lineHeight: 58, color: colors.white, textAlign: 'center', maxWidth: 800 },
});

export default AboutScreen;