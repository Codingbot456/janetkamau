import React, { useEffect } from 'react';
import { View, Text, Pressable, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { useSafeNav } from '../../navigation/childNav/webNav/useSafeNav';
import { Photo, Band, PillButton, HeroBanner, Accordion } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius } from '../../../styles/globalStyles';
import { SERVICES_PAGE } from './content/servicesContent';

// Scroll to a section on web (sections carry nativeID). Does nothing on native.
const scrollToId = (id) => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const el = document.getElementById(id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const ServicesScreen = () => {
  const go = useSafeNav();
  const route = useRoute();
  const selected = route && route.params && route.params.service;
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { hero, jump, groups, labels, process, faq, cta } = SERVICES_PAGE;

  const h1 = phone ? { fontSize: 38, lineHeight: 48 } : { fontSize: 56, lineHeight: 66 };
  const h2 = phone ? { fontSize: 28, lineHeight: 38 } : { fontSize: 38, lineHeight: 50 };
  const body = { fontSize: phone ? 14 : 16, lineHeight: phone ? 23 : 26 };
  const press = (b) => () => go(b.route, b.params);

  // When the page opens from a menu item (/services?service=seo), scroll to that service
  useEffect(() => {
    if (!selected) return undefined;
    const t = setTimeout(() => scrollToId('service-' + selected), 350);
    return () => clearTimeout(t);
  }, [selected]);

  let n = 0; // alternates the photo side down the page

  return (
    <PageLayout overlayHeader>
      {/* Hero */}
      <HeroBanner image={hero.image} minHeight={phone ? 380 : 420}>
        <View style={{ maxWidth: 640 }}>
          <Text style={[s.heroTitle, h1]} accessibilityRole="header">{hero.title}</Text>
          <Text style={[s.heroText, { marginVertical: spacing[4] }, body]}>{hero.text}</Text>
          <PillButton label={hero.button.label} onPress={press(hero.button)} />
        </View>
      </HeroBanner>

      {/* Jump links, grouped */}
      <View style={s.jumpWrap}>
        <View style={g.container}>
          <Text style={s.jumpLabel}>{jump.label}</Text>
          <View style={{ flexDirection: compact ? 'column' : 'row' }}>
            {groups.map((gr) => (
              <View key={gr.id} style={{ flex: 1, marginBottom: compact ? spacing[4] : 0, paddingRight: spacing[4] }}>
                <Text style={s.jumpGroup}>{gr.label}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
                  {gr.items.map((sv) => (
                    <Pressable key={sv.id} onPress={() => scrollToId('service-' + sv.id)} accessibilityRole="link" style={({ hovered }) => [s.chip, hovered && s.chipHover]}>
                      <Text style={s.chipText}>{sv.title}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* One section per service, grouped */}
      {groups.map((gr) => (
        <View key={gr.id}>
          {gr.items.map((sv) => {
            const imageFirst = n++ % 2 === 0;
            const active = selected === sv.id;
            return (
              <View key={sv.id} nativeID={'service-' + sv.id} style={[s.section, { backgroundColor: imageFirst ? colors.white : colors.bar }]}>
                <View style={g.container}>
                  <View style={{ flexDirection: compact ? 'column' : imageFirst ? 'row' : 'row-reverse', alignItems: 'center' }}>
                    <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, marginBottom: compact ? spacing[6] : 0 }}>
                      <Photo image={sv.image} label={sv.title} ratio={4 / 3} />
                    </View>
                    <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, paddingLeft: compact || !imageFirst ? 0 : spacing[12], paddingRight: compact || imageFirst ? 0 : spacing[12] }}>
                      <View style={[s.badge, active && s.badgeActive]}>
                        <Icon name={sv.icon} size={26} color={active ? colors.white : colors.secondary} />
                      </View>
                      <Text style={s.groupTag}>{gr.label}</Text>
                      <Text style={[g.h2, { marginBottom: spacing[3] }, h2]}>{sv.title}</Text>
                      <Text style={[g.text, { marginBottom: spacing[5] }, body]}>{sv.text}</Text>
                      <Text style={s.listHead}>{labels.includes}</Text>
                      {sv.bullets.map((b) => (
                        <View key={b} style={s.bulletRow}>
                          <Icon name="check-circle" size={20} color={colors.primary} />
                          <Text style={s.bulletText}>{b}</Text>
                        </View>
                      ))}
                      <Text style={s.goodFor}><Text style={{ fontFamily: fonts.navSemiBold }}>{labels.goodFor}: </Text>{sv.goodFor}</Text>
                      <PillButton label={labels.button} onPress={() => go('Contact', { topic: sv.title })} />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ))}

      {/* How we work: a real sequence, so numbered */}
      <Band bg={colors.secondary} pad={spacing[16]}>
        <Text style={[s.bandTitle, phone && { fontSize: 30, lineHeight: 40 }]}>{process.title}</Text>
        <View style={{ flexDirection: compact ? 'column' : 'row', marginHorizontal: -8, marginTop: spacing[8] }}>
          {process.steps.map((st, i) => (
            <View key={st.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
              <View style={s.stepCard}>
                <Text style={s.stepNum}>{i + 1}</Text>
                <Text style={s.stepTitle}>{st.title}</Text>
                <Text style={s.stepText}>{st.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* FAQ */}
      <Band pad={spacing[12]}>
        <View style={{ width: '100%', maxWidth: 860, alignSelf: 'center' }}>
          <Text style={[g.h2, { marginBottom: spacing[6] }, h2]}>{faq.title}</Text>
          <Accordion items={faq.items} tone="onWhite" />
        </View>
      </Band>

      {/* Call to action */}
      <View style={s.ctaBand}>
        <View style={[g.container, { alignItems: 'center' }]}>
          <Text style={[s.ctaTitle, phone && { fontSize: 32, lineHeight: 42 }]}>{cta.title}</Text>
          <Text style={[s.ctaText, body]}>{cta.text}</Text>
          <PillButton label={cta.button.label} onPress={press(cta.button)} />
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  heroTitle: { fontFamily: fonts.headingBold, color: colors.white },
  heroText: { fontFamily: fonts.body, color: colors.softOnDark },

  jumpWrap: { backgroundColor: colors.bar, paddingVertical: spacing[8], borderBottomWidth: 1, borderBottomColor: colors.line },
  jumpLabel: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, color: colors.heading, marginBottom: spacing[4] },
  jumpGroup: { fontFamily: fonts.heading, fontSize: 20, color: colors.heading, marginBottom: spacing[2] },
  chip: { borderWidth: 1, borderColor: colors.heading, borderRadius: borderRadius.full, paddingVertical: 8, paddingHorizontal: 14, margin: 4, backgroundColor: colors.white },
  chipHover: { backgroundColor: colors.sky },
  chipText: { fontFamily: fonts.navMedium, fontSize: fontSizes.xs, color: colors.heading },

  section: { paddingVertical: spacing[16] },
  badge: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[4] },
  badgeActive: { backgroundColor: colors.secondary },
  groupTag: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, color: colors.secondary, marginBottom: spacing[1] },
  listHead: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, color: colors.heading, marginBottom: spacing[3] },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing[2] },
  bulletText: { flex: 1, fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.ink, marginLeft: spacing[2] },
  goodFor: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.muted, marginVertical: spacing[5] },

  bandTitle: { fontFamily: fonts.heading, fontSize: 38, lineHeight: 48, color: colors.white, textAlign: 'center' },
  stepCard: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing[6] },
  stepNum: { fontFamily: fonts.headingBold, fontSize: 40, lineHeight: 46, color: colors.primary },
  stepTitle: { fontFamily: fonts.heading, fontSize: 22, color: colors.heading, marginVertical: spacing[2] },
  stepText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.muted },

  ctaBand: { backgroundColor: colors.navSolid, paddingVertical: spacing[20] },
  ctaTitle: { fontFamily: fonts.heading, fontSize: 42, lineHeight: 54, color: colors.white, textAlign: 'center', maxWidth: 760 },
  ctaText: { fontFamily: fonts.body, color: colors.softOnDark, textAlign: 'center', maxWidth: 560, marginVertical: spacing[5] },
});

export default ServicesScreen;