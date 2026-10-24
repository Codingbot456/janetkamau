// TaglineBand.js  (src/components/common/ui/TaglineBand.js)
// Full-width dark band: small line, one big word, and Daniel's green signature. Used on the Work page.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from './ui';
import { SITE } from '../../navigation/childNav/webNav/siteConfig';
import { colors, fonts, fontSizes, spacing } from '../../../styles/globalStyles';

const TaglineBand = ({ small, big }) => (
  <View style={s.band}>
    <Container style={{ alignItems: 'center' }}>
      <Text style={s.small}>{small}</Text>
      <Text style={s.big}>{big}</Text>
      <View style={s.sig}>
        <Text style={s.sigMark}>{SITE.firstName}</Text>
        <Text style={s.sigText}>{SITE.lastName.split('').join(' ')}</Text>
      </View>
    </Container>
  </View>
);

const s = StyleSheet.create({
  band: { backgroundColor: colors.dark, paddingVertical: 90 },
  small: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.xl, letterSpacing: 3, textTransform: 'uppercase', color: '#B9B9BE', textAlign: 'center' },
  big: { fontFamily: fonts.bodyExtraBold, fontSize: 64, lineHeight: 76, color: colors.white, textAlign: 'center', marginTop: 4 },
  sig: { flexDirection: 'row', alignItems: 'flex-end', marginTop: spacing[8] },
  sigMark: { fontFamily: fonts.bodyLight, fontStyle: 'italic', fontSize: 34, lineHeight: 40, color: colors.green, marginRight: 10 },
  sigText: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 7, color: colors.green, marginBottom: 6 },
});
export default TaglineBand;