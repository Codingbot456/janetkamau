// WebTopNav.js - flat top bar in the DD.NYC style: logo | main links ........ small links | orange Contact pill.
// One-page site: every link scrolls to a section. The active link follows the section you are reading.
// Burger menu on small screens.
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Platform, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { webTopNavStyles as s } from './webTopNavStyles';
import { colors, layout } from '../../../../styles/globalStyles';
import { NAV, NAV_MORE, CTA } from './siteConfig';
import { scrollToAnchor } from '../../layout/anchors';

import Logo from './Logo';

// Which links show where (ids come from NAV / NAV_MORE in siteConfig.js)
const MAIN_IDS = ['projects', 'about', 'services', 'process'];
const SIDE_IDS = ['why', 'faqs', 'packages'];

const WebTopNav = () => {
  const { width } = useWindowDimensions();
  const [panelOpen, setPanelOpen] = useState(false);
  const [active, setActive] = useState('home');
  const isCompact = width < layout.navCompact;

  const allLinks = [...NAV, ...NAV_MORE];
  const byId = (ids) => ids.map((id) => allLinks.find((n) => n.id === id)).filter(Boolean);
  const mainLinks = byId(MAIN_IDS);
  const sideLinks = byId(SIDE_IDS);

  // Highlight the link of the section that is on screen (web)
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') return undefined;
    const ids = NAV.map((n) => n.anchor);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && ids.includes(e.target.id)) setActive(e.target.id); }),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (anchor, e) => {
    // 1. Prevent browser default (hash jump) at every level we can reach
    const native = e && e.nativeEvent ? e.nativeEvent : e;
    if (native && typeof native.preventDefault === 'function') native.preventDefault();
    if (native && typeof native.stopPropagation === 'function') native.stopPropagation();
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();

    // 2. Strip any hash the browser may have just set
    if (Platform.OS === 'web' && typeof history !== 'undefined') {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (err) {
        // ignore
      }
    }

    // 3. Update state
    setPanelOpen(false);
    setActive(anchor);

    // 4. Scroll AFTER React commits + browser paints
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToAnchor(anchor);
      });
    });
  };

  const CtaButton = () => (
    <Pressable onPress={(e) => go(CTA.anchor, e)} accessibilityRole="button" style={s.cta}>
      <Text style={s.ctaText}>{CTA.label}</Text>
    </Pressable>
  );

  // ---------------- Compact ----------------
  if (isCompact) {
    const panelLinks = [...mainLinks, ...sideLinks];
    return (
      <View style={s.wrap}>
        <View style={[s.bar, s.barCompact]}>
          <Pressable onPress={(e) => go('home', e)} accessibilityLabel="Home"><Logo size={38} /></Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {width >= layout.tablet ? <CtaButton /> : null}
            <Pressable style={s.burger} onPress={() => setPanelOpen((o) => !o)} accessibilityLabel="Toggle menu" accessibilityState={{ expanded: panelOpen }}>
              <Icon name={panelOpen ? 'close' : 'menu'} size={26} color={colors.text} />
            </Pressable>
          </View>
        </View>
        {panelOpen ? (
          <View style={s.panel}>
            {panelLinks.map((n) => (
              <Pressable key={n.id} style={s.panelItem} onPress={(e) => go(n.anchor, e)} accessibilityRole="link">
                <Text style={[s.panelText, active === n.anchor && s.linkActive]}>{n.label}</Text>
                <Icon name="north-east" size={16} color={active === n.anchor ? colors.accent : colors.textMuted} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    );
  }

  // ---------------- Desktop ----------------
  return (
    <View style={s.wrap}>
      <View style={s.bar}>
        <Pressable onPress={(e) => go('home', e)} accessibilityLabel="Home"><Logo /></Pressable>

        <View style={s.main}>
          {mainLinks.map((n) => (
            <Pressable key={n.id} style={s.link} onPress={(e) => go(n.anchor, e)} accessibilityRole="link">
              {({ hovered }) => <Text style={[s.linkText, (active === n.anchor || hovered) && s.linkActive]}>{n.label}</Text>}
            </Pressable>
          ))}
        </View>

        <View style={s.side}>
          {sideLinks.map((n) => (
            <Pressable key={n.id} style={s.link} onPress={(e) => go(n.anchor, e)} accessibilityRole="link">
              {({ hovered }) => <Text style={[s.linkText, s.linkSoft, (active === n.anchor || hovered) && s.linkActive]}>{n.label}</Text>}
            </Pressable>
          ))}
        </View>

        <CtaButton />
      </View>
    </View>
  );
};

export default WebTopNav;