// StickyBar.js - fixed bar at the bottom of the screen: Call now | WhatsApp | Free quote.
import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { MaterialIcons as Icon, Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, layout } from '../../../../styles/globalStyles';
import { SITE, BAR } from '../../childNav/webNav/siteConfig';
import { scrollToAnchor } from '../anchors';

const Segment = ({ bg, label, onPress, children }) => (
  <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={({ hovered }) => [s.seg, { backgroundColor: bg }, hovered && { opacity: 0.92 }]}>
    {children}
    <Text style={s.text}>{label}</Text>
  </Pressable>
);

const StickyBar = () => {
  const tel = (SITE.phones && SITE.phones[0]) || '';
  const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage || '')}` : null;
  return (
    <View style={s.bar}>
      {tel ? (
        <Segment bg={colors.barCall} label={BAR.call} onPress={() => Linking.openURL('tel:' + tel.replace(/\s/g, ''))}>
          <Icon name="call" size={20} color={colors.onBar} style={s.icon} />
        </Segment>
      ) : null}
      {wa ? (
        <Segment bg={colors.barWhatsapp} label={BAR.whatsapp} onPress={() => Linking.openURL(wa)}>
          <Ionicons name="logo-whatsapp" size={20} color={colors.onBar} style={s.icon} />
        </Segment>
      ) : null}
      <Segment bg={colors.barQuote} label={BAR.quote} onPress={() => scrollToAnchor(BAR.quoteAnchor)}>
        <Icon name="description" size={20} color={colors.onBar} style={s.icon} />
      </Segment>
    </View>
  );
};

const s = StyleSheet.create({
  bar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: layout.barHeight, flexDirection: 'row', zIndex: 40 },
  seg: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { marginRight: 10 },
  text: { fontFamily: fonts.bodyBold, fontSize: fontSizes.base, letterSpacing: 0.6, textTransform: 'uppercase', color: colors.onBar },
});

export default StickyBar;