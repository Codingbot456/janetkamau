// Footer.js - brand blurb | services | quick links | contact, then copyright. Links scroll to sections.
import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { colors, fonts, fontSizes, spacing, layout, globalStyles as g } from '../../../styles/globalStyles';
import { SITE, SERVICES, FOOTER }from '../../navigation/childNav/webNav/siteConfig';
import { scrollToAnchor } from '../../navigation/layout/anchors';
import Logo from '../../navigation/childNav/webNav/Logo';


const FooterLink = ({ label, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="link" style={s.linkWrap}>
    {({ hovered }) => <Text style={[s.link, hovered && { color: colors.accent }]}>{label}</Text>}
  </Pressable>
);

const Footer = () => {
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const tel = (SITE.phones && SITE.phones[0]) || '';
  const col = { flex: compact ? undefined : 1, marginBottom: compact ? spacing[8] : 0, paddingRight: compact ? 0 : spacing[6] };

  return (
    <View style={s.wrap}>
      <View style={g.container}>
        <View style={{ flexDirection: compact ? 'column' : 'row' }}>
          <View style={[col, { flex: compact ? undefined : 1.3 }]}>
            <Logo />
            <Text style={[s.blurb, { marginTop: spacing[5] }]}>{FOOTER.blurb}</Text>
            {SITE.addressLines && SITE.addressLines.length ? <Text style={s.small}>{SITE.addressLines.join(', ')}</Text> : null}
          </View>

          <View style={col}>
            <Text style={s.heading}>{FOOTER.headings.services}</Text>
            {SERVICES.map((sv) => <FooterLink key={sv.id} label={sv.title} onPress={() => scrollToAnchor('services')} />)}
          </View>

          <View style={col}>
            <Text style={s.heading}>{FOOTER.headings.links}</Text>
            {FOOTER.links.map((l) => <FooterLink key={l.id} label={l.label} onPress={() => scrollToAnchor(l.anchor)} />)}
          </View>

          <View style={col}>
            <Text style={s.heading}>{FOOTER.headings.contact}</Text>
            {tel ? <FooterLink label={tel} onPress={() => Linking.openURL('tel:' + tel.replace(/\s/g, ''))} /> : null}
            {SITE.email ? <FooterLink label={SITE.email} onPress={() => Linking.openURL('mailto:' + SITE.email)} /> : null}
            {SITE.hours ? <Text style={s.small}>{SITE.hours}</Text> : null}
          </View>
        </View>

        <View style={s.bottom}>
          <Text style={s.small}>{'\u00A9'} {new Date().getFullYear()} {SITE.name}. {FOOTER.rights}</Text>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  // extra bottom space so the fixed contact bar never covers the last line
  wrap: { backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing[16], paddingBottom: layout.barHeight + spacing[6] },
  heading: { fontFamily: fonts.bodyBold, fontSize: fontSizes.base, color: colors.text, marginBottom: spacing[4] },
  blurb: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 24, color: colors.textSoft, maxWidth: 320 },
  linkWrap: { paddingVertical: 7, alignSelf: 'flex-start' },
  link: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.textSoft },
  small: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.textMuted, marginTop: spacing[2] },
  bottom: { marginTop: spacing[10], paddingTop: spacing[5], borderTopWidth: 1, borderTopColor: colors.borderSoft },
});

export default Footer;