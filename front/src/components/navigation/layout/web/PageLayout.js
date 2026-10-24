// PageLayout.js
import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { colors } from '../../../../styles/globalStyles';
import WebTopNav from '../../childNav/webNav/WebTopNav';
import StickyBar from './StickyBar';
import Footer from '../../../common/footer/Footer';

const PageLayout = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !scrollRef.current) return;
    const node =
      scrollRef.current.getScrollableNode?.() ||
      scrollRef.current._node ||
      scrollRef.current;
    if (node) window.__pageScrollNode = node;
  }, []);

  return (
    <View style={s.root}>
      <ScrollView
        ref={scrollRef}
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
      >
        {children}
        <Footer />
      </ScrollView>
      <View style={s.nav}><WebTopNav /></View>
      <StickyBar />
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, height: '100vh', backgroundColor: colors.bg, overflow: 'hidden' },
  scrollView: { flex: 1, width: '100%' },
  scrollContent: { flexGrow: 1 },
  nav: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'box-none' },
});

export default PageLayout;