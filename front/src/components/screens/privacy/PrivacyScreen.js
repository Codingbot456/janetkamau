import React from 'react';
import { View, Text, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { SITE } from '../../navigation/layout/web/siteConfig';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout } from '../../../styles/globalStyles';
import { PRIVACY } from './content/privacyContent';

// Plain page: solid blue header, title, last-updated date, then the policy in short sections.
const PrivacyScreen = () => {
  const { width } = useWindowDimensions();
  const phone = width < layout.tablet;
  const { title, updated, intro, sections, contact } = PRIVACY;

  const site = SITE || {};
  const tel = (site.phones && site.phones[0]) || '';
  const open = (url) => Linking.openURL(url);

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={[g.container, { paddingTop: spacing[16], paddingBottom: spacing[16] }]}>
        <View style={s.article}>
          <Text style={[s.title, phone && { fontSize: 40, lineHeight: 50 }]} accessibilityRole="header">{title}</Text>
          <Text style={s.updated}>Last updated: {updated}</Text>
          <Text style={s.p}>{intro}</Text>

          {sections.map((sec) => (
            <View key={sec.id}>
              <Text style={s.h2} accessibilityRole="header">{sec.title}</Text>
              {sec.paragraphs.map((p) => <Text key={p} style={s.p}>{p}</Text>)}
              {sec.bullets ? sec.bullets.map((b) => (
                <View key={b} style={s.bulletRow}>
                  <Text style={s.bullet}>{'\u2022'}</Text>
                  <Text style={s.bulletText}>{b}</Text>
                </View>
              )) : null}
              {sec.after ? <Text style={[s.p, { marginTop: spacing[3] }]}>{sec.after}</Text> : null}
            </View>
          ))}

          <Text style={s.h2} accessibilityRole="header">{contact.title}</Text>
          <Text style={s.p}>{contact.text}</Text>
          <Text style={s.line}>{site.name}</Text>
          {site.addressLines && site.addressLines.length ? <Text style={s.line}>{site.addressLines.join(', ')}</Text> : null}
          {site.email ? <Text style={s.line}>Email: <Text style={s.link} onPress={() => open('mailto:' + site.email)} accessibilityRole="link">{site.email}</Text></Text> : null}
          {tel ? <Text style={s.line}>Telephone: <Text style={s.link} onPress={() => open('tel:' + tel.replace(/\s/g, ''))} accessibilityRole="link">{tel}</Text></Text> : null}
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  article: { width: '100%', maxWidth: 820, alignSelf: 'center' },
  title: { fontFamily: fonts.heading, fontSize: 56, lineHeight: 68, color: colors.heading },
  updated: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.muted, marginTop: spacing[2], marginBottom: spacing[6] },
  h2: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 36, color: colors.heading, marginTop: spacing[8], marginBottom: spacing[3] },
  p: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.ink, marginBottom: spacing[3] },
  bulletRow: { flexDirection: 'row', marginBottom: spacing[2], paddingLeft: spacing[2] },
  bullet: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.ink, width: 20 },
  bulletText: { flex: 1, fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.ink },
  line: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.ink },
  link: { textDecorationLine: 'underline', color: colors.ink },
});

export default PrivacyScreen;