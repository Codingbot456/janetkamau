// sections.js - shared building blocks for the page.
import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons as Icon, Ionicons } from '@expo/vector-icons';
import { PhotoPlaceholder } from './ui';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius, shadows } from '../../../styles/globalStyles';

// Photo with a placeholder if the image is missing or fails to load
export const Photo = ({ image, label, ratio, radius = borderRadius.md, fit = 'cover' }) => {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return <PhotoPlaceholder label={label} style={{ aspectRatio: ratio, borderRadius: radius }} />;
  return (
    <Image source={image} onError={() => setFailed(true)} style={{ width: '100%', aspectRatio: ratio, borderRadius: radius }} resizeMode={fit} accessibilityLabel={label} />
  );
};

// Section wrapper: carries the id the menu scrolls to, and a centred container
export const Section = ({ id, bg = colors.bg, pad = layout.sectionPadding, children, style }) => (
  <View
    id={id}
    nativeID={id}
    dataSet={{ id }}
    accessibilityID={id}
    style={[{ backgroundColor: bg, paddingVertical: pad }, style]}
  >
    <View style={g.container}>{children}</View>
  </View>
);

// Small bracketed label above a heading, e.g. [ ABOUT ME ]
export const Eyebrow = ({ children }) => <Text style={g.eyebrow}>[ {children} ]</Text>;

// Text with some words in bold white. parts = ['plain text ', { b: 'bold words' }, ' more text']
export const RichText = ({ parts, style, strongStyle }) => (
  <Text style={style}>
    {parts.map((p, i) => (typeof p === 'string' ? p : <Text key={i} style={[s.strong, strongStyle]}>{p.b}</Text>))}
  </Text>
);

// Lime pill with a dark round arrow. small = menu bar size
export const ArrowButton = ({ label, onPress, small = false, style }) => (
  <Pressable onPress={onPress} accessibilityRole="button" style={({ hovered }) => [s.arrowBtn, small && s.arrowBtnSmall, { backgroundColor: hovered ? colors.accentDark : colors.accent }, !small && shadows.glow, style]}>
    <Text style={[s.arrowText, small && { fontSize: fontSizes.sm }]}>{label}</Text>
    <View style={[s.arrowCircle, small && { width: 34, height: 34, borderRadius: 17 }]}>
      <Icon name="north-east" size={small ? 16 : 18} color={colors.accent} />
    </View>
  </Pressable>
);

// Outlined dark pill with an icon. iconSet: 'material' | 'ionicons'
export const GhostButton = ({ label, onPress, icon, iconSet = 'material', style }) => {
  const IconSet = iconSet === 'ionicons' ? Ionicons : Icon;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ hovered }) => [s.ghost, hovered && s.ghostHover, style]}>
      {icon ? <IconSet name={icon} size={20} color={colors.accent} style={{ marginRight: 10 }} /> : null}
      <Text style={s.ghostText}>{label}</Text>
    </Pressable>
  );
};

// Small floating info card: lime icon circle, title, one line
export const FloatCard = ({ icon, title, text, style }) => (
  <View style={[s.float, style]}>
    <View style={s.floatIcon}><Icon name={icon} size={20} color={colors.onAccent} /></View>
    <View style={{ flex: 1 }}>
      <Text style={s.floatTitle}>{title}</Text>
      {text ? <Text style={s.floatText}>{text}</Text> : null}
    </View>
  </View>
);

const s = StyleSheet.create({
  strong: { fontFamily: fonts.bodyBold, color: colors.text },

  arrowBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: borderRadius.full, paddingVertical: 10, paddingLeft: spacing[6], paddingRight: 10 },
  arrowBtnSmall: { paddingVertical: 7, paddingLeft: spacing[5], paddingRight: 7 },
  arrowText: { fontFamily: fonts.bodyBold, fontSize: fontSizes.base, color: colors.onAccent, marginRight: spacing[4] },
  arrowCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.onAccent, alignItems: 'center', justifyContent: 'center' },

  ghost: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.full, paddingVertical: 17, paddingHorizontal: spacing[6] },
  ghostHover: { borderColor: colors.accentLine, backgroundColor: colors.surfaceHigh },
  ghostText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.base, color: colors.text },

  float: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.navBg, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing[4], ...shadows.card },
  floatIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginRight: spacing[3] },
  floatTitle: { fontFamily: fonts.bodyBold, fontSize: fontSizes.sm, color: colors.text },
  floatText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 20, color: colors.textSoft, marginTop: 2 },
});

// Section heading: bracketed label, big title, optional intro. title can be a string or [before, accent, after].
export const SectionHeader = ({ eyebrow, title, text, center = false, maxWidth = 720, size }) => (
  <View style={{ alignItems: center ? 'center' : 'flex-start', marginBottom: spacing[10] }}>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <Text style={[g.h2, size, { marginTop: spacing[4], maxWidth, textAlign: center ? 'center' : 'left' }]} accessibilityRole="header">
      {Array.isArray(title) ? <>{title[0]}<Text style={g.accentText}>{title[1]}</Text>{title[2]}</> : title}
    </Text>
    {text ? <Text style={[g.text, { marginTop: spacing[4], maxWidth, textAlign: center ? 'center' : 'left' }]}>{text}</Text> : null}
  </View>
);

// Lime tick with a line of text
export const CheckRow = ({ children }) => (
  <View style={x.checkRow}>
    <Icon name="check-circle" size={18} color={colors.accent} style={{ marginTop: 2 }} />
    <Text style={x.checkText}>{children}</Text>
  </View>
);

// Text link with a small lime arrow, e.g. "Enquire about websites"
export const ArrowLink = ({ label, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="link" style={x.linkRow}>
    {({ hovered }) => (
      <>
        <Text style={[x.linkText, hovered && { color: colors.accent }]}>{label}</Text>
        <Icon name="north-east" size={16} color={colors.accent} style={{ marginLeft: 6 }} />
      </>
    )}
  </Pressable>
);

// Small outlined pill, e.g. "Web development"
export const Chip = ({ children }) => (
  <View style={x.chip}><Text style={x.chipText}>{children}</Text></View>
);

const x = StyleSheet.create({
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing[2] },
  checkText: { flex: 1, fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.textSoft, marginLeft: spacing[2] },
  linkRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  linkText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.sm, color: colors.text },
  chip: { borderWidth: 1, borderColor: colors.accentLine, backgroundColor: colors.accentSoft, borderRadius: borderRadius.full, paddingVertical: 8, paddingHorizontal: 16, marginRight: spacing[2], marginBottom: spacing[2] },
  chipText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.sm, color: colors.accent },
});