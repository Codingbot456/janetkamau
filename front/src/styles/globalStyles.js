// src/styles/globalStyles.js
// Janet Kamau's portfolio: DD.NYC layout with a teal and orange palette
// (light grey page, deep navy-teal text and dark sections, orange accent).
//
// RULE: every colour in the project lives in `colors` below. Screens never contain hex or rgba values.
// To rebrand, change the values here and nothing else.
// NOTE: colours are estimated from the palette image. Adjust bg / accent below if needed.
//
// Font (loaded with useFonts() in App.js): Manrope, the font DD.NYC uses.
import { StyleSheet, Platform } from 'react-native';

export const colors = {
  // ----- Base -----
  white: '#FFFFFF',
  black: '#000000',
  bg: '#EDEDED',             // page background (light grey)
  surface: '#FFFFFF',        // alternate sections, menu panel, inputs
  surfaceHigh: '#F5F5F5',    // raised cards, tags, hover
  border: '#D2D2D2',         // card and bar outlines
  borderSoft: '#E3E3E3',     // faint dividers
  teal: '#02514F',           // deep teal: stats band and other dark feature sections

  // ----- Text (the darkest navy-teal from the palette) -----
  text: '#05161C',           // headlines, strong text, dark buttons and the closing band
  textSoft: '#3B4F52',       // body text
  textMuted: '#6E8082',      // small, quiet text
  placeholder: '#8C9A9B',    // placeholder text in inputs

  // ----- Accent (orange) -----
  accent: '#FF7F00',         // buttons, highlights, icons, stars
  accentDark: '#B85400',     // darker orange for small orange text (readable on light backgrounds)
  onAccent: '#05161C',       // text and icons on the accent colour (dark reads better on orange)
  accentSoft: 'rgba(255,127,0,0.14)',    // faint accent tint behind icons and chips
  accentGlow: 'rgba(255,127,0,0.14)',    // glow behind the hero
  accentLine: 'rgba(255,127,0,0.50)',    // accent outline

  // ----- Bottom contact bar -----
  barCall: '#02514F',        // Call now (teal)
  barWhatsapp: '#25D366',    // WhatsApp
  barQuote: '#FF7F00',       // Free quote
  onBar: '#FFFFFF',          // text on the bar

  // ----- Surfaces and states -----
  navBg: 'rgba(255,255,255,0.92)',       // menu bar background (slightly see-through)
  overlay: 'rgba(5,22,28,0.45)',         // dark tint over photos
  shadow: '#000000',                     // shadow colour
  danger: '#D92D20',
};

export const fonts = {
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  heading: 'Manrope_700Bold',   // big headlines
  nav: 'Manrope_600SemiBold',
};

export const fontSizes = {
  xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
  '2xl': 24, '3xl': 32, '4xl': 40, '5xl': 52, '6xl': 64,
};

export const spacing = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
  8: 32, 10: 40, 12: 48, 16: 64, 18: 72, 20: 80, 24: 96,
};

export const borderRadius = { none: 0, sm: 8, md: 14, lg: 22, xl: 36, full: 9999 };

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 6,
  },
};

// Layout rules
export const layout = {
  maxWidth: 1240,       // content width on desktop
  desktop: 1000,        // at or above this: two-column layouts
  navCompact: 1100,     // below this the menu bar turns into the burger menu
  tablet: 600,          // below this: single column
  navHeight: 112,       // space the floating menu bar takes at the top of the page
  barHeight: 56,        // height of the fixed Call / WhatsApp / Free quote bar
  sectionPadding: 96,
};

export const placeholderTextColor = colors.placeholder;

export const globalStyles = StyleSheet.create({
  // ---------- Layout ----------
  body: { flex: 1, backgroundColor: colors.bg },
  container: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing[6],
  },
  section: { paddingVertical: layout.sectionPadding },
  sectionRaised: { paddingVertical: layout.sectionPadding, backgroundColor: colors.surface },

  // ---------- Typography ----------
  text: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.textSoft },
  textStrong: { fontFamily: fonts.bodySemiBold, color: colors.text },
  textMuted: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.textMuted },
  eyebrow: { fontFamily: fonts.bodyBold, fontSize: fontSizes.sm, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.accentDark },
  h1: { fontFamily: fonts.heading, fontSize: fontSizes['6xl'], lineHeight: 70, letterSpacing: -2.5, color: colors.text },
  h2: { fontFamily: fonts.heading, fontSize: fontSizes['4xl'], lineHeight: 48, letterSpacing: -1.5, color: colors.text },
  h3: { fontFamily: fonts.bodyBold, fontSize: fontSizes.xl, lineHeight: 28, color: colors.text },
  accentText: { color: colors.accent },

  // ---------- Inputs ----------
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing[4],
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  inputFocused: { borderColor: colors.accent },
  error: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.danger },

  // ---------- Utilities ----------
  row: { flexDirection: 'row' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center: { alignItems: 'center', justifyContent: 'center' },
  textCenter: { textAlign: 'center' },
});

// ========== WEB-ONLY GLOBAL CSS ==========
if (Platform.OS === 'web' && typeof document !== 'undefined' && !document.getElementById('global-web-css')) {
  const style = document.createElement('style');
  style.id = 'global-web-css';
  style.textContent = `
    html { scroll-behavior: smooth; background-color: ${colors.bg}; }
    * { -webkit-tap-highlight-color: transparent; }
    /* inputs draw their own border, so hide the browser's default ring */
    input:focus, textarea:focus, select:focus { outline: none !important; box-shadow: none !important; }
    /* keep a visible ring for keyboard users on links and buttons */
    a:focus-visible, [role="button"]:focus-visible, [tabindex]:focus-visible { outline: 3px solid ${colors.accent}; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  `;
  document.head.appendChild(style);
}