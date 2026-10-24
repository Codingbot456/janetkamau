// Logo.js - image logo when SITE.logo is set, otherwise a round lime mark with the initial and the name.
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../styles/globalStyles';
import { SITE } from './siteConfig';

const Logo = ({ size = 44 }) => (
  <View style={s.row} accessibilityLabel={SITE.name}>
    {SITE.logo ? (
      <Image source={SITE.logo} style={{ width: size, height: size }} resizeMode="contain" />
    ) : (
      <View style={[s.mark, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[s.initial, { fontSize: size * 0.5 }]}>{SITE.initial}</Text>
      </View>
    )}
    <Text style={[s.name, { fontSize: size * 0.5 }]}>{SITE.name}</Text>
  </View>
);

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  mark: { backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  initial: { fontFamily: fonts.heading, color: colors.onAccent },
  name: { fontFamily: fonts.bodyBold, color: colors.text, marginLeft: 12, letterSpacing: -0.3 },
});

export default Logo;