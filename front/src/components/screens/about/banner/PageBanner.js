// PageBanner.js - dark title band used at the top of inner pages: small label, big title, breadcrumb
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, spacing } from '../../../../styles/globalStyles';
import { Container, useSafeNavigate }  from '../../../common/ui/ui';

// crumbs: [{ label: 'Home', route: 'Home' }, { label: 'About Me' }]  (last one has no route)
const PageBanner = ({ label, title, crumbs = [] }) => {
  const go = useSafeNavigate();
  return (
    <View style={b.banner}>
      <Container>
        {label ? <Text style={b.label}>{label}</Text> : null}
        <Text style={b.title} accessibilityRole="header">{title}</Text>
        <View style={b.crumbs}>
          {crumbs.map((c, i) => (
            <View key={c.label} style={b.crumb}>
              {c.route ? (
                <Pressable onPress={() => go(c.route)} accessibilityRole="link"><Text style={b.link}>{c.label}</Text></Pressable>
              ) : (
                <Text style={b.current}>{c.label}</Text>
              )}
              {i < crumbs.length - 1 && <Text style={b.sep}>/</Text>}
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
};

const b = StyleSheet.create({
  banner: { backgroundColor: colors.dark, paddingVertical: 64 },
  label: { fontFamily: fonts.navBold, fontSize: fontSizes.base, letterSpacing: 3, textTransform: 'uppercase', color: colors.green, marginBottom: spacing[2] },
  title: { fontFamily: fonts.bodyLight, fontSize: 48, lineHeight: 58, color: colors.white },
  crumbs: { flexDirection: 'row', marginTop: spacing[4] },
  crumb: { flexDirection: 'row', alignItems: 'center' },
  link: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.base, letterSpacing: 1, textTransform: 'uppercase', color: '#B9B9BE' },
  current: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.base, letterSpacing: 1, textTransform: 'uppercase', color: colors.green },
  sep: { color: '#6B6B70', marginHorizontal: 10 },
});
export default PageBanner;