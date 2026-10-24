// ui.js - small shared building blocks used by every page
import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout } from '../../../styles/globalStyles';




// Navigate only if the screen exists (lets us add pages one by one)
export const useSafeNavigate = () => {
  const navigation = useNavigation();
  return (name, params) => {
    const names = navigation.getState?.()?.routeNames || [];
    if (names.includes(name)) navigation.navigate(name, params);
  };
};

// 3 columns on desktop, 2 on tablet, 1 on phones
export const useCols = (desktop = 3, tablet = 2) => {
  const { width } = useWindowDimensions();
  return width < layout.tablet ? 1 : width < layout.desktop ? tablet : desktop;
};

export const Container = ({ children, style }) => <View style={[g.container, style]}>{children}</View>;

export const Section = ({ children, alt, style }) => (
  <View style={[alt ? g.sectionAlt : g.section, style]}><Container>{children}</Container></View>
);

export const SectionTitle = ({ title, intro, light }) => (
  <View style={{ marginBottom: spacing[6] }}>
    <View style={g.accentBar} />
    <Text style={[g.h2, light && { color: colors.white }]}>{title}</Text>
    {intro ? <Text style={[g.lead, { marginTop: spacing[2], maxWidth: 680 }]}>{intro}</Text> : null}
  </View>
);

export const Button = ({ label, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="button" style={({ hovered }) => [g.btn, hovered && g.btnHover]}>
    <Text style={g.btnText}>{label}</Text>
  </Pressable>
);

export const Grid = ({ items, cols, render, gap = 20 }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -gap / 2 }}>
    {items.map((it) => (
      <View key={it.id} style={{ width: `${100 / cols}%`, padding: gap / 2 }}>{render(it)}</View>
    ))}
  </View>
);

// Grey striped box that stands in for a photo until you add one
export const PhotoPlaceholder = ({ label, style }) => (
  <View style={[ui.photo, style]} accessibilityRole="image" accessibilityLabel={label}>
    <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.muted }}>{label}</Text>
  </View>
);

export const AgendaCard = ({ item, onPress }) => (
  <Pressable style={({ hovered }) => [g.card, hovered && ui.cardHover]} onPress={onPress} accessibilityRole="link">
    <View style={[ui.swatch, { backgroundColor: item.color }]}><Text style={ui.swatchNum}>{item.id}</Text></View>
    <View style={g.cardBody}>
      <Text style={[g.h3, { fontSize: fontSizes.lg, marginBottom: 6 }]}>{item.title}</Text>
      <Text style={[g.textMuted, { fontSize: fontSizes.sm, lineHeight: 22 }]}>{item.summary}</Text>
    </View>
  </Pressable>
);

const ui = StyleSheet.create({
  photo: {
    width: '100%', aspectRatio: 570 / 368, backgroundColor: colors.bar, borderWidth: 1, borderColor: colors.line,
    borderRadius: 8, alignItems: 'center', justifyContent: 'center',
  },
  swatch: { height: 130, justifyContent: 'flex-end', padding: spacing[4] },
  swatchNum: { fontFamily: fonts.navBold, fontSize: 44, color: colors.white },
  cardHover: { borderColor: colors.green },
});