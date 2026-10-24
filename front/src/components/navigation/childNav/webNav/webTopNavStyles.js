// webTopNavStyles.js - flat top bar (DD.NYC style): logo | main links ........ small links | orange Contact pill
import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, spacing, borderRadius, layout } from '../../../../styles/globalStyles';

export const webTopNavStyles = StyleSheet.create({
  wrap: { width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center', paddingHorizontal: spacing[6], paddingTop: spacing[5], position: 'relative' },
  bar: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[2] },
  barCompact: { justifyContent: 'space-between' },

  // main links sit next to the logo, small links sit on the right
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: spacing[12] },
  side: { flexDirection: 'row', alignItems: 'center', marginRight: spacing[4] },
  link: { paddingHorizontal: spacing[4], paddingVertical: 8 },
  linkText: { fontFamily: fonts.nav, fontSize: fontSizes.sm, color: colors.text },
  linkSoft: { color: colors.textSoft },
  linkActive: { color: colors.accentDark },

  // orange pill button (Contact)
  cta: { backgroundColor: colors.accent, borderRadius: borderRadius.full, paddingVertical: 13, paddingHorizontal: spacing[6] },
  ctaText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.sm, color: colors.onAccent },

  // burger button (small screens)
  burger: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  // menu panel under the bar (small screens)
  panel: {
    position: 'absolute',
    top: '100%',
    left: spacing[6],
    right: spacing[6],
    marginTop: spacing[2],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[4],
    zIndex: 50,
  },
  panelItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: spacing[2], borderBottomWidth: 1, borderBottomColor: colors.borderSoft },
  panelText: { fontFamily: fonts.nav, fontSize: fontSizes.base, color: colors.text },
});